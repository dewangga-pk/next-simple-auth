import { NextResponse, NextRequest } from "next/server";
import { logout } from "@/auth";

export async function GET(request: NextRequest) {
  const response = await logout()

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ message: 'success' });
}