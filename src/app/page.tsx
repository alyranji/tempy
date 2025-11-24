import Link from "next/link";

import PopularTemplates from "@/components/popular templates/PopularTemplates";
import CardSlider from "@/components/template slider/card-slider";
import TemplateFilterLayout from "@/components/template-filter-layout/TemplateFilterLayout";

import styles from "./HomePage.module.css";

// ************************************
// شبیه سازی داده ها و کامپوننت ها (MOCK DATA & COMPONENTS)
// ************************************

// شبیه سازی آیکون ها (SVG Icons)
const Icon = ({ name, className }) => {
  // این یک شبیه سازی ساده برای نمایش است
  const icons = {
    Search: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    CheckCircle: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M9 11l3 3L22 4" />
      </svg>
    ),
    Zap: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    Shield: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Download: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    Star: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    TrendingUp: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    Users: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
    Award: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 15a4 4 0 0 0 4-4 4 4 0 0 0-8 0 4 4 0 0 0 4 4z" />
        <path d="M12 18v2" />
      </svg>
    ),
    ArrowLeft: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    ChevronDown: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// شبیه سازی داده های قالب
const templates = [
  { id: 1, title: "قالب فروشگاهی مدرن", featured: true, category: "ecommerce" },
  {
    id: 2,
    title: "قالب املاک حرفه‌ای",
    featured: true,
    category: "real-estate",
  },
  { id: 3, title: "قالب رزومه شخصی", featured: true, category: "portfolio" },
  { id: 4, title: "قالب کافه و رستوران", featured: false, category: "cafe" },
  { id: 5, title: "قالب بلاگ خبری", featured: false, category: "blog" },
  { id: 6, title: "قالب شرکتی", featured: false, category: "corporate" },
  { id: 7, title: "قالب گالری هنر", featured: false, category: "art" },
  { id: 8, title: "قالب آموزشی", featured: false, category: "education" },
  { id: 9, title: "قالب ورزشی", featured: false, category: "sport" },
  { id: 10, title: "قالب موسیقی", featured: false, category: "music" },
];

const categories = [
  { id: 1, name: "همه", slug: "all" },
  { id: 2, name: "فروشگاهی", slug: "ecommerce" },
  { id: 3, name: "املاک", slug: "real-estate" },
  { id: 4, name: "کافه و رستوران", slug: "cafe" },
  { id: 5, name: "نمونه کار", slug: "portfolio" },
  { id: 6, name: "وبلاگ", slug: "blog" },
  { id: 7, name: "شرکتی", slug: "corporate" },
  { id: 8, name: "خدماتی", slug: "service" },
];

// شبیه سازی کامپوننت Header
// const Header = () => (
//   <header className={styles.header}>
//     <div className={styles.container}>
//       <div className={styles.headerContent}>
//         <div className={styles.logo}>Logo</div>
//         <nav className={styles.nav}>
//           <a href="/" className={styles.navLink}>
//             قالب‌ها
//           </a>
//           <a href="/pricing" className={styles.navLink}>
//             قیمت‌گذاری
//           </a>
//           <a href="/contact" className={styles.navLink}>
//             تماس
//           </a>
//         </nav>
//         <div className={styles.authButtons}>
//           <button className={`${styles.button} ${styles.outlineButton}`}>
//             ورود
//           </button>
//           <button className={`${styles.button} ${styles.primaryButton}`}>
//             ثبت نام
//           </button>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// شبیه سازی TemplateCard
const TemplateCard = ({ template }) => (
  <a href={`/template/${template.id}`} className={styles.templateCard}>
    <div className={styles.templateCardImage}>
      {/* Image Placeholder */}
      <div className={styles.imagePlaceholder}>Demo</div>
    </div>
    <div className={styles.templateCardContent}>
      <h3 className={styles.templateCardTitle}>{template.title}</h3>
      <div className={styles.templateCardFooter}>
        <span className={styles.templateCardPrice}>۱۹۹,۰۰۰ تومان</span>
        <span className={styles.templateCardCategory}>
          {categories.find((c) => c.slug === template.category)?.name ||
            "متفرقه"}
        </span>
      </div>
    </div>
  </a>
);

// شبیه سازی TemplateGrid
const TemplateGrid = ({ templates }) => (
  <div className={styles.templateGrid}>
    {templates.map((t) => (
      <TemplateCard key={t.id} template={t} />
    ))}
  </div>
);

// شبیه سازی FilterSidebar
const FilterSidebar = ({ currentCategory }) => (
  <div className={styles.filterSidebar}>
    <h3 className={styles.sidebarTitle}>دسته‌بندی‌ها</h3>
    <ul className={styles.sidebarList}>
      {categories.map((c) => (
        <li key={c.id}>
          <a
            href={`/category/${c.slug}`}
            className={`${styles.sidebarLink} ${c.slug === currentCategory ? styles.activeLink : ""}`}
          >
            {c.name}
            <span className={styles.categoryCount}>
              ({templates.filter((t) => t.category === c.slug).length})
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// ************************************
// کامپوننت اصلی (HomePage)
// ************************************
export default function HomePage() {
  const featuredTemplates = templates.filter((t) => t.featured);
  const newTemplates = templates.slice(0, 3);
  const popularTemplates = templates.slice(3, 6);

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>قالب دلخواه خود را پیدا کنید</h1>

            <p className={styles.heroSubtitle}>
              با قالب‌های آماده و حرفه‌ای، وبسایت خود را در کمترین زمان
              راه‌اندازی کنید
            </p>

            <div className={styles.searchWrapper}>
              <div className={styles.searchInputContainer}>
                <Icon name="Search" className={styles.searchIcon} />

                <input
                  type="search"
                  placeholder="جستجوی قالب... (مثلاً: فروشگاهی، املاک، کافه)"
                  className={styles.searchInput}
                />

                <button
                  className={`${styles.button} ${styles.searchButton} ${styles.primaryButton}`}
                >
                  جستجو
                </button>
              </div>
            </div>

            <div className={styles.popularSearches}>
              <span className={styles.mutedText}>جستجوهای پرطرفدار:</span>

              <a href="/category/ecommerce" className={styles.linkPrimary}>
                فروشگاهی
              </a>
              <span className={styles.mutedText}>•</span>
              <a href="/category/real-estate" className={styles.linkPrimary}>
                املاک
              </a>
              <span className={styles.mutedText}>•</span>
              <a href="/category/cafe" className={styles.linkPrimary}>
                کافه
              </a>
              <span className={styles.mutedText}>•</span>
              <a href="/category/portfolio" className={styles.linkPrimary}>
                نمونه کار
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoryBadges}>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className={styles.badgeLink}
              >
                <span className={styles.categoryBadge}>{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {["Download", "Users", "Star", "Award"].map((iconName, index) => (
              <div key={iconName} className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <Icon name={iconName} className={styles.statIcon} />
                </div>

                <div className={styles.statNumber}>
                  {["۱۲۰۰+", "۸۵۰+", "۴.۹", "۵۰+"][index]}
                </div>

                <div className={styles.statLabel}>
                  {
                    [
                      "دانلود موفق",
                      "مشتری راضی",
                      "امتیاز کاربران",
                      "قالب منحصر به فرد",
                    ][index]
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <section className={styles.sectionPadding}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>قالب‌های ویژه</h2>

              <p className={styles.sectionSubtitle}>
                محبوب‌ترین و پرفروش‌ترین قالب‌های ما را کشف کنید
              </p>
            </div>
            <TemplateGrid templates={featuredTemplates} />
          </div>
        </section>
      )}
      {/* How It Works Section */}
      <section className={`${styles.sectionPadding} ${styles.secondaryBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>چگونه کار می‌کند؟</h2>

            <p className={styles.sectionSubtitle}>
              در سه گام ساده، وبسایت خود را راه‌اندازی کنید
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <div className={styles.stepIconWrapper}>
                <Icon name="Search" className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepTitle}>۱. انتخاب قالب</h3>

              <p className={styles.stepText}>
                از میان صدها قالب حرفه‌ای، قالب مورد نظر خود را انتخاب کنید
              </p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepIconWrapper}>
                <Icon name="Download" className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepTitle}>۲. خرید و دانلود</h3>

              <p className={styles.stepText}>
                پس از خرید، فایل‌های قالب را به صورت فوری دانلود کنید
              </p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepIconWrapper}>
                <Icon name="Zap" className={styles.stepIcon} />
              </div>

              <h3 className={styles.stepTitle}>۳. راه‌اندازی سریع</h3>
              <p className={styles.stepText}>
                با مستندات کامل، وبسایت خود را در کمتر از یک ساعت راه‌اندازی
                کنید
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* New Arrivals */}
      <section className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.headerWithCta}>
            <div className={styles.titleGroup}>
              <h2 className={styles.sectionTitle}>جدیدترین قالب‌ها</h2>
              <p className={styles.sectionSubtitleSm}>
                تازه‌ترین قالب‌های اضافه شده به مجموعه ما
              </p>
            </div>

            <a
              href="/category/all"
              className={`${styles.button} ${styles.outlineButton} ${styles.ctaButton}`}
            >
              مشاهده همه
              <Icon name="ArrowLeft" className={styles.iconSm} />
            </a>
          </div>
          <TemplateGrid templates={newTemplates} />
        </div>
      </section>
      {/* Categories Showcase */}
      <section className={`${styles.sectionPadding} ${styles.secondaryBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>قالب‌ها بر اساس دسته‌بندی</h2>

            <p className={styles.sectionSubtitle}>
              قالب مناسب برای هر نوع کسب‌وکار
            </p>
          </div>

          <div className={styles.categoryShowcaseGrid}>
            {categories.slice(1, 7).map((category) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className={styles.categoryShowcaseItem}
              >
                <div className={styles.categoryShowcaseContent}>
                  <div className={styles.categoryShowcaseText}>
                    <h3 className={styles.categoryShowcaseTitle}>
                      {category.name}
                    </h3>

                    <p className={styles.categoryShowcaseCount}>
                      {
                        templates.filter((t) => t.category === category.slug)
                          .length
                      }
                      قالب
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* All Templates */}

      <div className={styles.allTemplatesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>قالب‌ها بر اساس دسته‌بندی</h2>

          <p className={styles.sectionSubtitle}>
            قالب مناسب برای هر نوع کسب‌وکار
          </p>
        </div>
        <TemplateFilterLayout initialCategory="all" />
      </div>
      {/* Popular Templates */}
      <PopularTemplates />
      {/* Testimonials */}
      <section className={`${styles.sectionPadding} ${styles.secondaryBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>نظرات مشتریان</h2>

            <p className={styles.sectionSubtitle}>
              تجربه مشتریان ما از استفاده از قالب‌های ما
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {[
              {
                name: "علی محمدی",
                job: "صاحب فروشگاه آنلاین",
                initial: "ع.م",
                text: "قالب فروشگاهی که خریدم واقعاً عالی بود. نصب و راه‌اندازی خیلی ساده بود و طراحی آن بسیار حرفه‌ای است.",
              },
              {
                name: "سارا رضایی",
                job: "مدیر آژانس املاک",
                initial: "س.ر",
                text: "پشتیبانی عالی و قالب‌های با کیفیت. برای آژانس املاک من کاملاً مناسب بود و مشتریانم از طراحی آن راضی هستند.",
              },
              {
                name: "رضا کریمی",
                job: "صاحب کافه",
                initial: "ر.ک",
                text: "بهترین سرمایه‌گذاری برای کسب‌وکارم بود. قالب کافه که خریدم باعث افزایش سفارشات آنلاین ما شد.",
              },
            ].map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.starRating}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className={styles.starIcon} />
                  ))}
                </div>

                <p className={styles.testimonialText}>{testimonial.text}</p>

                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    <span className={styles.authorInitial}>
                      {testimonial.initial}
                    </span>
                  </div>

                  <div>
                    <div className={styles.authorName}>{testimonial.name}</div>

                    <div className={styles.authorJob}>{testimonial.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>چرا ما را انتخاب کنید؟</h2>

            <p className={styles.sectionSubtitle}>
              مزایای استفاده از قالب‌های ما
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              {
                icon: "CheckCircle",
                title: "کیفیت بالا",
                text: "تمام قالب‌ها با بالاترین استانداردهای کدنویسی و طراحی ساخته شده‌اند",
              },
              {
                icon: "Zap",
                title: "سرعت بالا",
                text: "قالب‌های بهینه شده برای بهترین عملکرد و سرعت بارگذاری",
              },
              {
                icon: "Shield",
                title: "امنیت",
                text: "کدهای امن و به‌روز با رعایت بهترین شیوه‌های امنیتی",
              },
              {
                icon: "TrendingUp",
                title: "به‌روزرسانی مداوم",
                text: "دریافت به‌روزرسانی‌های رایگان و پشتیبانی مادام‌العمر",
              },
            ].map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.featureIconWrapper}>
                  <Icon name={feature.icon} className={styles.featureIcon} />
                </div>

                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>سوالات متداول</h2>

            <p className={styles.sectionSubtitle}>
              پاسخ سوالات رایج درباره قالب‌ها
            </p>
          </div>

          <div className={styles.faqList}>
            {[
              {
                q: "آیا می‌توانم قالب را سفارشی‌سازی کنم؟",
                a: "بله، تمام قالب‌های ما کاملاً قابل سفارشی‌سازی هستند. شما می‌توانید رنگ‌ها، فونت‌ها، تصاویر و محتوا را به راحتی تغییر دهید.",
              },
              {
                q: "آیا پشتیبانی فنی ارائه می‌شود؟",
                a: "بله، ما پشتیبانی فنی کامل برای تمام مشتریان خود ارائه می‌دهیم. بسته به پکیج انتخابی، مدت زمان پشتیبانی متفاوت است.",
              },
              {
                q: "آیا به‌روزرسانی‌ها رایگان است؟",
                a: "بله، تمام به‌روزرسانی‌های قالب‌ها برای همیشه رایگان است و شما می‌توانید آخرین نسخه را دانلود کنید.",
              },
              {
                q: "آیا می‌توانم قالب را در چند پروژه استفاده کنم؟",
                a: "بله، با خرید هر قالب، شما مجاز به استفاده از آن در پروژه‌های نامحدود هستید.",
              },
              {
                q: "آیا امکان بازگشت وجه وجود دارد؟",
                a: "بله، ما ضمانت بازگشت وجه ۳۰ روزه ارائه می‌دهیم. اگر از قالب راضی نبودید، می‌توانید درخواست بازگشت وجه دهید.",
              },
            ].map((item, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span className={styles.faqQuestion}>{item.q}</span>

                  <Icon name="ChevronDown" className={styles.faqIcon} />
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section
        className={`${styles.sectionPadding} ${styles.newsletterSection}`}
      >
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.sectionTitle}>
              از جدیدترین قالب‌ها باخبر شوید
            </h2>

            <p className={styles.sectionSubtitle}>
              با عضویت در خبرنامه ما، از آخرین قالب‌ها و تخفیف‌های ویژه مطلع
              شوید
            </p>

            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className={styles.newsletterInput}
              />

              <button
                className={`${styles.button} ${styles.lgButton} ${styles.primaryButton}`}
              >
                عضویت
              </button>
            </div>

            <p className={styles.newsletterDisclaimer}>
              با عضویت، شما با قوانین و مقررات ما موافقت می‌کنید
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`${styles.sectionPadding} ${styles.finalCtaSection}`}>
        <div className={styles.container}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              آماده‌اید وبسایت خود را راه‌اندازی کنید؟
            </h2>

            <p className={styles.finalCtaSubtitle}>
              با قالب‌های حرفه‌ای ما، در کمتر از یک ساعت وبسایت خود را آنلاین
              کنید
            </p>

            <div className={styles.finalCtaButtons}>
              <button
                className={`${styles.button} ${styles.xlButton} ${styles.primaryButton}`}
              >
                مشاهده قالب‌ها
              </button>

              <button
                className={`${styles.button} ${styles.xlButton} ${styles.outlineButton} ${styles.transparentBgButton}`}
              >
                تماس با ما
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
