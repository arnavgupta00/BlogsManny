import { NextRequest, NextResponse } from "next/server";

export  async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email == process.env.ADMIN_EMAIL &&
    password == process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ status: "success" });
  } else {
    return NextResponse.json({ status: "failed" });
  }
}
