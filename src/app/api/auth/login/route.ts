import { success } from "zod";

import { GetDBParams } from "@/shared/common";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

import { loginSchema } from "@/schemas/login.schema";

export async function POST(req: Request): Promise<
  | NextResponse<{
      error: string;
      details: unknown;
    }>
  | NextResponse<string>
  | NextResponse<any>
> {
  try {
    const data = await req.json();

    const parsed = loginSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid data", details: parsed.error.cause },
        { status: 400 },
      );
    }

    const { username, password } = parsed.data;
    const connection = await mysql.createConnection(GetDBParams());

    const [row] = await connection.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
    );

    connection.end();

    if (Array.isArray(row) && row.length > 0) {
      return NextResponse.json({
        user: row[0],
        success: true,
        message: "ورود موفق بود.",
      });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
