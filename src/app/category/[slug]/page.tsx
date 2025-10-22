"use client";

import React, { ReactNode, use } from "react";

import TemplateFilterLayout from "@/components/template-filter-layout/TemplateFilterLayout";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps): ReactNode {
  const { slug } = React.use(params);

  return (
    <div>
      <h1>Category: {slug}</h1>
      <TemplateFilterLayout initialCategory={slug} />
    </div>
  );
}
