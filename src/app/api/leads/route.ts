export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  propertyPrice: z.number().positive(),
  deposit: z.number().nonnegative(),
  incomeBand: z.string().optional()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const data = LeadSchema.safeParse(payload);
  if (!data.success) {
    return NextResponse.json({ error: data.error.flatten() }, { status: 422 });
  }

  await connectMongo();
  const created = await Lead.create({
    ...data.data,
    propertyPrice: Number(data.data.propertyPrice),
    deposit: Number(data.data.deposit)
  });

  return NextResponse.json({ success: true, leadId: created._id.toString() });
}
