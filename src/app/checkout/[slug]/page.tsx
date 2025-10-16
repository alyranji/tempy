"use client";

import { type ReactNode, use, useEffect, useState } from "react";

import { TickSquare } from "iconsax-reactjs";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CheckoutForm } from "@/components/checkout form/checkout-form";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import styles from "./CheckoutPage.module.css";

interface CheckoutPageProps {
  params: {
    slug: string;
  };
}

// export function generateStaticParams(): { slug: string }[] {
//   return templates.map((template) => ({
//     slug: template.slug,
//   }));
// }

export default function CheckoutPage({ params }: CheckoutPageProps): ReactNode {
  const [templates, setTemplates] = useState<Template[]>();
  const { slug } = use(params);
  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      const data = await filterTemplates();
      setTemplates(data);
    }
    fetchTemplates();
  }, []);
  if (!templates) return;
  const template = templates.find((template) => template.slug === slug);
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>تکمیل خرید</h1>

          <div className={styles.grid}>
            <div className={styles.left}>
              <CheckoutForm template={template!} />
            </div>

            <div className={styles.right}>
              <div className={styles.sticky}>
                {/* خلاصه سفارش */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>خلاصه سفارش</h2>

                  <div className={styles.templateInfo}>
                    <div className={styles.templateText}>
                      <h3>{template?.title}</h3>
                      <p>{template?.description}</p>
                      {/* {template.sellCount > 20 && (
                        <Badge className={styles.badge}>محبوب</Badge>
                      )} */}
                    </div>
                    <div className={styles.templateImage}>
                      <Image
                        src={template?.image || "/placeholder.svg"}
                        alt={template!.title}
                        fill
                        className={styles.image}
                      />
                    </div>
                  </div>

                  <div className={styles.priceDetails}>
                    <div>
                      <span>
                        {template?.price.toLocaleString("fa-IR")} تومان
                      </span>
                      <span>قیمت قالب</span>
                    </div>
                    <div>
                      <span className={styles.green}>رایگان</span>
                      <span>پشتیبانی ۶ ماهه</span>
                    </div>
                    <div>
                      <span className={styles.green}>رایگان</span>
                      <span>آپدیت‌های رایگان</span>
                    </div>
                  </div>

                  <div className={styles.total}>
                    <span className={styles.totalPrice}>
                      {template?.price.toLocaleString("fa-IR")} تومان
                    </span>
                    <span>مجموع</span>
                  </div>
                </div>

                {/* شامل موارد */}
                <div className={styles.includes}>
                  <h3>شامل این موارد:</h3>
                  <ul>
                    {[
                      "دانلود فوری پس از پرداخت",
                      "مستندات نصب فارسی",
                      "فایل‌های سورس کامل",
                      "پشتیبانی ۶ ماهه",
                      "آپدیت‌های رایگان",
                    ].map((text, i) => (
                      <li key={i}>
                        <span>{text}</span>
                        <div className={styles.check}>
                          <TickSquare className={styles.checkIcon} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ضمانت بازگشت وجه */}
                <div className={styles.guarantee}>
                  <p>ضمانت بازگشت وجه تا ۳۰ روز</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
