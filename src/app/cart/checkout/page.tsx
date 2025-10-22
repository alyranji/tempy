"use client";

import type React from "react";
import { ReactNode, useState } from "react";

import Link from "next/link";

import { useCart } from "@/providers/CartProvider";

import styles from "./Checkout.module.css";

type PaymentMethod = "card" | "bank";

export default function CheckoutPage(): ReactNode {
  const { items, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [formData, setFormData] = useState({
    fullName: "علی احمدی",
    email: "ali@example.com",
    phone: "09123456789",
    address: "خیابان ولیعصر، کوچه دوم، پلاک ۱۰",
    city: "تهران",
    postalCode: "1234567890",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی الزامی است";
    }
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تماس الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "شماره تماس معتبر نیست";
    }
    if (!formData.address.trim()) {
      newErrors.address = "آدرس الزامی است";
    }
    if (!formData.city.trim()) {
      newErrors.city = "شهر الزامی است";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "کد پستی الزامی است";
    } else if (!/^\d{10}$/.test(formData.postalCode.replace(/\s/g, ""))) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true); // Simulate payment processing

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Clear cart and redirect to success page

    console.log("Purchase Complete. Redirecting...");
    setIsProcessing(false); // برای جلوگیری از ریدایرکت واقعی
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value })); // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }; // Empty Cart Handling

  if (!items || items.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        {/* <Header /> */}
        <main className={`${styles.mainContent} ${styles.emptyMainContent}`}>
          <div className={styles.emptyStateContainer}>
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
                برای تکمیل خرید، ابتدا محصولی به سبد خرید اضافه کنید
              </p>
              {/* <Button asChild size="lg"> */}
              <Link
                href="/"
                className={`${styles.actionButton} ${styles.primaryButton} ${styles.largeButton}`}
              >
                مشاهده محصولات
              </Link>
              {/* </Button> */}
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }

  const taxAmount = Math.round(totalPrice * 0.09); // 9% tax
  const finalTotal = totalPrice + taxAmount;

  return (
    <div className={styles.pageWrapper}>
      {/* <Header /> */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Header */}
            <div className={styles.checkoutHeader}>
              <h1 className={styles.title}>تکمیل خرید</h1>

              <p className={styles.subtitle}>
                اطلاعات خود را وارد کنید و خرید را نهایی کنید
              </p>
            </div>

            <div className={styles.checkoutLayout}>
              {/* Checkout Form */}
              <div className={styles.formSection}>
                {/* Customer Information */}

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconCircle}>
                      {/* <User className={styles.iconSm} /> */}

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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    <h2 className={styles.cardTitle}>اطلاعات خریدار</h2>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        {/* <Label htmlFor="fullName" className={styles.label}> */}

                        <label htmlFor="fullName" className={styles.label}>
                          نام و نام خانوادگی *
                        </label>
                        {/* <Input ... /> */}

                        <input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          placeholder="نام کامل خود را وارد کنید"
                          className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                        />

                        {errors.fullName && (
                          <p className={styles.errorMessage}>
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        {/* <Label htmlFor="email" className={styles.label}> */}

                        <label htmlFor="email" className={styles.label}>
                          ایمیل *
                        </label>

                        {/* <Input type="email" ... /> */}

                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="example@email.com"
                          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        />

                        {errors.email && (
                          <p className={styles.errorMessage}>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        {/* <Label htmlFor="phone" className={styles.label}> */}

                        <label htmlFor="phone" className={styles.label}>
                          شماره تماس *
                        </label>
                        {/* <Input ... /> */}

                        <input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                        />

                        {errors.phone && (
                          <p className={styles.errorMessage}>{errors.phone}</p>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        {/* <Label htmlFor="city" className={styles.label}> */}

                        <label htmlFor="city" className={styles.label}>
                          شهر *
                        </label>
                        {/* <Input ... /> */}

                        <input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="نام شهر"
                          className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                        />

                        {errors.city && (
                          <p className={styles.errorMessage}>{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      {/* <Label htmlFor="address" className={styles.label}> */}

                      <label htmlFor="address" className={styles.label}>
                        آدرس کامل *
                      </label>
                      {/* <Textarea ... /> */}

                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="آدرس دقیق خود را وارد کنید"
                        rows={3}
                        className={`${styles.textarea} ${errors.address ? styles.inputError : ""}`}
                      />

                      {errors.address && (
                        <p className={styles.errorMessage}>{errors.address}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      {/* <Label htmlFor="postalCode" className={styles.label}> */}

                      <label htmlFor="postalCode" className={styles.label}>
                        کد پستی *
                      </label>
                      {/* <Input ... /> */}

                      <input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        placeholder="۱۲۳۴۵۶۷۸۹۰"
                        className={`${styles.input} ${errors.postalCode ? styles.inputError : ""}`}
                      />

                      {errors.postalCode && (
                        <p className={styles.errorMessage}>
                          {errors.postalCode}
                        </p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      {/* <Label htmlFor="notes" className={styles.label}> */}

                      <label htmlFor="notes" className={styles.label}>
                        توضیحات (اختیاری)
                      </label>
                      {/* <Textarea ... /> */}

                      <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
                        placeholder="توضیحات اضافی در مورد سفارش"
                        rows={3}
                        className={styles.textarea}
                      />
                    </div>
                  </form>
                </div>
                {/* Payment Method */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconCircle}>
                      {/* <CreditCard className={styles.iconSm} /> */}

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
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>

                    <h2 className={styles.cardTitle}>روش پرداخت</h2>
                  </div>

                  <div className={styles.paymentMethodGrid}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`${styles.paymentOption} ${
                        paymentMethod === "card"
                          ? styles.paymentSelected
                          : styles.paymentDefault
                      }`}
                    >
                      {/* <CreditCard className={styles.iconLg} /> */}

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
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>

                      <div className={styles.optionTitle}>کارت بانکی</div>

                      <div className={styles.optionSubtitle}>پرداخت آنلاین</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`${styles.paymentOption} ${
                        paymentMethod === "wallet"
                          ? styles.paymentSelected
                          : styles.paymentDefault
                      }`}
                    >
                      {/* <Wallet className={styles.iconLg} /> */}

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
                        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M18 12h-3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3v-6z" />
                      </svg>

                      <div className={styles.optionTitle}>کیف پول</div>

                      <div className={styles.optionSubtitle}>پرداخت سریع</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`${styles.paymentOption} ${
                        paymentMethod === "bank"
                          ? styles.paymentSelected
                          : styles.paymentDefault
                      }`}
                    >
                      {/* <Building2 className={styles.iconLg} /> */}

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
                        <rect width="16" height="16" x="4" y="2" rx="2" />
                        <path d="M9 22v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M4 8h16M12 2v10M9 14h6" />
                      </svg>

                      <div className={styles.optionTitle}>واریز بانکی</div>

                      <div className={styles.optionSubtitle}>انتقال وجه</div>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className={styles.paymentInfoBox}>
                      <p className={styles.paymentInfoText}>
                        پس از کلیک بر روی دکمه پرداخت، به درگاه پرداخت امن منتقل
                        خواهید شد.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Order Summary */}
              <div className={styles.summaryColumn}>
                <div className={styles.orderSummary}>
                  <h2 className={styles.summaryTitle}>خلاصه سفارش</h2>
                  {/* Cart Items */}
                  <div className={styles.summaryItemsList}>
                    {items.map((item) => (
                      <div key={item.id} className={styles.summaryItem}>
                        <div className={styles.itemImageWrapper}>
                          {/* <Image ... /> */}

                          <div className={styles.imagePlaceholder}></div>
                        </div>

                        <div className={styles.itemInfoSummary}>
                          <h3 className={styles.itemTitleSummary}>
                            {item.title}
                          </h3>

                          <div className={styles.itemPriceDetail}>
                            <span className={styles.quantityText}>
                              تعداد:
                              {item.quantity.toLocaleString("fa-IR")}
                            </span>

                            <span className={styles.itemPriceSummary}>
                              {(item.price * item.quantity).toLocaleString(
                                "fa-IR",
                              )}
                              تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Price Details */}
                  <div className={styles.priceDetails}>
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>جمع محصولات</span>

                      <span className={styles.priceValue}>
                        {totalPrice.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>مالیات (۹٪)</span>

                      <span className={styles.priceValue}>
                        {taxAmount.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>هزینه ارسال</span>

                      <span className={styles.freeShipping}>رایگان</span>
                    </div>
                  </div>
                  {/* Final Total */}
                  <div className={styles.finalTotalSection}>
                    <div className={styles.priceRow}>
                      <span className={styles.finalTotalLabel}>
                        مبلغ قابل پرداخت
                      </span>

                      <div className={styles.finalTotalAmount}>
                        <div className={styles.finalPrice}>
                          {finalTotal.toLocaleString("fa-IR")}
                        </div>

                        <div className={styles.finalCurrency}>تومان</div>
                      </div>
                    </div>
                  </div>
                  {/* Pay Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`${styles.actionButton} ${styles.primaryButton} ${styles.fullWidth} ${styles.largeButton}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className={styles.spinner} />
                        در حال پردازش...
                      </>
                    ) : (
                      <>
                        {/* <CheckCircle2 className={styles.iconSm} /> */}
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
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <path d="m9 11 3 3L22 4" />
                        </svg>
                        پرداخت و تکمیل خرید
                      </>
                    )}
                  </button>

                  <div className={styles.securePaymentInfo}>
                    {/* <CheckCircle2 className={styles.iconXs} /> */}

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
                      className={styles.greenIcon}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>پرداخت امن و محافظت شده</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
