import React, { ReactNode } from "react";

import { Eye, ShoppingCart } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/providers/CartProvider";

import { Template } from "@/types/templates";

import { Button } from "../button/button";

import styles from "./template-card.module.css";

type TemplateCardProps = {
  template: Template;
};

function TemplateCard({ template }: TemplateCardProps): ReactNode {
  const { addItem } = useCart();
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={template.image || "/placeholder.svg"}
          alt={template.title}
          width={500}
          height={500}
          className={styles.image}
        />

        {template.sellCount > 20 && <span className={styles.badge}>ویژه</span>}

        <div className={styles.overlay}>
          <Button variant="light" size="card">
            پیش‌نمایش
          </Button>
          <Button
            variant="primary"
            size="card"
            onClick={() => addItem(template)}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{template.title}</h3>
            <p className={styles.description}>{template.description}</p>
          </div>
        </div>

        <div className={styles.tags}>
          {/* {template.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.label}
            </span>
          ))} */}
        </div>

        <div className={styles.footer}>
          <Link href={`/template/${template.slug}`}>
            <Button variant="outline" size="card">
              {" "}
              مشاهده جزئیات
            </Button>
          </Link>
          <div className={styles.priceBox}>
            <span className={styles.price}>
              {template.price.toLocaleString("fa-IR")}
            </span>
            <span className={styles.currency}>تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
