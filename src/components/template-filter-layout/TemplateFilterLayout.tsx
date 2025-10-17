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
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("newest");

  const [minPrice, setMinPrice] = useState<number>(2500000);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({
          isRtl,
          sort,
          price_max: maxPrice,
        });
        setTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [isRtl, sort, maxPrice]);

  const setPrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(parseInt(e.target.value));
    setMinPrice(parseInt(e.target.min));
  };
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.card}>
          <h2 className={styles.title}>فیلتر قالب‌ها</h2>

          <div className={styles.section}>
            <button
              className={styles.sectionToggle}
              onClick={() => setOpenAccordion((old) => !old)}
            >
              <Category />
              <h3 className={styles.sectionTitle}> بر اساس دسته‌بندی</h3>
              {openAccordion ? (
                <ArrowDown2 className={styles.icon} />
              ) : (
                <ArrowUp2 className={styles.icon} />
              )}
            </button>

            <div
              className={clsx(styles.sectionContent)}
              style={{
                display: `${openAccordion ? "block" : "none"}`,
              }}
            >
              <a href="#" className={`${styles.categoryLink} ${styles.active}`}>
                <div className={styles.activeDot}></div>
                <span>صفحه فرود</span>
              </a>
              <a href="#" className={styles.categoryLink}>
                <span>شرکتی</span>
              </a>
              <a href="#" className={styles.categoryLink}>
                <span>فروشگاهی</span>
              </a>
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
                <span>{maxPrice?.toLocaleString("fa-IR")}تومان</span>
                <span>{minPrice?.toLocaleString("fa-IR")} تومان</span>
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
                    checked={!!isRtl}
                    onChange={() => setIsRtl((old) => (old ? undefined : true))}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.checkboxRow}>
                <label className={styles.toggle}>
                  <div>
                    <LanguageSquare />
                    <span className={styles.labelText}>فقط محصولات فارسی</span>
                  </div>

                  <input
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
