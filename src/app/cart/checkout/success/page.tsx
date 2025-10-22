import { ReactNode } from "react";

import { ArrowDown, Home, Message, TickCircle } from "iconsax-reactjs";
import Link from "next/link";

import { templates } from "@/types/templates";

import styles from "./page.module.css";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { template?: string };
}): ReactNode {
  const template = templates.find((t) => t.id === searchParams.template);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <TickCircle size={48} className={styles.iconSuccess} />
            </div>

            <div className={styles.titleSection}>
              <h1>پرداخت موفق!</h1>
              <p>خرید شما با موفقیت انجام شد. از اعتماد شما سپاسگزاریم.</p>
            </div>

            {template && (
              <div className={styles.templateBox}>
                <h2>قالب خریداری شده:</h2>
                <p className={styles.templateTitle}>{template.title}</p>
                <p className={styles.orderCode}>
                  کد سفارش: #
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
            )}

            <div className={styles.statusList}>
              <div className={styles.statusItem}>
                <span>لینک دانلود به ایمیل شما ارسال شد</span>
                <Message size={20} className={styles.iconPrimary} />
              </div>
              <div className={styles.statusItem}>
                <span>فایل‌ها آماده دانلود هستند</span>
                <ArrowDown size={20} className={styles.iconPrimary} />
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="#" className={`${styles.btn} ${styles.btnPrimary}`}>
                <ArrowDown size={20} />
                <span>دانلود فایل‌ها</span>
              </Link>
              <Link href="/" className={`${styles.btn} ${styles.btnOutline}`}>
                <Home size={20} />
                <span>بازگشت به خانه</span>
              </Link>
            </div>

            <div className={styles.supportBox}>
              <p className={styles.supportTitle}>نیاز به کمک دارید؟</p>
              <p className={styles.supportText}>
                تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست
              </p>
              <Link href="/contact" className={styles.link}>
                تماس با پشتیبانی
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
