"use client";

import { ReactNode } from "react";

import { ShoppingBag } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/providers/CartProvider";

import styles from "./CartDrawer.module.css";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): ReactNode {
  const { items, totalItems, totalPrice, removeItem } = useCart();

  return (
    <>
      {open && (
        <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
          <div className={styles.header}>
            <h3>سبد خرید</h3>
            <button onClick={onClose} className={styles.closeBtn}>
              <ShoppingBag size={18} />
            </button>
          </div>

          <div className={styles.content}>
            {items?.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.iconWrapper}>
                  <ShoppingBag size={40} />
                </div>
                <h4>سبد خرید خالی است</h4>
                <p>هنوز محصولی به سبد خرید اضافه نکرده‌اید</p>
                <Link href="/" className={styles.viewBtn}>
                  مشاهده قالب‌ها
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.items}>
                  {items?.map((item) => (
                    <div key={item.id} className={styles.item}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{item.title}</h4>
                        <p>{item.price.toLocaleString("fa-IR")} تومان</p>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item)}
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <div className={styles.total}>
                    <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
                    <span>جمع کل:</span>
                  </div>

                  <div className={styles.actions}>
                    <Link
                      href="/cart"
                      className={`${styles.btn} ${styles.outline}`}
                    >
                      مشاهده سبد
                    </Link>
                    <Link href="/checkout" className={styles.btn}>
                      تسویه حساب
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
