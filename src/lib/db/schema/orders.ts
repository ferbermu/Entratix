import {
  pgTable,
  text,
  timestamp,
  decimal,
  integer,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { events, tickets } from './events';

// Estados de la orden
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'paypal' | 'stripe';

// Tabla de órdenes
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  orderNumber: text('order_number').notNull().unique(), // Número de orden único (ej: ORD-20231215-001)
  status: text('status').notNull().default('pending'), // pending, processing, completed, cancelled, refunded
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxes: decimal('taxes', { precision: 10, scale: 2 }).notNull().default('0'),
  serviceFee: decimal('service_fee', { precision: 10, scale: 2 }).notNull().default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USD'),
  paymentStatus: text('payment_status').notNull().default('pending'), // pending, completed, failed, refunded
  paymentMethod: text('payment_method'), // cash, credit_card, debit_card, paypal, stripe
  paymentTransactionId: text('payment_transaction_id'), // ID de la transacción del método de pago
  notes: text('notes'), // Notas adicionales
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }), // Fecha de completación
  cancelledAt: timestamp('cancelled_at', { withTimezone: true }), // Fecha de cancelación
});

// Tabla de items de la orden (tickets comprados)
export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => tickets.id, { onDelete: 'cascade' }),
  ticketType: text('ticket_type').notNull(), // Tipo de ticket (General, VIP, etc.)
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(), // Precio unitario al momento de la compra
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(), // quantity * unitPrice
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de tickets de usuario (tickets individuales asignados)
export const userTickets = pgTable('user_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  orderItemId: uuid('order_item_id')
    .notNull()
    .references(() => orderItems.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => tickets.id, { onDelete: 'cascade' }),
  ticketCode: text('ticket_code').notNull().unique(), // Código único del ticket (QR)
  ticketType: text('ticket_type').notNull(),
  status: text('status').notNull().default('active'), // active, used, cancelled, refunded
  usedAt: timestamp('used_at', { withTimezone: true }), // Fecha de uso del ticket
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de transacciones de pago
export const paymentTransactions = pgTable('payment_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USD'),
  paymentMethod: text('payment_method').notNull(),
  status: text('status').notNull().default('pending'), // pending, completed, failed, refunded
  transactionId: text('transaction_id'), // ID externo del procesador de pagos
  metadata: text('metadata'), // JSON con datos adicionales del pago
  errorMessage: text('error_message'), // Mensaje de error si falla
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

// Relaciones
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [orders.eventId],
    references: [events.id],
  }),
  orderItems: many(orderItems),
  userTickets: many(userTickets),
  paymentTransactions: many(paymentTransactions),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  ticket: one(tickets, {
    fields: [orderItems.ticketId],
    references: [tickets.id],
  }),
}));

export const userTicketsRelations = relations(userTickets, ({ one }) => ({
  user: one(users, {
    fields: [userTickets.userId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [userTickets.orderId],
    references: [orders.id],
  }),
  orderItem: one(orderItems, {
    fields: [userTickets.orderItemId],
    references: [orderItems.id],
  }),
  event: one(events, {
    fields: [userTickets.eventId],
    references: [events.id],
  }),
  ticket: one(tickets, {
    fields: [userTickets.ticketId],
    references: [tickets.id],
  }),
}));

export const paymentTransactionsRelations = relations(paymentTransactions, ({ one }) => ({
  order: one(orders, {
    fields: [paymentTransactions.orderId],
    references: [orders.id],
  }),
}));

// Tipos inferidos
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type UserTicket = typeof userTickets.$inferSelect;
export type NewUserTicket = typeof userTickets.$inferInsert;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type NewPaymentTransaction = typeof paymentTransactions.$inferInsert;

