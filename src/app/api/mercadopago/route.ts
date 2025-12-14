import { Payment } from 'mercadopago';
import { revalidatePath } from 'next/cache';

import { and, eq } from 'drizzle-orm';

import { mercadopago } from '../../lib/mercadopago/mercadopago';
import { db } from '../../../lib/db';
import { orderItems, orders, paymentTransactions, userTickets } from '../../../lib/db/schema/orders';

interface MercadoPagoWebhookBody {
  data: {
    id: string;
  };
}

interface MercadoPagoPaymentMetadata {
  orderId?: string;
}

function parseWebhookBody(value: unknown): MercadoPagoWebhookBody | null {
  if (typeof value !== 'object' || value === null) return null;
  if (!('data' in value)) return null;
  const data = (value as { data?: unknown }).data;
  if (typeof data !== 'object' || data === null) return null;
  const id = (data as { id?: unknown }).id;
  if (typeof id !== 'string' || id.trim() === '') return null;
  return { data: { id } };
}

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as unknown;
    const body = parseWebhookBody(raw);
    if (!body) {
      return new Response(null, { status: 200 });
    }

    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    if (payment.status !== 'approved') {
      return new Response(null, { status: 200 });
    }

    const metadata = (payment.metadata || {}) as MercadoPagoPaymentMetadata;
    const orderId =
      typeof metadata.orderId === 'string' && metadata.orderId.trim() !== ''
        ? metadata.orderId.trim()
        : typeof payment.external_reference === 'string' && payment.external_reference.trim() !== ''
          ? payment.external_reference.trim()
          : null;

    if (!orderId) {
      return new Response(null, { status: 200 });
    }

    await db.transaction(async tx => {
      const [orderRow] = await tx
        .select({
          id: orders.id,
          userId: orders.userId,
          eventId: orders.eventId,
          paymentStatus: orders.paymentStatus,
          paymentTransactionId: orders.paymentTransactionId,
        })
        .from(orders)
        .where(eq(orders.id, orderId))
        .limit(1);

      if (!orderRow) return;

      if (orderRow.paymentStatus === 'completed') return;

      const now = new Date();

      if (orderRow.paymentTransactionId) {
        await tx
          .update(paymentTransactions)
          .set({
            status: 'completed',
            transactionId: payment.id ? String(payment.id) : null,
            completedAt: now,
            metadata: JSON.stringify({
              preferenceId: payment.order?.id || null,
              paymentId: payment.id || null,
              status: payment.status || null,
              statusDetail: payment.status_detail || null,
            }),
            errorMessage: null,
          })
          .where(eq(paymentTransactions.id, orderRow.paymentTransactionId));
      } else {
        const [txRow] = await tx
          .insert(paymentTransactions)
          .values({
            orderId: orderRow.id,
            amount: String(payment.transaction_amount ?? '0'),
            currency: String(payment.currency_id ?? 'USD'),
            paymentMethod: 'mercadopago',
            status: 'completed',
            transactionId: payment.id ? String(payment.id) : null,
            metadata: JSON.stringify({
              paymentId: payment.id || null,
              status: payment.status || null,
              statusDetail: payment.status_detail || null,
            }),
            errorMessage: null,
            completedAt: now,
          })
          .returning({ id: paymentTransactions.id });

        await tx
          .update(orders)
          .set({ paymentTransactionId: txRow.id })
          .where(eq(orders.id, orderRow.id));
      }

      await tx
        .update(orders)
        .set({
          status: 'completed',
          paymentStatus: 'completed',
          paymentMethod: 'mercadopago',
          completedAt: now,
          updatedAt: now,
        })
        .where(eq(orders.id, orderRow.id));

      const items = await tx
        .select({
          id: orderItems.id,
          ticketId: orderItems.ticketId,
          quantity: orderItems.quantity,
        })
        .from(orderItems)
        .where(eq(orderItems.orderId, orderRow.id));

      for (const item of items) {
        const existing = await tx
          .select({ id: userTickets.id })
          .from(userTickets)
          .where(eq(userTickets.orderItemId, item.id));

        const missing = Math.max(0, item.quantity - existing.length);
        for (let i = 0; i < missing; i++) {
          const code = `TCK-${crypto.randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`;
          await tx.insert(userTickets).values({
            userId: orderRow.userId,
            orderId: orderRow.id,
            orderItemId: item.id,
            eventId: orderRow.eventId,
            ticketId: item.ticketId,
            ticketCode: code,
            status: 'active',
          });
        }
      }
    });

    revalidatePath('/my-tickets');
    revalidatePath('/');

    return new Response(null, { status: 200 });
  } catch (err: unknown) {
    console.error('MercadoPago webhook error:', err);
    return new Response(null, { status: 500 });
  }
}


