import { pgTable, uuid, text, timestamp, decimal, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { events, tickets as eventTickets } from './events';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  orderNumber: text('order_number').notNull().unique(),
  status: text('status', { enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'] }).default('pending').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxes: decimal('taxes', { precision: 10, scale: 2 }).notNull(),
  serviceFee: decimal('service_fee', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  paymentStatus: text('payment_status', { enum: ['pending', 'completed', 'failed', 'refunded'] }).default('pending').notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentTransactionId: uuid('payment_transaction_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id').notNull().references(() => eventTickets.id, { onDelete: 'cascade' }),
  ticketType: text('ticket_type').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const userTickets = pgTable('user_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  orderItemId: uuid('order_item_id').notNull().references(() => orderItems.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id').notNull().references(() => eventTickets.id, { onDelete: 'cascade' }),
  ticketCode: text('ticket_code').notNull().unique(),
  status: text('status', { enum: ['active', 'used', 'cancelled', 'refunded'] }).default('active').notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const paymentTransactions = pgTable('payment_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  paymentMethod: text('payment_method').notNull(),
  status: text('status', { enum: ['pending', 'completed', 'failed', 'refunded'] }).default('pending').notNull(),
  transactionId: text('transaction_id'),
  metadata: text('metadata'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  event: one(events, { fields: [orders.eventId], references: [events.id] }),
  items: many(orderItems),
  paymentTransaction: one(paymentTransactions, { fields: [orders.paymentTransactionId], references: [paymentTransactions.id] }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  ticket: one(eventTickets, { fields: [orderItems.ticketId], references: [eventTickets.id] }),
}));

export const userTicketsRelations = relations(userTickets, ({ one }) => ({
  user: one(users, { fields: [userTickets.userId], references: [users.id] }),
  order: one(orders, { fields: [userTickets.orderId], references: [orders.id] }),
  orderItem: one(orderItems, { fields: [userTickets.orderItemId], references: [orderItems.id] }),
  event: one(events, { fields: [userTickets.eventId], references: [events.id] }),
  ticket: one(eventTickets, { fields: [userTickets.ticketId], references: [eventTickets.id] }),
}));

export const paymentTransactionsRelations = relations(paymentTransactions, ({ one }) => ({
  order: one(orders, { fields: [paymentTransactions.orderId], references: [orders.id] }),
}));

