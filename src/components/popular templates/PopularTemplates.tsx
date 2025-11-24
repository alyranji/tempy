"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { ArrowLeft, Icon } from "iconsax-reactjs";
import Link from "next/link";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import TemplateCard from "../template card/template-card";
import CardSlider from "../template slider/card-slider";

import styles from "./PopularTemplates.module.css";

function PopularTemplates(): ReactNode {
  const [templates, setTemplates] = useState<Template[]>();
  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({ sell_count: 70 });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTemplates();
  }, []);
  return (
    <section className={styles.sectionPadding}>
      <div className={styles.container}>
        <div className={styles.headerWithCta}>
          <div className={styles.titleGroup}>
            <h2 className={styles.sectionTitle}>محبوب‌ترین قالب‌ها</h2>

            <p className={styles.sectionSubtitleSm}>
              پرفروش‌ترین قالب‌های این ماه
            </p>
          </div>

          <Link
            href="/category/all"
            className={`${styles.button} ${styles.outlineButton} ${styles.ctaButton}`}
          >
            مشاهده همه
            <ArrowLeft size={24} />
          </Link>
        </div>
        {templates && <CardSlider templates={templates} />}
      </div>
    </section>
  );
}

export default PopularTemplates;
