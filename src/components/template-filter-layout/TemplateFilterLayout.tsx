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
import { ArrowDown2, ArrowUp2, Sort } from "iconsax-reactjs";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import CardGrid from "../card grid/CardGrid";

import styles from "./TemplateFilterLayout.module.css";

function TemplateFilterLayout(): ReactNode {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>();
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);
  const [isRtl, setIsRtl] = useState<boolean | undefined>();
  const [category, setCategory] = useState<string>();
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("newest");

  const [minPrice, setMinPrice] = useState<number>(2500000);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [reviewCount, setReviewCount] = useState<number>();

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({
          isRtl,
          sort,
          price_max: maxPrice,
          review_count: reviewCount,
          category,
        });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [isRtl, sort, maxPrice, reviewCount, category]);

  const setPrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(parseInt(e.target.value));
    setMinPrice(parseInt(e.target.min));
  };

  const categoryData = [
    { value: undefined, label: "همه" },
    { value: "store", label: "فروشگاهی" },
    { value: "corp", label: "شرکتی" },
    { value: "portfolio", label: "نمونه کار" },
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
              <h3 className={styles.sectionTitle}> بر اساس دسته‌بندی</h3>

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
                <span>{maxPrice?.toLocaleString("fa-IR")}تومان</span>
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
                    <span className={styles.labelText}>فقط محصولات ویژه</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={!!reviewCount}
                    onChange={() =>
                      setReviewCount((old) => (old ? undefined : 250))
                    } // more than 100 review :D is vizhe
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
                    checked={!!isRtl}
                    onChange={() => setIsRtl((old) => (old ? undefined : true))}
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
