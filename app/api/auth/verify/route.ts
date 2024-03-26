import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/auth";

export async function GET() {
  const response = await getSession()
  
  if (!response) return NextResponse.json({user: null})

  return NextResponse.json({user: response.user})
}