"use client";

import React, { ReactNode, use } from "react";

import { categoryDict } from "@/dict/categoryDict";

import TemplateFilterLayout from "@/components/template-filter-layout/TemplateFilterLayout";

import styles from "./CategoryPage.module.css";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps): ReactNode {
  const { slug } = React.use(params);

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.header}>
        <h1>
          دسته بندی:{" "}
          {categoryDict
            .filter((item) => item.value === slug)
            .map((category) => category.label)}
        </h1>
      </div>
      <TemplateFilterLayout initialCategory={slug} inCategoryPage />
    </div>
  );
}
