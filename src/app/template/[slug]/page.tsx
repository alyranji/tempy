"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

import { Eye, ShoppingCart, Star, TickSquare } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/button/button";

import { type Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import styles from "./page.module.css";

interface TemplatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function Page({ params }: TemplatePageProps): ReactNode {
  const { slug } = React.use(params);

  const [template, setTemplate] = useState<Template | undefined>();
  const [loading, setLoading] = useState(true);

  if (!slug) {
    notFound();
  }

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({});
        const template = data.find((item) => item.slug === slug);
        setTemplate(template);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [slug]);

  if (!template)
    return <div className={styles.loading}>در حال بارگذاری...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>{template.title}</header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.main}>
            <div className={styles.imageBox}>
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                quality={100}
                fill
                priority={true}
                className={styles.image}
              />
              <div className={styles.badge}>ویژه</div>
            </div>

            <div className={styles.actionButtons}>
              <Link
                href={`/preview/${template.id}`}
                target="_blank"
                className={styles.primaryBtn}
              >
                <Button variant="primary" className={styles.previewBtn}>
                  پیش‌نمایش زنده
                </Button>
              </Link>

              <Link href={template.demo_url} target="_blank">
                <Button variant="outline">دمو</Button>
              </Link>
            </div>

            <div className={styles.card}>
              <h1 className={styles.title}>{template.title}</h1>

              <div className={styles.category}>
                <span>دسته‌بندی:</span>

                {template.categories.map((c, index) => (
                  <Link
                    key={index}
                    href={`/category/${c}`}
                    className={styles.categoryTag}
                  >
                    {c}
                  </Link>
                ))}
              </div>

              <div className={styles.tags}>
                {template.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.section}>
                <h2>توضیحات</h2>
                <p>{template.description}</p>
              </div>

              <div className={styles.section}>
                <h2>ویژگی‌ها</h2>
                <div className={styles.features}>
                  {template.features.map((feature) => (
                    <div key={feature} className={styles.feature}>
                      <TickSquare className={styles.featureIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2>نظرات کاربران</h2>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={styles.starFilled} />
                    ))}
                  </div>
                  <span className={styles.score}>۴.۸</span>
                </div>
                <p className={styles.reviewCount}>بر اساس ۱۲۴ نظر</p>
              </div>
            </div>
          </div>

          {/* ---------- سایدبار ---------- */}
          <aside className={styles.sidebar}>
            <div className={styles.priceBox}>
              <div className={styles.price}>
                {template.price.toLocaleString("fa-IR")} تومان
              </div>
              <p>خرید یک‌باره - مالکیت دائمی</p>

              <div className={styles.btnwrapper}>
                <Link href={`/checkout/${template.slug}`}>
                  <Button
                    variant="primary"
                    icon={<ShoppingCart />}
                    className={styles.icon}
                  >
                    خرید قالب
                  </Button>
                </Link>

                <Link href={`/preview/${template.id}`} target="_blank">
                  <Button
                    variant="outline"
                    icon={<Eye />}
                    className={styles.icon}
                  >
                    مشاهده پیش‌نمایش
                  </Button>
                </Link>
              </div>

              <div className={styles.benefits}>
                <div>
                  <TickSquare variant="Bold" className={styles.benefitIcon} />
                  <span>پشتیبانی ۶ ماهه</span>
                </div>
                <div>
                  <TickSquare variant="Bold" className={styles.benefitIcon} />
                  <span>آپدیت رایگان</span>
                </div>
                <div>
                  <TickSquare variant="Bold" className={styles.benefitIcon} />
                  <span>دانلود فوری</span>
                </div>
              </div>
            </div>

            <div className={styles.contactBox}>
              <p>نیاز به سفارشی‌سازی دارید؟</p>
              <Link href="/contact" className={styles.contactLink}>
                تماس با ما
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <footer className={styles.footer}>© 2025 Pida Marketing</footer>
    </div>
  );
}
