"use client";

import { ReactNode, useEffect, useState } from "react";
import React from "react";

import {
  ArchiveTick,
  Call,
  Refresh,
  ShoppingBag,
  Star1,
} from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/button/button";
import TemplateCard from "@/components/template card/template-card";

import { useCart } from "@/providers/CartProvider";

import { type Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import styles from "./page.module.css";

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

const categoryDict = [
  { value: "blog", label: "وبلاگ" },
  { value: "news", label: "خبری" },
  { value: "corp", label: "شرکتی" },
  { value: "edu", label: "آموزشی" },
  { value: "store", label: "فروشگاهی" },
  { value: "portfolio", label: "نمونه کار" },
  { value: "marketing", label: "دیجیتال مارکتینگ" },
  { value: "startup", label: "استارتاپی" },
];

const Page = ({ params }: TemplatePageProps): ReactNode => {
  const { slug } = React.use(params);
  const [activeTab, setActiveTab] = useState<
    "details" | "features" | "requirements" | "addons"
  >("details");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [template, setTemplate] = useState<Template | undefined>();
  const [loading, setLoading] = useState(true);
  const [isInCart, setisInCart] = useState(false);
  const [similarTemplates, setSimilarTemplates] = useState<Template[]>();

  const { addItem, items, removeItem } = useCart();

  if (!slug) {
    notFound();
  }

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({});
        const template = data.find((item) => item.slug === slug);

        if (!template) {
          console.warn(`Template with slug "${slug}" not found.`);
          setTemplate(undefined);
          setSimilarTemplates([]);
          return;
        }

        setTemplate(template);

        const similar = await filterTemplates({
          categories: template.categories,
        });
        setSimilarTemplates(similar);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [slug]);

  useEffect(() => {
    if (items?.filter((item) => item.id === template?.id).length) {
      setisInCart(true);
    } else {
      setisInCart(false);
    }
  }, [items, template?.id]);

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

  // const similarTemplates = [
  //   {
  //     id: 1,
  //     title: "قالب فروشگاهی پرو",
  //     image: "/placeholder.svg",
  //     price: 3200000,
  //     score: 4,
  //   },
  //   {
  //     id: 2,
  //     title: "قالب چند فروشندگی",
  //     image: "/placeholder.svg",
  //     price: 4500000,
  //     score: 5,
  //   },
  //   {
  //     id: 3,
  //     title: "قالب فروشگاه مینیمال",
  //     image: "/placeholder.svg",
  //     price: 1800000,
  //     score: 4,
  //   },
  //   {
  //     id: 4,
  //     title: "قالب فروشگاه لوکس",
  //     image: "/placeholder.svg",
  //     price: 2900000,
  //     score: 5,
  //   },
  // ];

  const renderStars = (score: number): ReactNode => {
    const scoreArray = Array.apply("", Array(score));
    const remainStars = 5 - score;
    const remainArray = Array.apply("", Array(remainStars));
    return (
      <div className={styles.stars}>
        {scoreArray.map((_, index) => (
          <Star1 key={index} color="#ffa945" variant="Bold" />
        ))}
        {remainArray.map((_, index) => (
          <Star1 key={index} color="#ffa945" />
        ))}
      </div>
    );
  };

  const formatPrice = (price: number): ReactNode => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            {template?.image && (
              <Image
                src={template?.image}
                alt={template.title}
                width={500}
                height={1000}
              />
            )}
            <div className={styles.overlay}></div>
            {template.demo_url && (
              <Link
                href={template.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.demoButton}
              >
                <Button>مشاهده دمو زنده</Button>
              </Link>
            )}
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.categories}>
              {template.categories.map((cat, idx) => (
                <span key={idx} className={styles.category}>
                  {categoryDict
                    .filter((x) => x.value === cat)
                    .map((x) => x.label)}
                </span>
              ))}
            </div>

            <h1 className={styles.title}>{template.title}</h1>

            <div className={styles.meta}>
              {template.score && (
                <div className={styles.rating}>
                  {renderStars(template.score)}
                  <span className={styles.score}>{template.score} از 5</span>
                </div>
              )}
              <div className={styles.sales}>
                <span className={styles.salesIcon}>
                  <svg
                    stroke="currentColor"
                    fill="#FFC107"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="23"
                    width="23"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                  </svg>
                </span>
                <span>{template.sellCount} فروش </span>
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

              {isInCart ? (
                <div className={styles.restoreBtn}>
                  <Button
                    variant="primary"
                    size="md"
                    disabled
                    onClick={() => addItem(template)}
                    icon={<ArchiveTick />}
                  >
                    محصول به در سبد شماست!
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => removeItem(template)}
                    icon={<Refresh />}
                  ></Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => addItem(template)}
                  icon={<ShoppingBag />}
                >
                  افزودن به سبد خرید
                </Button>
              )}
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
          <Button variant="light" size="md" icon={<Call />}>
            تماس با ما
          </Button>
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
          {similarTemplates?.map((item) => (
            <div key={item.id} className={styles.similarCard}>
              <TemplateCard template={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
