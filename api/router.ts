import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings, contactMessages } from "../db/schema";

const bookingInput = z.object({
  fullName: z.string().trim().min(2).max(120),
  age: z.number().int().min(5).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(40),
  classLevel: z.number().int().min(1).max(4),
  preferredLevel: z.number().int().min(1).max(4).optional(),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(5).max(40),
  notes: z.string().trim().max(1000).optional(),
});

const contactInput = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(2000),
});

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  booking: createRouter({
    create: publicQuery.input(bookingInput).mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(bookings).values(input).$returningId();
      return { id: result?.id ?? null };
    }),
  }),

  contact: createRouter({
    create: publicQuery.input(contactInput).mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(contactMessages).values(input).$returningId();
      return { id: result?.id ?? null };
    }),
  }),
});

export type AppRouter = typeof appRouter;
