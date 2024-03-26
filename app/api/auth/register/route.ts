import { NextResponse, NextRequest } from "next/server";
import { signUp } from "@/auth";

export async function POST(request: NextRequest) {
  const body: { name: string, password:string, phone:string } = await request.json();
  const response = await signUp({
    name: body.name,
    password: body.password,
    phone: body.phone,
  })

  // simulate IO latency
  // await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ message: response });
}