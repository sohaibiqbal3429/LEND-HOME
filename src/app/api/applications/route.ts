import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongoose";
import { Application } from "@/models/Application";

const ApplicationSchema = z.object({
  stage: z.string().optional(),
  payload: z.record(z.any()).optional()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const data = ApplicationSchema.safeParse(payload);
  if (!data.success) {
    return NextResponse.json({ error: data.error.flatten() }, { status: 422 });
  }

  await connectMongo();
  const created = await Application.create({ ...data.data, userId: data.data.userId || undefined });
  return NextResponse.json({ success: true, id: created._id });
}
