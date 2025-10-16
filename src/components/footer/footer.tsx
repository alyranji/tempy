import { ReactNode } from "react";

import { Facebook, Instagram } from "iconsax-reactjs";
import Link from "next/link";

import styles from "./footer.module.css";

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* بخش 1 */}
          <div className={styles.column}>
            <h3 className={styles.logo}>قالب مارکت</h3>
            <p className={styles.description}>
              بهترین قالب‌های آماده وبسایت برای کسب‌وکارهای مختلف. راه‌اندازی
              سریع و حرفه‌ای وبسایت شما
            </p>
            <div className={styles.socials}>
              <Link href="#" className={styles.socialBtn}>
                <Instagram variant="Bold" className={styles.icon} />
              </Link>

              <Link href="#" className={styles.socialBtn}>
                <Facebook variant="Bold" className={styles.icon} />
              </Link>
            </div>
          </div>

          {/* بخش 2 */}
          <div className={styles.column}>
            <h4 className={styles.heading}>دسترسی سریع</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/login" className={styles.link}>
                  ورود / ثبت‌نام
                </Link>
              </li>
            </ul>
          </div>

          {/* بخش 3 */}
          <div className={styles.column}>
            <h4 className={styles.heading}>دسته‌بندی‌ها</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/category/ecommerce" className={styles.link}>
                  فروشگاهی
                </Link>
              </li>
              <li>
                <Link href="/category/real-estate" className={styles.link}>
                  املاک
                </Link>
              </li>
              <li>
                <Link href="/category/cafe" className={styles.link}>
                  کافه و رستوران
                </Link>
              </li>
              <li>
                <Link href="/category/portfolio" className={styles.link}>
                  نمونه کار
                </Link>
              </li>
            </ul>
          </div>

          {/* بخش 4 */}
          <div className={styles.column}>
            <h4 className={styles.heading}>پشتیبانی</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/faq" className={styles.link}>
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.link}>
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/refund" className={styles.link}>
                  بازگشت وجه
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© ۱۴۰۳ تم پی. تمامی حقوق محفوظ است.</p>
          <p>ساخته شده با ❤️ برای کسب‌وکارهای ایرانی</p>
        </div>
      </div>
    </footer>
  );
}
