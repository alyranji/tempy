"use client";

import { ChangeEvent, useEffect, useState } from "react";
import React, { ReactNode } from "react";

import clsx from "clsx";

import {
  Category,
  Crown,
  ElementPlus,
  LanguageSquare,
  WalletMoney,
} from "iconsax-reactjs";
import { ArrowDown2, Sort } from "iconsax-reactjs";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import CardGrid from "../card grid/CardGrid";

import styles from "./TemplateFilterLayout.module.css";

interface TemplateFilterLayoutProps {
  initialCategory?: string;
}

function TemplateFilterLayout({
  initialCategory,
}: TemplateFilterLayoutProps): ReactNode {
  const [templates, setTemplates] = useState<Template[]>();
  const [rtl, setRtl] = useState<boolean | undefined>();
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("newest");
  const [sellCount, setSellCount] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>(2500000);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(10000000);
  const [reviewCount] = useState<number | undefined>();

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({
          rtl,
          sort,
          price_max: maxPrice,
          review_count: reviewCount,
          categories: category ? [category] : undefined,
          sell_count: sellCount,
        });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTemplates();
  }, [rtl, sort, maxPrice, reviewCount, category, sellCount]);

  const setPrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(parseInt(e.target.value));
    setMinPrice(parseInt(e.target.min));
  };

  const categoryData = [
    { value: undefined, label: "همه" },
    { value: "portfolio", label: "نمونه کار" },
    { value: "store", label: "فروشگاهی" },
    { value: "corp", label: "شرکتی" },
    { value: "personal", label: "شخصی" },
    { value: "blog", label: "وبلاگ" },
    { value: "news", label: "خبری" },
    { value: "marketing", label: "دیجیتال مارکتینگ" },
    { value: "startup", label: "استارتاپی" },
    { value: "edu", label: "آموزشی" },
    { value: "landing", label: "لندینگ پیج" },
  ];
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.card}>
          <h2 className={styles.title}>فیلتر قالب‌ها</h2>

          <div className={styles.section}>
            <button className={styles.sectionToggle}>
              <Category />
              <h3 className={styles.sectionTitle}> بر اساس کسب و کار</h3>

              <ArrowDown2 className={styles.icon} />
            </button>

            <div className={styles.sectionContent}>
              {categoryData.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={clsx(
                    styles.categoryLink,
                    category === item.value && styles.active,
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory(item.value);
                  }}
                >
                  <div className={styles.activeDot}></div>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <button className={styles.sectionToggle}>
              <WalletMoney />

              <h3 className={styles.sectionTitle}>محدوده قیمت</h3>
              <ArrowDown2 className={styles.icon} />
            </button>

            <div className={styles.sectionContent}>
              <input
                type="range"
                min="2500000"
                max="10000000"
                step="500000"
                onChange={setPrice}
                className={styles.slider}
              />
              <div className={styles.priceLabels}>
                از
                <span>{minPrice?.toLocaleString("fa-IR")} تومان</span>
                تا
                <span>{maxPrice?.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <button className={styles.sectionToggle}>
              <ElementPlus />
              <h3 className={styles.sectionTitle}>ویژگی‌ها</h3>
              <ArrowDown2 className={styles.icon} />
            </button>

            <div className={styles.sectionContent}>
              <div className={styles.checkboxRow}>
                <label className={styles.toggle}>
                  <div>
                    <Crown />
                    <span className={styles.labelText}>فقط محصولات پرفروش</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={!!sellCount}
                    onChange={() =>
                      setSellCount((old) => (old ? undefined : 100))
                    }
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.checkboxRow}>
                <label htmlFor="rtl-checkbox" className={styles.toggle}>
                  <div>
                    <LanguageSquare />
                    <span className={styles.labelText}>فقط محصولات فارسی</span>
                  </div>

                  <input
                    id="rtl-checkbox"
                    type="checkbox"
                    checked={!!rtl}
                    onChange={() => setRtl((old) => (old ? undefined : true))}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
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
