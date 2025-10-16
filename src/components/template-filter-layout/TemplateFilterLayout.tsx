"use client";

import { useEffect, useRef, useState } from "react";
import React, { ReactNode } from "react";

import { Category, Trash } from "iconsax-reactjs";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import CardGrid from "../card grid/CardGrid";

import styles from "./TemplateFilterLayout.module.css";

function TemplateFilterLayout(): ReactNode {
  const [templates, setTemplates] = useState<Template[]>();
  const [loading, setLoading] = useState(true);

  const [isRtl, setIsRtl] = useState<boolean>();

  useEffect(() => {
    console.log(isRtl);
  }, [isRtl]);

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({ isRtl: isRtl });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [isRtl]);

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
          <div>بروزترین</div>
          <div>جدیدترین</div>
          <div> پرفروش ترین</div>
          <div> پرتخفیف ترین ها</div>
        </div>
        <CardGrid templates={templates} />
      </div>
    </div>
  );
}

export default TemplateFilterLayout;
