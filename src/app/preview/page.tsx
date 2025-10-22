import styles from "./Preview.module.css";

// ****************************
// تعریف داخلی تمام آیکون‌ها و کامپوننت‌های UI (برای خودبسندگی)
// ****************************

// SVG Icons
const XIcon = (props) => (
  <svg
    {...props}
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const SmartphoneIcon = (props) => (
  <svg
    {...props}
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
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
const TabletIcon = (props) => (
  <svg
    {...props}
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
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <line x1="12" x2="12" y1="18" y2="18" />
  </svg>
);
const MonitorIcon = (props) => (
  <svg
    {...props}
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
    <rect width="20" height="15" x="2" y="3" rx="2" />
    <path d="M12 17v4" />
    <path d="M10 21h4" />
  </svg>
);
const LargeMonitorIcon = (props) => (
  <svg
    {...props}
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
    <rect width="20" height="15" x="2" y="3" rx="2" />
    <path d="M12 17v4" />
    <path d="M10 21h4" />
  </svg>
);

// شبیه‌سازی Props (Template Object)
const mockTemplate = {
  id: "123",
  title: "قالب فروشگاهی شیک",
  demoUrl: "https://example.com/demo-url",
};

// شبیه‌سازی کامپوننت اصلی
export default function PreviewPage({ template = mockTemplate }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.navbarWrapper}>
        <div className={styles.container}>
          <div className={styles.navbarContent}>
            {/* بخش دکمه‌ها (چپ) */}
            <div className={styles.buttonGroupLeft}>
              {/* دکمه خرید قالب */}
              <a
                href={`/checkout/${template.id}`}
                className={`${styles.button} ${styles.primaryButton}`}
              >
                خرید قالب
              </a>
              {/* دکمه بستن */}
              <a
                href={`/template/${template.id}`}
                className={`${styles.button} ${styles.outlineButton}`}
              >
                <XIcon className={styles.iconMl} />
                بستن
              </a>
            </div>
            {/* بخش ریسپانسیو (وسط) */}
            <div className={styles.buttonGroupCenter}>
              <button className={styles.ghostButton}>
                <SmartphoneIcon />
              </button>
              <button className={styles.ghostButton}>
                <TabletIcon />
              </button>
              <button className={styles.ghostButton}>
                <MonitorIcon />
              </button>
            </div>
            {/* بخش عنوان (راست) */}
            <div className={styles.titleGroupRight}>
              <div className={styles.titleText}>
                <h1 className={styles.mainTitle}>{template.title}</h1>
                <p className={styles.subTitle}>پیش‌نمایش زنده</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- محتوای اصلی/دمو --- */}
      <div className={styles.mainContent}>
        <div className={styles.demoCardWrapper}>
          <div className={styles.demoCard}>
            <div className={styles.demoPlaceholder}>
              <div className={styles.placeholderContent}>
                <LargeMonitorIcon className={styles.largeIcon} />
                <div className={styles.placeholderText}>
                  <h2 className={styles.placeholderTitle}>پیش‌نمایش قالب</h2>
                  <p className={styles.placeholderSubtitle}>
                    در نسخه واقعی، اینجا iframe دمو قالب نمایش داده می‌شود
                  </p>
                </div>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  className={`${styles.button} ${styles.primaryButton}`}
                >
                  مشاهده دمو خارجی
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
