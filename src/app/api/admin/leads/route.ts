export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

export async function GET() {
  await connectMongo();
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  await connectMongo();
  const body = await request.json();
  const created = await Lead.create(body);
  return NextResponse.json({ success: true, id: created._id });
}
