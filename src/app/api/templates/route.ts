import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request): Promise<
  NextResponse<{
    status: number;
    message: string;
  }>
> {
  try {
    const { searchParams } = new URL(req.url);

    const status = "active";
    const rtl = searchParams.get("rtl");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");
    const sort = searchParams.get("sort");
    const limit = Number(searchParams.get("limit") ?? 20);
    const page = Number(searchParams.get("page") ?? 1);
    const search = searchParams.get("search");
    const minScore = searchParams.get("min_score");
    const reviewCount = searchParams.get("review_count");
    const sellCount = searchParams.get("sell_count");

    const categories = searchParams.getAll("categories");
    const tags = searchParams.getAll("tag");
    const addons = searchParams.getAll("addons");
    const features = searchParams.getAll("features");

    const where: Prisma.templatesWhereInput = {
      status: "active",

      ...(rtl && { rtl: rtl === "true" }),

      ...(priceMin && { price: { gte: Number(priceMin) } }),
      ...(priceMax && { price: { lte: Number(priceMax) } }),

      ...(minScore && { score: { gte: Number(minScore) } }),
      ...(reviewCount && { reviewCount: { gte: Number(reviewCount) } }),
      ...(sellCount && { sellCount: { gte: Number(sellCount) } }),

      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),

      // categories filter
      ...(!categories.includes("all") &&
        categories.length > 0 && {
          AND: categories.map((c) => ({
            categories: {
              array_contains: [c],
            },
          })),
        }),

      // tags
      ...(tags.length > 0 && {
        AND: tags.map((tag) => ({
          tags: { array_contains: [tag] },
        })),
      }),

      // addons
      ...(addons.length > 0 && {
        AND: addons.map((a) => ({
          addons: { array_contains: [a] },
        })),
      }),

      // features
      ...(features.length > 0 && {
        AND: features.map((f) => ({
          features: { array_contains: [f] },
        })),
      }),
    };

    // sorting
    let orderBy: Prisma.templatesOrderByWithRelationInput = { id: "desc" };

    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };
    else if (sort === "newest") orderBy = { created_at: "desc" };
    else if (sort === "popular") orderBy = { sellCount: "desc" };

    // fetch
    const templates = await prisma.templates.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      status: 200,
      message: "Templates fetched successfully",
      templates,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
