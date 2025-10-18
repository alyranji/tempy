// src/app/api/templates/route.ts
import { GetDBParams } from "@/shared/common";
import fs from "fs";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // دریافت فیلدها
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const demo_url = formData.get("demo_url") as string;
    const slug = formData.get("slug") as string;
    const price = Number(formData.get("price"));
    const rtl = formData.get("rtl") === "true";
    const status = (formData.get("status") as "active" | "draft") || "active";

    // آرایه‌ها را parse کن
    const categories = formData.get("categories")
      ? JSON.stringify(JSON.parse(formData.get("categories") as string))
      : JSON.stringify([]);
    const tags = formData.get("tags")
      ? JSON.stringify(JSON.parse(formData.get("tags") as string))
      : JSON.stringify([]);
    const features = formData.get("features")
      ? JSON.stringify(JSON.parse(formData.get("features") as string))
      : JSON.stringify([]);
    const addons = formData.get("addons")
      ? JSON.stringify(JSON.parse(formData.get("addons") as string))
      : JSON.stringify([]);
    const requirements = formData.get("requirements")
      ? JSON.stringify(JSON.parse(formData.get("requirements") as string))
      : JSON.stringify([]);

    // ذخیره تصویر
    const imageFile = formData.get("image") as File | null;
    let imagePath = "";
    if (imageFile && imageFile.name) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const ext = path.extname(imageFile.name);
      const fileName = `${slug}${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "templates");

      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/templates/${fileName}`;
    }

    // اتصال به دیتابیس
    const connection = await mysql.createConnection(GetDBParams());

    const insertQuery = `
      INSERT INTO templates
      (title, description, demo_url, slug, price, rtl, status, categories, tags, features, addons, requirements, image, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [
      title,
      description || "",
      demo_url || "",
      slug,
      price,
      rtl ? 1 : 0,
      status,
      categories,
      tags,
      features,
      addons,
      requirements,
      imagePath,
    ];

    const [result] = await connection.execute(insertQuery, values);

    await connection.end();

    return NextResponse.json({
      status: 200,
      message: "Template inserted successfully",
      id: (result as any).insertId,
    });
  } catch (error) {
    console.error("Error inserting template:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to insert template" },
      { status: 500 },
    );
  }
}
