import { GetDBParams } from "@/shared/common";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

import { Template } from "@/types/templates";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    const status = "active";
    const rtl = searchParams.get("rtl");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const minScore = searchParams.get("min_score");
    const reviewCount = searchParams.get("review_count");
    const sellCount = searchParams.get("sell_count");

    const categories = searchParams.getAll("categories");
    const tag = searchParams.getAll("tag");
    const addons = searchParams.getAll("addons");
    const features = searchParams.getAll("features");

    const connection = await mysql.createConnection(GetDBParams());

    let query = `SELECT * FROM templates WHERE status = ?`;
    const values: (string | number)[] = [status];

    if (rtl) {
      query += " AND rtl = ?";
      values.push(rtl === "true" ? 1 : 0);
    }
    console.log(Array.from(searchParams.entries()));

    if (priceMin) {
      query += " AND price >= ?";
      values.push(Number(priceMin));
    }

    if (priceMax) {
      query += " AND price <= ?";
      values.push(Number(priceMax));
    }

    if (minScore) {
      query += " AND score >= ?";
      values.push(Number(minScore));
    }

    if (reviewCount) {
      query += " AND reviewCount >= ?";
      values.push(Number(reviewCount));
    }
    if (sellCount) {
      query += " AND sellCount >= ?";
      values.push(Number(sellCount));
    }

    if (search) {
      query += " AND (title LIKE ? OR description LIKE ?)";
      values.push(`%${search}%`, `%${search}%`);
    }

    categories.forEach((c) => {
      query += ` AND JSON_CONTAINS(categories, ?)`;
      values.push(JSON.stringify(c));
    });

    tag.forEach((t) => {
      query += ` AND JSON_CONTAINS(tags, ?)`;
      values.push(JSON.stringify(t));
    });

    addons.forEach((a) => {
      query += ` AND JSON_CONTAINS(addons, ?)`;
      values.push(JSON.stringify(a));
    });

    features.forEach((f) => {
      query += ` AND JSON_CONTAINS(features, ?)`;
      values.push(JSON.stringify(f));
    });

    // مرتب سازی
    if (sort) {
      if (sort === "price_asc") query += " ORDER BY price ASC";
      else if (sort === "price_desc") query += " ORDER BY price DESC";
      else if (sort === "newest") query += " ORDER BY created_at DESC";
      else if (sort === "popular") query += " ORDER BY sellCount DESC";
    }

    if (limit) {
      const pageNum = page ? Number(page) : 1;
      const offset = (pageNum - 1) * Number(limit);
      query += ` LIMIT ${offset}, ${limit}`;
    }
    console.log("query: ", query);
    console.log("values: ", values);
    const [rows] = await connection.execute(query, values);

    const templates: Template[] = (rows as any[]).map((template) => ({
      ...template,
      price: template.price ?? 0,
      score: template.score ?? null,
      sellCount: template.sellCount ?? 0,
      reviewCount: template.reviewCount ?? 0,
      categories: template.categories
        ? JSON.parse(JSON.stringify(template.categories))
        : [],
      tags: template.tags ? JSON.parse(JSON.stringify(template.tags)) : [],
      features: template.features
        ? JSON.parse(JSON.stringify(template.features))
        : [],
      addons: template.addons
        ? JSON.parse(JSON.stringify(template.addons))
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
