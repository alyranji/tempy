import { GetDBParams } from "@/shared/common";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

import { Template } from "@/types/templates";

const connectionParams = GetDBParams();

export async function POST(req: Request): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | NextResponse<{
      success: boolean;
      error: string;
    }>
> {
  try {
    const template: Template = await req.json();

    const connection = await mysql.createConnection(connectionParams);

    const query = `
      INSERT INTO pixfa_db.templates (
        id, title, image, description, features, demoUrl, slug,
        category, tags, price, isRtl, addOns, createdAt, updatedAt,
        score, sellCount, reviewCount, requirements, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      template.id,
      template.title,
      template.image,
      template.description || null,
      JSON.stringify(template.features || []),
      template.demoUrl,
      template.slug,
      JSON.stringify(template.category || []),
      JSON.stringify(template.tags || []),
      template.price,
      template.isRtl ? 1 : 0,
      JSON.stringify(template.addOns || []),
      template.createdAt || new Date().toISOString(),
      template.updatedAt || new Date().toISOString(),
      template.score,
      template.sellCount,
      template.reviewCount,
      JSON.stringify(template.requirements || []),
      template.status,
    ];

    await connection.execute(query, values);
    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Template inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to insert template" },
      { status: 500 },
    );
  }
}
