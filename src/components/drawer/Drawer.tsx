"use client";

import { PropsWithChildren, ReactNode, useState } from "react";

import clsx from "clsx";

import { CloseSquare, ShoppingBag, ShoppingCart } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/providers/CartProvider";

import { Button } from "../button/button";

import styles from "./Drawer.module.css";

type DrawerProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ isOpen, onClose }: DrawerProps): ReactNode {
  const {
    items,
    addItem,
    clearCart,
    removeItem,
    totalItems,
    totalPrice,
    updateQuantity,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles["backdrop-open"] : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${isOpen ? styles["drawer-open"] : ""}`}
      >
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles["header-info"]}>
              <div className={styles["cart-icon-wrapper"]}>
                <ShoppingCart size={32} color="#6c757d" variant="Bold" />
                {totalItems > 0 && (
                  <span className={styles["cart-badge"]}>
                    {totalItems > 9 ? "۹+" : totalItems.toLocaleString("fa-IR")}
                  </span>
                )}
              </div>
              <div className={styles["header-text"]}>
                <h2 className={styles.title}>سبد خرید</h2>
                <p className={styles.subtitle}>
                  {totalItems > 0
                    ? `${totalItems.toLocaleString("fa-IR")} محصول`
                    : "سبد خرید خالی است"}
                </p>
              </div>
            </div>

            <Button
              onClick={onClose}
              className={styles["close-button"]}
              aria-label="بستن سبد خرید"
              icon={<CloseSquare size="32" color="#6c757d" />}
            ></Button>
          </div>

          {/* Cart Items / Empty State */}
          <div className={styles["items-area"]}>
            {!items || items.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon-wrapper"]}>
                  <ShoppingCart className={styles["empty-icon"]} />
                </div>
                <div>
                  <h3 className={styles["empty-title"]}>
                    سبد خرید شما خالی است
                  </h3>
                  <p className={styles["empty-subtitle"]}>
                    محصولی به سبد خرید اضافه نشده است
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className={styles["empty-action-button"]}
                >
                  مشاهده محصولات
                </button>
              </div>
            ) : (
              <div className={styles["items-list"]}>
                {items.map((item) => (
                  <div key={item.id} className={styles["cart-item"]}>
                    <div className={styles["item-content"]}>
                      {/* Product Image */}
                      <div className={styles["item-image"]}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className={styles["image-object-cover"]}
                        />
                      </div>

                      {/* Product Info */}
                      <div className={styles["item-info"]}>
                        <div className={styles["item-text"]}>
                          <h3 className={styles["item-title"]}>{item.title}</h3>
                          <p className={styles["item-description"]}>
                            {item.description}
                          </p>
                        </div>

                        <div className={styles["item-controls"]}>
                          {/* Quantity Controls */}
                          <div className={styles["quantity-controls"]}>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className={styles["quantity-button"]}
                              aria-label="افزایش تعداد"
                            >
                              {/* <Plus className={styles['icon-xs']} /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 5v14M5 12h14" />
                              </svg>{" "}
                              {/* Plus Icon */}
                            </button>
                            <span className={styles["quantity-display"]}>
                              {item.quantity.toLocaleString("fa-IR")}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className={styles["quantity-button"]}
                              aria-label="کاهش تعداد"
                            >
                              {/* <Minus className={styles['icon-xs']} /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                              </svg>{" "}
                              {/* Minus Icon */}
                            </button>
                          </div>

                          {/* Price */}
                          <div className={styles["item-price-wrapper"]}>
                            <div className={styles["item-price"]}>
                              {(item.price * item.quantity).toLocaleString(
                                "fa-IR",
                              )}
                            </div>
                            <div className={styles["item-currency"]}>تومان</div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item)}
                        className={styles["remove-button"]}
                        aria-label="حذف از سبد"
                      >
                        {/* <Trash2 className={styles['icon-xs']} /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>{" "}
                        {/* Trash2 Icon */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items && items.length > 0 && (
            <div className={styles.footer}>
              {/* Total Price */}
              <div className={styles["total-price-row"]}>
                <div className={styles["total-details"]}>
                  <div className={styles["total-label"]}>مجموع</div>
                  <div className={styles["total-items"]}>
                    {totalItems.toLocaleString("fa-IR")} محصول
                  </div>
                </div>

                <div className={styles["total-price-amount"]}>
                  <div className={styles["total-price"]}>
                    {totalPrice.toLocaleString("fa-IR")}
                  </div>
                  <div className={styles["total-currency"]}>تومان</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles["action-buttons"]}>
                {/* از کامپوننت Link استفاده نشده، اما کلاس استایل دهی اعمال شده است */}
                <a
                  href="/cart/checkout"
                  onClick={onClose}
                  className={styles["checkout-button"]}
                >
                  {/* <ArrowLeft className={styles['icon-sm']} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>{" "}
                  {/* ArrowLeft Icon */}
                  تکمیل خرید
                </a>
                <a
                  href="/cart"
                  onClick={onClose}
                  className={styles["view-cart-button"]}
                >
                  مشاهده سبد خرید
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
