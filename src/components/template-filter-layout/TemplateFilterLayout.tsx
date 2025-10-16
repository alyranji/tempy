"use client";

import { useEffect, useState } from "react";
import React, { ReactNode } from "react";

import clsx from "clsx";

import { Category, Trash } from "iconsax-reactjs";
import { Sort } from "iconsax-reactjs";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import { Button } from "../button/button";
import CardGrid from "../card grid/CardGrid";

import styles from "./TemplateFilterLayout.module.css";

function TemplateFilterLayout(): ReactNode {
  const [templates, setTemplates] = useState<Template[]>();
  const [loading, setLoading] = useState(true);

  const [isRtl, setIsRtl] = useState<boolean>();
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("newest");

  useEffect(() => {
    console.log(isRtl);
  }, [isRtl]);

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({ isRtl: isRtl, sort: sort });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [isRtl, sort]);

  return (
    <div className={styles.layout}>
      <div className={styles.filters}>
        <div className={styles.filteritem}>
          <Trash className={styles.icon} />
          <span>پاک کردن فیلنرها</span>
        </div>
        <div className={styles.filteritem}>
          <Category className={styles.icon} />
          <span>دسته‌بندی محصولات</span>
        </div>
        <label htmlFor="check-rtl">
          <input
            type="checkbox"
            id="check-rtl-input"
            name="check-rtl"
            onChange={(e) => setIsRtl(e.target.checked)}
          />
          راستچین
        </label>
      </div>
      <div className={styles.left}>
        <div className={styles.sorting}>
          <Sort />
          <p>مرتب سازی:</p>
          <span
            onClick={() => setSort("newest")}
            className={clsx(
              styles.sortingItem,
              sort === "newest" && styles.active,
            )}
          >
            بروزترین
          </span>
          <span
            onClick={() => setSort("price_asc")}
            className={clsx(
              styles.sortingItem,
              sort === "price_asc" && styles.active,
            )}
          >
            ارزانترین
          </span>

          <span
            onClick={() => setSort("popular")}
            className={clsx(
              styles.sortingItem,
              sort === "popular" && styles.active,
            )}
          >
            پرفروش‌ترین
          </span>

          <span
            onClick={() => setSort("price_desc")}
            className={clsx(
              styles.sortingItem,
              sort === "price_desc" && styles.active,
            )}
          >
            گرانترین
          </span>
        </div>
        <CardGrid templates={templates} />
      </div>
    </div>
  );
}

export default TemplateFilterLayout;
