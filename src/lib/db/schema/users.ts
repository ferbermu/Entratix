import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Tabla de usuarios
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  birthDate: timestamp('birth_date', { withTimezone: true }),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('user').notNull(), // 'user', 'productor', 'rrpp', 'superuser'
  
  // Settings - Notification Preferences
  emailNotifications: boolean('email_notifications').default(true).notNull(),
  smsNotifications: boolean('sms_notifications').default(false).notNull(),
  pushNotifications: boolean('push_notifications').default(true).notNull(),
  
  // Settings - Privacy & Security
  profileVisibility: text('profile_visibility').default('Public').notNull(), // 'Public', 'Private', 'Friends Only'
  dataSharing: boolean('data_sharing').default(true).notNull(),
  
  // Account Status
  isActive: boolean('is_active').default(true).notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  receiveUpdates: boolean('receive_updates').default(false).notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de sesiones (opcional, para manejar múltiples sesiones)
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tipos inferidos
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
