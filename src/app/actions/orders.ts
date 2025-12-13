'use server';

import { db } from '../../lib/db';
import { orders, orderItems, userTickets, paymentTransactions } from '../../lib/db/schema/orders';
import { tickets, events } from '../../lib/db/schema/events';
import { eq, and, isNull } from 'drizzle-orm';
import { users } from '../../lib/db/schema/users';
import { getCurrentUserFromSession } from '../lib/auth/getCurrentUser';
import { ValidateTicketResult } from '../scan/interfaces/ValidateTicket/ValidateTicketResult';

interface TicketSelection {
  ticketId: string;
  quantity: number;
}

interface CreateOrderInput {
  userId: string;
  eventId: string;
  selections: TicketSelection[];
  paymentMethod: string;
}

function formatDateISO(value: Date | null): string | null {
  if (!value) return null;
  return value.toISOString();
}

export async function calculateOrderTotal(eventId: string, selections: TicketSelection[]) {
  try {
    const detailedItems = [];
    let totalAmount = 0;

    for (const selection of selections) {
      if (selection.quantity === 0) continue;

      const [ticket] = await db
        .select()
        .from(tickets)
        .where(and(eq(tickets.id, selection.ticketId), eq(tickets.eventId, eventId)))
        .limit(1);

      if (!ticket) {
        return { success: false, message: `Ticket ${selection.ticketId} not found` };
      }

      const ticketPrice = parseFloat(ticket.price);
      const itemSubtotal = ticketPrice * selection.quantity;
      totalAmount += itemSubtotal;

      detailedItems.push({
        ticketId: ticket.id,
        ticketType: ticket.type,
        quantity: selection.quantity,
        unitPrice: ticketPrice,
        subtotal: itemSubtotal,
      });
    }

    if (detailedItems.length === 0) {
      return { success: false, message: 'No tickets selected' };
    }

    const taxes = totalAmount * 0.10;
    const serviceFee = totalAmount * 0.05;
    const finalTotal = totalAmount + taxes + serviceFee;

    return {
      success: true,
      items: detailedItems,
      subtotal: totalAmount.toFixed(2),
      taxes: taxes.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: finalTotal.toFixed(2),
      currency: 'USD',
    };
  } catch (error) {
    console.error('Error calculating order total:', error);
    return { success: false, message: 'Failed to calculate order total' };
  }
}

export async function createOrder(input: CreateOrderInput) {
  try {
    const { userId, eventId, selections, paymentMethod } = input;

    const calculation = await calculateOrderTotal(eventId, selections);
    if (!calculation.success || !calculation.items) {
      return { success: false, message: calculation.message || 'Failed to calculate order' };
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const [order] = await db
      .insert(orders)
      .values({
        userId,
        eventId,
        orderNumber,
        status: 'completed',
        subtotal: calculation.subtotal,
        taxes: calculation.taxes,
        serviceFee: calculation.serviceFee,
        total: calculation.total,
        currency: calculation.currency,
        paymentStatus: 'completed',
        paymentMethod: paymentMethod || 'cash',
        completedAt: new Date(),
      })
      .returning();

    const [transaction] = await db
      .insert(paymentTransactions)
      .values({
        orderId: order.id,
        amount: calculation.total,
        currency: calculation.currency,
        paymentMethod: paymentMethod || 'cash',
        status: 'completed',
        transactionId: `TXN-${Date.now()}`,
        completedAt: new Date(),
      })
      .returning();

    await db
      .update(orders)
      .set({ paymentTransactionId: transaction.id })
      .where(eq(orders.id, order.id));

    for (const item of calculation.items) {
      const [orderItem] = await db
        .insert(orderItems)
        .values({
          orderId: order.id,
          ticketId: item.ticketId,
          ticketType: item.ticketType,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toString(),
          subtotal: item.subtotal.toString(),
        })
        .returning();

      for (let i = 0; i < item.quantity; i++) {
        const ticketCode = `TCK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        await db.insert(userTickets).values({
          userId,
          orderId: order.id,
          orderItemId: orderItem.id,
          eventId,
          ticketId: item.ticketId,
          ticketCode,
          status: 'active',
        });
      }
    }

    return {
      success: true,
      message: 'Order created successfully',
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: parseFloat(order.total),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, message: 'Failed to create order' };
  }
}

export async function validateTicketCode(ticketCodeRaw: string): Promise<ValidateTicketResult> {
  const ticketCode = ticketCodeRaw.trim();
  if (!ticketCode) {
    return { success: false, message: 'Invalid ticket code' };
  }

  const scanner = await getCurrentUserFromSession();
  if (!scanner) {
    return { success: false, message: 'Unauthorized' };
  }

  const role = scanner.role;
  const isScannerRole =
    role === 'rrpp' || role === 'productor' || role === 'superuser';
  const allowNonScannerInDev = process.env.NODE_ENV !== 'production';
  const allowAll = process.env.SCAN_ALLOW_ALL === 'true';
  const allowUserRole = process.env.SCAN_ALLOW_USER === 'true' && role === 'user';

  if (!isScannerRole && !allowNonScannerInDev && !allowAll && !allowUserRole) {
    return {
      success: false,
      message: 'Forbidden (requires rrpp/productor/superuser)',
    };
  }

  const [row] = await db
    .select({
      ticketCode: userTickets.ticketCode,
      status: userTickets.status,
      usedAt: userTickets.usedAt,
      eventTitle: events.title,
      eventDate: events.date,
      ticketType: tickets.type,
      ownerFirstName: users.firstName,
      ownerLastName: users.lastName,
      ownerEmail: users.email,
    })
    .from(userTickets)
    .leftJoin(events, eq(userTickets.eventId, events.id))
    .leftJoin(tickets, eq(userTickets.ticketId, tickets.id))
    .leftJoin(users, eq(userTickets.userId, users.id))
    .where(eq(userTickets.ticketCode, ticketCode))
    .limit(1);

  if (!row || !row.eventTitle || !row.eventDate || !row.ticketType || !row.ownerEmail) {
    return { success: false, message: 'Ticket not found' };
  }

  const ownerName = `${row.ownerFirstName || ''} ${row.ownerLastName || ''}`.trim() || 'User';

  if (row.status !== 'active' || row.usedAt) {
    return {
      success: false,
      message: row.status === 'used' || row.usedAt ? 'Ticket already used' : 'Ticket not active',
      ticket: {
        ticketCode: row.ticketCode,
        status: row.status,
        usedAt: formatDateISO(row.usedAt),
        eventTitle: row.eventTitle,
        eventDate: row.eventDate.toISOString(),
        ticketType: row.ticketType,
        ownerName,
        ownerEmail: row.ownerEmail,
      },
    };
  }

  const now = new Date();
  const updated = await db
    .update(userTickets)
    .set({ status: 'used', usedAt: now })
    .where(
      and(
        eq(userTickets.ticketCode, ticketCode),
        eq(userTickets.status, 'active'),
        isNull(userTickets.usedAt)
      )
    )
    .returning({ usedAt: userTickets.usedAt, status: userTickets.status });

  if (updated.length === 0) {
    return {
      success: false,
      message: 'Ticket already used',
      ticket: {
        ticketCode: row.ticketCode,
        status: 'used',
        usedAt: now.toISOString(),
        eventTitle: row.eventTitle,
        eventDate: row.eventDate.toISOString(),
        ticketType: row.ticketType,
        ownerName,
        ownerEmail: row.ownerEmail,
      },
    };
  }

  return {
    success: true,
    message: 'Ticket validated',
    ticket: {
      ticketCode: row.ticketCode,
      status: 'used',
      usedAt: now.toISOString(),
      eventTitle: row.eventTitle,
      eventDate: row.eventDate.toISOString(),
      ticketType: row.ticketType,
      ownerName,
      ownerEmail: row.ownerEmail,
    },
  };
}

export async function getUserTickets(userId: string) {
  try {
    const userTicketsData = await db
      .select({
        id: userTickets.id,
        ticketCode: userTickets.ticketCode,
        status: userTickets.status,
        usedAt: userTickets.usedAt,
        createdAt: userTickets.createdAt,
        orderId: userTickets.orderId,
        event: events,
        ticket: tickets,
        order: orders,
      })
      .from(userTickets)
      .leftJoin(events, eq(userTickets.eventId, events.id))
      .leftJoin(tickets, eq(userTickets.ticketId, tickets.id))
      .leftJoin(orders, eq(userTickets.orderId, orders.id))
      .where(eq(userTickets.userId, userId));

    return userTicketsData;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }
}

export async function getUserOrders(userId: string) {
  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(orders.createdAt);

    return userOrders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

