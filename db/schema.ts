import { int, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  age: int("age").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  /** Level selected in step 1 (1-4) */
  classLevel: int("class_level").notNull(),
  /** Preferred level from the details form (1-4), optional */
  preferredLevel: int("preferred_level"),
  /** ISO date string YYYY-MM-DD */
  bookingDate: varchar("booking_date", { length: 10 }).notNull(),
  timeSlot: varchar("time_slot", { length: 40 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = mysqlTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 120 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
