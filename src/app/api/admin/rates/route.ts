import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { RateProduct } from "@/models/RateProduct";

export async function GET() {
  await connectMongo();
  const rates = await RateProduct.find({ isActive: true }).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ rates });
}

export async function POST(request: Request) {
  const payload = await request.json();
  await connectMongo();
  const created = await RateProduct.create(payload);
  return NextResponse.json({ success: true, id: created._id });
}
