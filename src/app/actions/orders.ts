'use server';

import { db } from '../../lib/db';
import { orders, orderItems, userTickets, paymentTransactions } from '../../lib/db/schema/orders';
import { tickets, events } from '../../lib/db/schema/events';
import { eq, and } from 'drizzle-orm';

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

