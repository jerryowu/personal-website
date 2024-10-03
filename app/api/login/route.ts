import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (
    username === process.env.LOGIN_USERNAME &&
    password === process.env.LOGIN_PASSWORD
  ) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
