export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongoose";
import { Message } from "@/models/Message";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  consent: z.boolean()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const data = ContactSchema.safeParse(payload);
  if (!data.success) {
    return NextResponse.json({ error: data.error.flatten() }, { status: 422 });
  }

  // Persist message for admin view
  try {
    await connectMongo();
    await Message.create({ ...data.data });
  } catch (err) {
    console.error("Failed to save contact message", err);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
