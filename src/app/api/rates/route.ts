import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { RateProduct } from "@/models/RateProduct";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  await connectMongo();
  const query: any = { isActive: true };
  if (type) query.type = type;
  const rates = await RateProduct.find(query).sort({ ltvMax: -1 }).lean();
  return NextResponse.json({ rates });
}
