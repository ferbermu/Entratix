'use server';

import { db } from '../../lib/db';
import {
  orders,
  orderItems,
  userTickets,
  paymentTransactions,
} from '../../lib/db/schema/orders';
import { tickets, events } from '../../lib/db/schema/events';
import { eq, and, desc } from 'drizzle-orm';
import { randomBytes } from 'crypto';

// Tipos para las operaciones
export type TicketSelection = {
  ticketId: string;
  quantity: number;
};

export type OrderCalculation = {
  items: Array<{
    ticketId: string;
    ticketType: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  total: number;
  currency: string;
};

export type CreateOrderInput = {
  userId: string;
  eventId: string;
  ticketSelections: TicketSelection[];
  paymentMethod?: 'cash' | 'credit_card' | 'debit_card' | 'paypal' | 'stripe';
};

/**
 * Función para generar número de orden único
 */
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = randomBytes(3).toString('hex').toUpperCase();
  return `ORD-${year}${month}${day}-${random}`;
}

/**
 * Función para generar código de ticket único
 */
function generateTicketCode(): string {
  return `TKT-${randomBytes(8).toString('hex').toUpperCase()}`;
}

/**
 * Calcular el total de la orden (ÚNICA FUENTE DE VERDAD)
 * Esta función se usa tanto para el cálculo previo como para la creación de la orden
 */
export async function calculateOrderTotal(
  eventId: string,
  ticketSelections: TicketSelection[]
): Promise<OrderCalculation | { error: string }> {
  try {
    if (!ticketSelections || ticketSelections.length === 0) {
      return { error: 'No se seleccionaron tickets' };
    }

    // Obtener información de los tickets
    const ticketIds = ticketSelections.map(ts => ts.ticketId);
    const ticketsData = await db
      .select()
      .from(tickets)
      .where(
        and(
          eq(tickets.eventId, eventId),
          // Verificar que los tickets pertenezcan al evento
        )
      );

    if (ticketsData.length === 0) {
      return { error: 'No se encontraron tickets para este evento' };
    }

    // Crear mapa de tickets para acceso rápido
    const ticketsMap = new Map(ticketsData.map(t => [t.id, t]));

    // Calcular items y subtotal
    const items = [];
    let subtotal = 0;

    for (const selection of ticketSelections) {
      const ticket = ticketsMap.get(selection.ticketId);
      
      if (!ticket) {
        return { error: `Ticket ${selection.ticketId} no encontrado` };
      }

      // Verificar disponibilidad
      if (ticket.quantity !== null && ticket.quantity < selection.quantity) {
        return { error: `No hay suficientes tickets disponibles para ${ticket.type}` };
      }

      const unitPrice = parseFloat(ticket.price);
      const itemSubtotal = unitPrice * selection.quantity;

      items.push({
        ticketId: ticket.id,
        ticketType: ticket.type,
        quantity: selection.quantity,
        unitPrice,
        subtotal: itemSubtotal,
      });

      subtotal += itemSubtotal;
    }

    // Calcular impuestos y fees (puedes ajustar estos valores)
    const taxRate = 0.10; // 10% de impuestos
    const serviceFeeRate = 0.05; // 5% de service fee
    
    const taxes = subtotal * taxRate;
    const serviceFee = subtotal * serviceFeeRate;
    const total = subtotal + taxes + serviceFee;

    return {
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
      serviceFee: Math.round(serviceFee * 100) / 100,
      total: Math.round(total * 100) / 100,
      currency: 'USD',
    };
  } catch (error) {
    console.error('Error calculating order total:', error);
    return { error: 'Error al calcular el total de la orden' };
  }
}

/**
 * Crear una orden y procesar el pago
 */
export async function createOrder(input: CreateOrderInput) {
  try {
    const { userId, eventId, ticketSelections, paymentMethod = 'cash' } = input;

    // 1. Calcular el total usando la ÚNICA FUENTE DE VERDAD
    const calculation = await calculateOrderTotal(eventId, ticketSelections);

    if ('error' in calculation) {
      return {
        success: false,
        message: calculation.error,
      };
    }

    // 2. Generar número de orden
    const orderNumber = generateOrderNumber();

    // 3. Crear la orden
    const [order] = await db
      .insert(orders)
      .values({
        userId,
        eventId,
        orderNumber,
        status: 'pending',
        subtotal: calculation.subtotal.toString(),
        taxes: calculation.taxes.toString(),
        serviceFee: calculation.serviceFee.toString(),
        total: calculation.total.toString(),
        currency: calculation.currency,
        paymentStatus: 'pending',
        paymentMethod,
      })
      .returning();

    // 4. Crear los order items
    const orderItemsData = await db
      .insert(orderItems)
      .values(
        calculation.items.map(item => ({
          orderId: order.id,
          ticketId: item.ticketId,
          ticketType: item.ticketType,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toString(),
          subtotal: item.subtotal.toString(),
        }))
      )
      .returning();

    // 5. Crear transacción de pago
    const [paymentTransaction] = await db
      .insert(paymentTransactions)
      .values({
        orderId: order.id,
        amount: calculation.total.toString(),
        currency: calculation.currency,
        paymentMethod,
        status: 'pending',
      })
      .returning();

    // ============================================
    // 6. PROCESAR PAGO (SECCIÓN PARA INTEGRACIÓN)
    // ============================================
    // TODO: Integrar con procesador de pagos (Stripe, PayPal, etc.)
    // 
    // Ejemplo de integración:
    // if (paymentMethod === 'stripe') {
    //   const stripePayment = await processStripePayment({
    //     amount: calculation.total,
    //     currency: calculation.currency,
    //     orderId: order.id,
    //   });
    //   
    //   if (!stripePayment.success) {
    //     await db.update(orders).set({ status: 'cancelled' }).where(eq(orders.id, order.id));
    //     await db.update(paymentTransactions).set({ 
    //       status: 'failed',
    //       errorMessage: stripePayment.error 
    //     }).where(eq(paymentTransactions.id, paymentTransaction.id));
    //     return { success: false, message: 'Error en el pago' };
    //   }
    // }
    //
    // Por ahora, simulamos que el pago con CASH es exitoso automáticamente
    // ============================================

    if (paymentMethod === 'cash') {
      // Simular pago exitoso con cash
      await db
        .update(paymentTransactions)
        .set({
          status: 'completed',
          completedAt: new Date(),
          transactionId: `CASH-${Date.now()}`,
        })
        .where(eq(paymentTransactions.id, paymentTransaction.id));

      // Actualizar orden a completada
      await db
        .update(orders)
        .set({
          status: 'completed',
          paymentStatus: 'completed',
          completedAt: new Date(),
        })
        .where(eq(orders.id, order.id));

      // 7. Generar tickets individuales para el usuario
      const userTicketsData = [];
      
      for (const orderItem of orderItemsData) {
        for (let i = 0; i < orderItem.quantity; i++) {
          userTicketsData.push({
            userId,
            orderId: order.id,
            orderItemId: orderItem.id,
            eventId,
            ticketId: orderItem.ticketId,
            ticketCode: generateTicketCode(),
            ticketType: orderItem.ticketType,
            status: 'active',
          });
        }
      }

      await db.insert(userTickets).values(userTicketsData);

      // 8. Actualizar cantidad de tickets disponibles
      for (const item of calculation.items) {
        const [ticket] = await db
          .select()
          .from(tickets)
          .where(eq(tickets.id, item.ticketId));

        if (ticket && ticket.quantity !== null) {
          await db
            .update(tickets)
            .set({
              quantity: ticket.quantity - item.quantity,
            })
            .where(eq(tickets.id, item.ticketId));
        }
      }

      return {
        success: true,
        message: 'Orden creada exitosamente',
        orderId: order.id,
        orderNumber: order.orderNumber,
        total: calculation.total,
      };
    }

    // Para otros métodos de pago, retornar pending
    return {
      success: true,
      message: 'Orden creada, esperando confirmación de pago',
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: calculation.total,
      paymentPending: true,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      message: 'Error al crear la orden',
    };
  }
}

/**
 * Obtener tickets del usuario
 */
export async function getUserTickets(userId: string) {
  try {
    const tickets = await db
      .select({
        ticket: userTickets,
        event: events,
        order: orders,
      })
      .from(userTickets)
      .innerJoin(events, eq(userTickets.eventId, events.id))
      .innerJoin(orders, eq(userTickets.orderId, orders.id))
      .where(eq(userTickets.userId, userId))
      .orderBy(desc(userTickets.createdAt));

    return tickets;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }
}

/**
 * Obtener órdenes del usuario
 */
export async function getUserOrders(userId: string) {
  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    return userOrders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

