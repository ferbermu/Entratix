import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone: text('phone'),
  birthDate: text('birth_date'),
  role: text('role', { enum: ['user', 'productor', 'rrpp', 'superuser'] }).default('user').notNull(),
  profileImageUrl: text('profile_image_url'),
  bio: text('bio'),
  emailNotifications: boolean('email_notifications').default(true).notNull(),
  smsNotifications: boolean('sms_notifications').default(false).notNull(),
  pushNotifications: boolean('push_notifications').default(true).notNull(),
  profileVisibility: text('profile_visibility').default('Public').notNull(),
  dataSharing: boolean('data_sharing').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  eventsCreated: many('events'),
  orders: many('orders'),
  tickets: many('user_tickets'),
}));

