import { NextResponse, NextRequest } from "next/server";
import { login } from "@/auth";

export async function POST(request: NextRequest) {
  const body: { username: string, password:string } = await request.json();
  const response = await login(body)

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: response });
}