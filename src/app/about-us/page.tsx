import { ReactNode } from "react";

import styles from "./aboutUs.module.css";

export default function AboutPage(): ReactNode {
  const features = [
    "قالب‌های کاملا فارسی و راست‌چین",
    "پشتیبانی ۶ ماهه رایگان",
    "آپدیت‌های مادام‌العمر",
    "مستندات کامل فارسی",
    "کدهای تمیز و استاندارد",
    "بهینه‌سازی شده برای SEO",
    "طراحی ریسپانسیو",
    "ضمانت بازگشت وجه",
  ];

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>درباره ما</h1>
          <p className={styles.heroSubtitle}>
            ارائه‌دهنده قالب‌های حرفه‌ای و آماده برای کسب‌وکارهای ایرانی
          </p>
        </div>
      </section>
      <div className={styles.contentContainer}>
        <div className={styles.contentInner}>
          {/* Mission Section */}
          <div className={`${styles.card} ${styles.missionSection}`}>
            <h2 className={styles.missionTitle}>ماموریت ما</h2>
            <p className={styles.missionText}>
              قالب مارکت با هدف ارائه بهترین و حرفه‌ای‌ترین قالب‌های وبسایت به
              زبان فارسی و با پشتیبانی کامل از راست‌چین راه‌اندازی شده است. ما
              معتقدیم که هر کسب‌وکاری باید بتواند با کمترین هزینه و زمان، یک
              وبسایت حرفه‌ای داشته باشد.
            </p>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statsItem}>
              <div className={styles.statValue}>۵۰۰+</div>
              <p className={styles.statLabel}>قالب آماده</p>
            </div>
            <div className={styles.statsItem}>
              <div className={styles.statValue}>۱۰,۰۰۰+</div>
              <p className={styles.statLabel}>مشتری راضی</p>
            </div>
            <div className={styles.statsItem}>
              <div className={styles.statValue}>۲۴/۷</div>
              <p className={styles.statLabel}>پشتیبانی</p>
            </div>
          </div>

          {/* Features Section */}
          <div className={`${styles.card} ${styles.featuresSection}`}>
            <h2 className={styles.featuresTitle}>چرا قالب مارکت؟</h2>
            <div className={styles.featuresGrid}>
              {features.map((item) => (
                <div key={item} className={styles.featureItem}>
                  <span>{item}</span>
                  <div className={styles.checkIconWrapper}>
                    {/* <Check className={styles.checkIcon} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.checkIcon}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
