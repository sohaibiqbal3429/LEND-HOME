export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json();
  await connectMongo();
  await Lead.findByIdAndUpdate(params.id, payload);
  return NextResponse.json({ success: true });
}
