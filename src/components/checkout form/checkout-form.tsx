"use client";

import { ReactNode, useState } from "react";

import { Building4, Card, Wallet } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

import { CartItem } from "@/context/cart-context";

import type { Template } from "@/types/templates";

import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  template: Template;
}

export function CheckoutForm({ template }: CheckoutFormProps): ReactNode {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "wallet" | "bank"
  >("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push(`/checkout/success?template=${template.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* بخش اطلاعات خریدار */}
      <div className={styles.card}>
        <h2>اطلاعات خریدار</h2>

        <div className={styles.gridTwo}>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName">نام خانوادگی *</label>
            <input id="lastName" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">نام *</label>
            <input id="firstName" required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">ایمیل *</label>
          <input
            id="email"
            type="email"
            required
            placeholder="example@email.com"
          />
          <p className={styles.note}>لینک دانلود به این ایمیل ارسال می‌شود</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">شماره تماس *</label>
          <input id="phone" type="tel" required placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
        </div>
      </div>

      {/* روش پرداخت */}
      <div className={styles.card}>
        <h2>روش پرداخت</h2>

        <div className={styles.paymentGrid}>
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`${styles.paymentBtn} ${paymentMethod === "card" ? styles.active : ""}`}
          >
            <Card size={32} />
            <span>کارت بانکی</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("wallet")}
            className={`${styles.paymentBtn} ${paymentMethod === "wallet" ? styles.active : ""}`}
          >
            <Wallet size={32} />
            <span>کیف پول</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={`${styles.paymentBtn} ${paymentMethod === "bank" ? styles.active : ""}`}
          >
            <Building4 size={32} />
            <span>درگاه بانکی</span>
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className={styles.paymentDetails}>
            <div className={styles.inputGroup}>
              <label htmlFor="cardNumber">شماره کارت *</label>
              <input
                id="cardNumber"
                placeholder="۱۲۳۴-۱۲۳۴-۱۲۳۴-۱۲۳۴"
                required
                maxLength={19}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.inputGroup}>
                <label htmlFor="cvv">CVV2 *</label>
                <input id="cvv" placeholder="۱۲۳" required maxLength={4} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="expiry">تاریخ انقضا *</label>
                <input id="expiry" placeholder="۰۲/۲۸" required maxLength={5} />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "wallet" && (
          <p className={styles.note}>
            پس از کلیک روی دکمه پرداخت، به صفحه کیف پول الکترونیکی هدایت
            می‌شوید.
          </p>
        )}

        {paymentMethod === "bank" && (
          <p className={styles.note}>
            پس از کلیک روی دکمه پرداخت، به درگاه بانکی امن هدایت می‌شوید.
          </p>
        )}
      </div>

      {/* قوانین */}
      <div className={styles.card}>
        <div className={styles.checkboxRow}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            قوانین و مقررات را مطالعه کرده و می‌پذیرم
          </label>
        </div>

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">
            مایل به دریافت اخبار و تخفیف‌های ویژه هستم
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className={styles.submitBtn}
      >
        {isProcessing
          ? "در حال پردازش..."
          : `پرداخت ${template.price.toLocaleString("fa-IR")} تومان`}
      </button>

      <p className={styles.bottomNote}>
        پرداخت شما از طریق درگاه امن بانکی انجام می‌شود
      </p>
    </form>
  );
}
