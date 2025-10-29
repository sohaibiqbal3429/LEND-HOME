import { NextResponse } from "next/server";

export async function GET() {
  // Replace with NextAuth session lookup.
  return NextResponse.json({ user: null });
}
