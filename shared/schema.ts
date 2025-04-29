import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from Firebase Authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // We'll use Firebase Auth so we don't need to handle passwords directly
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Party enum for vote validation
export const partyEnum = z.enum([
  "npp", // National Peoples Power
  "sjb", // Samagi Jana Balawegaya
  "slpp", // Sri Lanka Podu Jana Peramuna
  "unp", // United National Party
  "sb", // Sarwajana Balaya
  "other", // Other parties
]);

export type PartyId = z.infer<typeof partyEnum>;

// Vote schema for election survey
export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  nic: text("nic").notNull().unique(), // Used to prevent duplicate voting
  district: text("district").notNull(),
  localGovernment: text("local_government").notNull(),
  party: text("party").notNull(), // One of the party enum values
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userId: text("user_id").notNull(), // Firebase Auth user ID
});

// Vote submission schema
export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  timestamp: true,
}).extend({
  party: partyEnum,
  mobileNumber: z.string().regex(/^0[0-9]{9}$/, "Mobile number must be 10 digits starting with 0"),
  nic: z.string().refine(
    (val) => {
      const oldNICPattern = /^[0-9]{9}[vVxX]$/;
      const newNICPattern = /^[0-9]{12}$/;
      return oldNICPattern.test(val) || newNICPattern.test(val);
    },
    { message: "NIC must be in format 9 digits + V/X or 12 digits" }
  ),
});

// Party results schema for API responses
export const partyResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  votes: z.number(),
  percentage: z.number(),
});

export const resultsResponseSchema = z.object({
  parties: z.array(partyResultSchema),
  totalVotes: z.number(),
  lastUpdated: z.string(),
  districts: z.array(z.string()).optional(),
  localGovernments: z.array(z.string()).optional(),
  filters: z.object({
    district: z.string().nullable(),
    localGovernment: z.string().nullable()
  }).optional()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;
export type PartyResult = z.infer<typeof partyResultSchema>;
export type ResultsResponse = z.infer<typeof resultsResponseSchema>;
