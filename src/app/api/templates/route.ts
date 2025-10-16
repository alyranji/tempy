import { GetDBParams } from "@/shared/common";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

import { Template } from "@/types/templates";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    const status = "active";

    const isRtl = searchParams.get("isRtl");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const minScore = searchParams.get("min_score");

    const category = searchParams.getAll("category");
    const tag = searchParams.getAll("tag");
    const addons = searchParams.getAll("addons");
    const features = searchParams.getAll("features");
    const requirements = searchParams.getAll("requirements");

    const connection = await mysql.createConnection(GetDBParams());

    let query = `
      SELECT DISTINCT t.*,
      GROUP_CONCAT(DISTINCT c.value) AS categories,
      GROUP_CONCAT(DISTINCT tg.value) AS tags,
      GROUP_CONCAT(DISTINCT f.value) AS features,
      GROUP_CONCAT(DISTINCT a.value) AS addons,
      GROUP_CONCAT(DISTINCT r.value) AS requirements
      FROM templates t
      LEFT JOIN templates_has_categories thc ON t.id = thc.template_id
      LEFT JOIN categories c ON thc.category_id = c.id
      LEFT JOIN templates_has_tags tht ON t.id = tht.template_id
      LEFT JOIN tags tg ON tht.tag_id = tg.id
      LEFT JOIN templates_has_addons tha ON t.id = tha.template_id
      LEFT JOIN addons a ON tha.addon_id = a.id
      LEFT JOIN templates_has_features thf ON t.id = thf.template_id
      LEFT JOIN features f ON thf.feature_id = f.id
      LEFT JOIN templates_has_requirements thr ON t.id = thr.template_id
      LEFT JOIN requirements r ON thr.requirement_id = r.id
      WHERE t.status = ?
    `;

    const values: (string | number)[] = [status];

    if (isRtl) {
      query += " AND t.isRTL = ?";
      values.push(isRtl === "true" ? 1 : 0);
    }

    if (priceMin) {
      query += " AND t.price >= ?";
      values.push(Number(priceMin));
    }

    if (priceMax) {
      query += " AND t.price <= ?";
      values.push(Number(priceMax));
    }

    if (minScore) {
      query += " AND t.score >= ?";
      values.push(Number(minScore));
    }

    if (search) {
      query += " AND (t.title LIKE ? OR t.description LIKE ?)";
      values.push(`%${search}%`, `%${search}%`);
    }

    if (category.length > 0) {
      query += ` AND c.value IN (${category.map(() => "?").join(",")})`;
      values.push(...category);
    }

    if (tag.length > 0) {
      query += ` AND tg.value IN (${tag.map(() => "?").join(",")})`;
      values.push(...tag);
    }

    if (addons.length > 0) {
      query += ` AND a.value IN (${addons.map(() => "?").join(",")})`;
      values.push(...addons);
    }

    if (features.length > 0) {
      query += ` AND f.value IN (${features.map(() => "?").join(",")})`;
      values.push(...features);
    }

    if (requirements.length > 0) {
      query += ` AND r.value IN (${requirements.map(() => "?").join(",")})`;
      values.push(...requirements);
    }

    query += " GROUP BY t.id";

    if (sort) {
      if (sort === "price_asc") query += " ORDER BY t.price ASC";
      else if (sort === "price_desc") query += " ORDER BY t.price DESC";
      else if (sort === "newest") query += " ORDER BY t.createdAt DESC";
      else if (sort === "popular") query += " ORDER BY t.sellCount DESC";
    }

    if (limit) {
      const pageNum = page ? Number(page) : 1;
      const offset = (pageNum - 1) * Number(limit);
      query += ` LIMIT ${offset}, ${limit}`;
    }

    const [rows] = await connection.execute(query, values);

    const templates: Template[] = (rows as any[]).map((template) => ({
      ...template,
      categories: template.categories
        ? template.categories.split(",").map((c: string) => c.trim())
        : [],
      tags: template.tags
        ? template.tags.split(",").map((t: string) => t.trim())
        : [],
      features: template.features
        ? template.features.split(",").map((f: string) => f.trim())
        : [],
      addons: template.addons
        ? template.addons.split(",").map((a: string) => a.trim())
        : [],
      requirements: template.requirements
        ? template.requirements.split(",").map((r: string) => r.trim())
        : [],
    }));

    await connection.end();

    return NextResponse.json({
      status: 200,
      message: "Templates fetched successfully",
      templates,
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
