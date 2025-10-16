import { NextRequest, NextResponse } from "next/server";

import { loginSchema } from "@/schemas/login.schema";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { username, password } = parsed.data;

    const fakeUser = {
      username: "ali.ranjbaran76@gmail.com",
      password: "880266666ali",
    };

    if (username !== fakeUser.username || password !== fakeUser.password) {
      return NextResponse.json(
        { success: false, message: "ایمیل یا رمز عبور اشتباه است." },
        { status: 401 },
      );
    }

    // --- اگر موفق بود:
    // (در حالت واقعی، اینجا JWT یا Session Cookie تنظیم میشه)
    return NextResponse.json(
      {
        success: true,
        message: "ورود با موفقیت انجام شد.",
        user: { username },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { success: false, message: "خطای داخلی سرور" },
      { status: 500 },
    );
  }
}
