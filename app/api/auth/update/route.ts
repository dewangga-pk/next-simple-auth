import { NextResponse, NextRequest } from "next/server";
import { updateUser } from "@/auth";

export async function PUT(request: NextRequest) {
  const body: { name_old:string, name: string, password_old:string, password_new:string, phone:string } = await request.json();
  const response = await updateUser(body)

  // simulate IO latency
  // await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ user: response });
}