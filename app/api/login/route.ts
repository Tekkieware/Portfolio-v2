import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const accessKey = body.accessKey;
  const expectedKey = process.env.ACCESS_KEY;

  if (accessKey !== expectedKey) {
    return NextResponse.json(
      { message: "Access denied, you seem like an intruder" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  const maxAge = 60 * 60 * 3;
  response.cookies.set("isadmin", "true", {
    httpOnly: true,
    maxAge,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
