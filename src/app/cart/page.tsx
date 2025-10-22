"use client";

import { type ReactNode, useState } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { useCart } from "@/providers/CartProvider";

import { Template } from "@/types/templates";

import styles from "./Cart.module.css";

// export function generateStaticParams(): { slug: string }[] {
//   return templates.map((template) => ({
//     slug: template.slug,
//   }));
// }

export default function Cart(): ReactNode {
  const {
    items,
    clearCart,
    removeItem,
    totalItems,
    totalPrice,
    updateQuantity,
    addItem,
  } = useCart();

  return (
    <div className={styles.pageWrapper}>
      {/* <Header /> */} {/* کامپوننت Header باید در جای خودش ایمپورت شود */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                {/* <ShoppingCart className={styles.headerIcon} /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 12.64a2 2 0 0 0 2 1.36h9.32a2 2 0 0 0 2-1.36L23 6H6" />
                </svg>{" "}
                {/* ShoppingCart Icon */}
                <div className={styles.headerText}>
                  <h1 className={styles.title}>سبد خرید</h1>
                  <p className={styles.subtitle}>
                    {totalItems > 0
                      ? `${totalItems.toLocaleString("fa-IR")} محصول`
                      : "سبد خرید خالی است"}
                  </p>
                </div>
              </div>
              {items && items.length > 0 && (
                <button onClick={clearCart} className={styles.clearCartButton}>
                  {/* <Trash2 className={styles.clearCartIcon} /> */}
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
                  خالی کردن سبد
                </button>
              )}
            </div>

            {!items || items.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconWrapper}>
                  {/* <ShoppingCart className={styles.emptyIcon} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 12.64a2 2 0 0 0 2 1.36h9.32a2 2 0 0 0 2-1.36L23 6H6" />
                  </svg>
                </div>
                <h2 className={styles.emptyTitle}>سبد خرید شما خالی است</h2>
                <p className={styles.emptySubtitle}>
                  محصولی به سبد خرید اضافه نشده است
                </p>
                {/* <Button asChild size="lg"> */}
                <Link
                  href="/"
                  className={`${styles.actionButton} ${styles.primaryButton} ${styles.largeButton}`}
                >
                  {/* <ArrowLeft className={styles.iconSm} /> */}
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
                  </svg>
                  مشاهده محصولات
                </Link>
                {/* </Button> */}
              </div>
            ) : (
              <div className={styles.cartLayout}>
                {/* Cart Items */}
                <div className={styles.cartItems}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemContent}>
                        {/* Product Image */}
                        <div className={styles.itemImage}>
                          {/* <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className={styles.imageObjectCover} /> */}
                          <div className={styles.imagePlaceholder}>تصویر</div>
                        </div>

                        {/* Product Info */}
                        <div className={styles.itemInfo}>
                          <div className={styles.itemText}>
                            <a
                              href={`/template/${item.id}`}
                              className={styles.itemLink}
                            >
                              <h3 className={styles.itemTitle}>{item.title}</h3>
                            </a>
                            <p className={styles.itemDescription}>
                              {item.description}
                            </p>
                          </div>

                          <div className={styles.itemControls}>
                            {/* Quantity Controls */}
                            <div className={styles.quantityControls}>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className={styles.quantityButton}
                                aria-label="افزایش تعداد"
                              >
                                {/* <Plus className={styles.iconXs} /> */}
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
                              <span className={styles.quantityDisplay}>
                                {item.quantity.toLocaleString("fa-IR")}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className={styles.quantityButton}
                                aria-label="کاهش تعداد"
                              >
                                {/* <Minus className={styles.iconXs} /> */}
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
                            <div className={styles.itemPriceWrapper}>
                              <div className={styles.itemPrice}>
                                {(item.price * item.quantity).toLocaleString(
                                  "fa-IR",
                                )}
                              </div>
                              <div className={styles.itemCurrency}>تومان</div>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item)}
                          className={styles.removeButton}
                          aria-label="حذف از سبد"
                        >
                          {/* <Trash2 className={styles.iconSm} /> */}
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
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>{" "}
                          {/* Trash2 Icon */}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className={styles.summaryWrapper}>
                  <div className={styles.orderSummary}>
                    <h2 className={styles.summaryTitle}>خلاصه سفارش</h2>

                    <div className={styles.summaryDetails}>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>
                          تعداد محصولات
                        </span>
                        <span className={styles.summaryValue}>
                          {totalItems.toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>جمع کل</span>
                        <span className={styles.summaryValue}>
                          {totalPrice.toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                    </div>

                    <div className={styles.finalTotal}>
                      <div className={styles.summaryRow}>
                        <span className={styles.finalTotalLabel}>
                          مبلغ قابل پرداخت
                        </span>
                        <div className={styles.finalTotalAmount}>
                          <div className={styles.finalPrice}>
                            {totalPrice.toLocaleString("fa-IR")}
                          </div>
                          <div className={styles.finalCurrency}>تومان</div>
                        </div>
                      </div>
                    </div>

                    {/* <Button asChild size="lg" className="w-full"> */}
                    <Link
                      href="/cart/checkout"
                      className={`${styles.actionButton} ${styles.primaryButton} ${styles.fullWidth} ${styles.largeButton}`}
                    >
                      {/* <ArrowLeft className={styles.iconSm} /> */}
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
                      </svg>
                      تکمیل خرید
                    </Link>
                    {/* </Button> */}

                    {/* <Button asChild variant="outline" size="lg" className="w-full mt-3 bg-transparent"> */}
                    <Link
                      href="/"
                      className={`${styles.actionButton} ${styles.outlineButton} ${styles.fullWidth} ${styles.marginTop3}`}
                    >
                      بازگشت
                    </Link>
                    {/* </Button> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
