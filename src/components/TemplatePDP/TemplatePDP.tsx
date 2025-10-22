import { ReactNode, useEffect, useState } from "react";
import React from "react";

import { notFound } from "next/navigation";

import { filterTemplates } from "@/utils/filter-templates";

import styles from "./TemplatePDP.module.css";

export type Template = {
  title: string;
  image: string;
  description?: string | null;
  demo_url: string | null;
  price: number;
  created_at: Date;
  updated_at: Date;
  score: 1 | 2 | 3 | 4 | 5 | null;
  sellCount: number;
  categories: string[];
  tags: string[];
  features: string[];
  addons: string[];
  requirements: string[];
};

interface TemplatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

type Comment = {
  id: number;
  author: string;
  date: string;
  content: string;
  replies?: Comment[];
};

const TemplatePDP = ({ params }: TemplatePageProps): ReactNode => {
  const { slug } = React.use(params);
  const [activeTab, setActiveTab] = useState<
    "details" | "features" | "requirements" | "addons"
  >("details");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [template, setTemplate] = useState<Template | undefined>();
  const [loading, setLoading] = useState(true);

  if (!slug) {
    notFound();
  }

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({});
        const template = data.find((item) => item.slug === slug);
        setTemplate(template);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [slug]);

  if (!template)
    return <div className={styles.loading}>در حال بارگذاری...</div>;

  const faqs = [
    {
      question: "آیا برای نصب به دانش فنی نیاز است؟",
      answer:
        "خیر، نصب بسیار ساده است و مستندات کامل همراه قالب ارائه می‌شود. همچنین تیم پشتیبانی ما آماده کمک به شما هستند.",
    },
    {
      question: "آیا به‌روزرسانی‌ها رایگان است؟",
      answer:
        "بله، تمامی به‌روزرسانی‌های آینده به صورت رایگان در اختیار شما قرار می‌گیرد.",
    },
    {
      question: "چه مدت پشتیبانی دریافت می‌کنم؟",
      answer:
        "شش ماه پشتیبانی رایگان به همراه خرید شما ارائه می‌شود و امکان تمدید وجود دارد.",
    },
    {
      question: "آیا می‌توانم در چند پروژه استفاده کنم؟",
      answer:
        "لایسنس استاندارد برای یک پروژه است. برای استفاده در پروژه‌های متعدد، لایسنس توسعه‌دهنده را تهیه کنید.",
    },
  ];

  const comments: Comment[] = [
    {
      id: 1,
      author: "علی محمدی",
      date: "۲ روز پیش",
      content: "قالب بسیار عالی و حرفه‌ای. پشتیبانی هم فوق‌العاده است.",
      replies: [
        {
          id: 2,
          author: "تیم پشتیبانی",
          date: "۱ روز پیش",
          content: "از اعتماد شما سپاسگزاریم. موفق باشید! 🙏",
        },
      ],
    },
    {
      id: 3,
      author: "فاطمه احمدی",
      date: "۵ روز پیش",
      content: "سرعت و بهینه‌سازی این قالب واقعا شگفت‌انگیزه. پیشنهاد می‌کنم.",
    },
  ];

  const similarTemplates = [
    {
      id: 1,
      title: "قالب فروشگاهی پرو",
      image: "/placeholder.svg",
      price: 3200000,
      score: 4,
    },
    {
      id: 2,
      title: "قالب چند فروشندگی",
      image: "/placeholder.svg",
      price: 4500000,
      score: 5,
    },
    {
      id: 3,
      title: "قالب فروشگاه مینیمال",
      image: "/placeholder.svg",
      price: 1800000,
      score: 4,
    },
    {
      id: 4,
      title: "قالب فروشگاه لوکس",
      image: "/placeholder.svg",
      price: 2900000,
      score: 5,
    },
  ];

  const renderStars = (score: number) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= score ? styles.starFilled : styles.starEmpty}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            <img src={template.image} alt={template.title} />
            {template.demo_url && (
              <a
                href={template.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.demoButton}
              >
                مشاهده دموی زنده
              </a>
            )}
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.categories}>
              {template.categories.map((cat, idx) => (
                <span key={idx} className={styles.category}>
                  {cat}
                </span>
              ))}
            </div>

            <h1 className={styles.title}>{template.title}</h1>

            <div className={styles.meta}>
              {template.score && (
                <div className={styles.rating}>
                  {renderStars(template.score)}
                  <span className={styles.score}>{template.score}/5</span>
                </div>
              )}
              <div className={styles.sales}>
                <span className={styles.salesIcon}>🔥</span>
                <span>{template.sellCount} فروش</span>
              </div>
            </div>

            <p className={styles.description}>{template.description}</p>

            <div className={styles.tags}>
              {template.tags.map((tag, idx) => (
                <span key={idx} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className={styles.priceSection}>
              <div className={styles.priceInfo}>
                <div className={styles.priceLabel}>قیمت:</div>
                <div className={styles.price}>
                  {formatPrice(template.price)}
                </div>
              </div>
              <button className={styles.addToCart}>
                <span className={styles.cartIcon}>🛒</span>
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className={styles.details}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "details" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("details")}
          >
            توضیحات
          </button>
          <button
            className={`${styles.tab} ${activeTab === "features" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("features")}
          >
            ویژگی‌ها
          </button>
          <button
            className={`${styles.tab} ${activeTab === "requirements" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("requirements")}
          >
            پیش‌نیازها
          </button>
          <button
            className={`${styles.tab} ${activeTab === "addons" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("addons")}
          >
            افزونه‌ها
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "details" && (
            <div className={styles.detailsText}>{template.description}</div>
          )}
          {activeTab === "features" && (
            <ul className={styles.list}>
              {template.features.map((feature, idx) => (
                <li key={idx} className={styles.listItem}>
                  <span className={styles.checkmark}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "requirements" && (
            <ul className={styles.list}>
              {template.requirements.map((req, idx) => (
                <li key={idx} className={styles.listItem}>
                  <span className={styles.bullet}>•</span>
                  {req}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "addons" && (
            <ul className={styles.list}>
              {template.addons.map((addon, idx) => (
                <li key={idx} className={styles.listItem}>
                  <span className={styles.plus}>+</span>
                  {addon}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <h2 className={styles.sectionTitle}>سوالات متداول</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <span
                  className={`${styles.faqIcon} ${expandedFaq === idx ? styles.faqIconExpanded : ""}`}
                >
                  ›
                </span>
              </button>
              {expandedFaq === idx && (
                <div className={styles.faqAnswer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Custom Website CTA */}
      <section className={styles.customCta}>
        <div className={styles.customCtaContent}>
          <div className={styles.customCtaIcon}>💼</div>
          <div className={styles.customCtaText}>
            <h3 className={styles.customCtaTitle}>
              نیاز به وبسایت سفارشی دارید؟
            </h3>
            <p className={styles.customCtaDescription}>
              تیم ما آماده است تا وبسایت اختصاصی شما را طراحی و پیاده‌سازی کند
            </p>
          </div>
          <button className={styles.customCtaButton}>تماس با ما</button>
        </div>
      </section>

      {/* Comments Section */}
      <section className={styles.comments}>
        <h2 className={styles.sectionTitle}>نظرات کاربران</h2>
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>{comment.author[0]}</div>
                  <div>
                    <div className={styles.authorName}>{comment.author}</div>
                    <div className={styles.commentDate}>{comment.date}</div>
                  </div>
                </div>
              </div>
              <div className={styles.commentContent}>{comment.content}</div>
              {comment.replies && comment.replies.length > 0 && (
                <div className={styles.replies}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className={styles.reply}>
                      <div className={styles.commentHeader}>
                        <div className={styles.commentAuthor}>
                          <div
                            className={`${styles.avatar} ${styles.avatarSupport}`}
                          >
                            {reply.author[0]}
                          </div>
                          <div>
                            <div className={styles.authorName}>
                              {reply.author}
                              <span className={styles.supportBadge}>
                                پشتیبانی
                              </span>
                            </div>
                            <div className={styles.commentDate}>
                              {reply.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.commentContent}>
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Similar Templates */}
      <section className={styles.similar}>
        <h2 className={styles.sectionTitle}>قالب‌های مشابه</h2>
        <div className={styles.similarGrid}>
          {similarTemplates.map((item) => (
            <div key={item.id} className={styles.similarCard}>
              <div className={styles.similarImage}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={styles.similarInfo}>
                <h3 className={styles.similarTitle}>{item.title}</h3>
                <div className={styles.similarMeta}>
                  {renderStars(item.score)}
                  <div className={styles.similarPrice}>
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TemplatePDP;
