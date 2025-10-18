// app/api/templates/route.ts
import { GetDBParams } from "@/shared/common";
import fs from "fs";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const price = formData.get("price") ? Number(formData.get("price")) : 0;
    const demo_url = (formData.get("demo_url") as string) || null;
    const image = formData.get("image") as File | null;
    const rtl = formData.get("isRTL") === "true" ? 1 : 0;

    const categories = ((formData.get("categories") as string) || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const tags = ((formData.get("tags") as string) || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const features = ((formData.get("features") as string) || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const addons = ((formData.get("addons") as string) || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    if (!title) {
      return NextResponse.json({
        success: false,
        message: "عنوان الزامی است.",
      });
    }

    const slug = `${title.replace(/\s+/g, "-")}-${Date.now()}`;

    // ذخیره تصویر
    const uploadDir = path.join(process.cwd(), "public", "templates");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    let imageUrl: string | null = null;
    if (image && image.size > 0) {
      const ext = path.extname(image.name) || ".jpg";
      const filename = `${slug}${ext}`;
      const filepath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
      imageUrl = `/templates/${filename}`;
    }

    const connection = await mysql.createConnection(GetDBParams());

    await connection.execute(
      `INSERT INTO templates
      (title, description, price, demo_url, image, slug, rtl, categories, tags, features, addons)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        price,
        demo_url,
        imageUrl,
        slug,
        rtl,
        JSON.stringify(categories),
        JSON.stringify(tags),
        JSON.stringify(features),
        JSON.stringify(addons),
      ],
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "تمپلیت با موفقیت ذخیره شد.",
      slug,
    });
  } catch (error: any) {
    console.error("❌ Error in /api/templates:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
