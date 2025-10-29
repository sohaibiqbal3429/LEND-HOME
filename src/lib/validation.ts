import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  propertyPrice: z.number().positive(),
  deposit: z.number().nonnegative()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
});

export type LeadPayload = z.infer<typeof leadSchema>;
export type ContactPayload = z.infer<typeof contactSchema>;
