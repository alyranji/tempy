import { ReactNode } from "react";

import Search from "@/components/search/search";

import HeroImages from "./hero images/hero-images";

import styles from "./home-hero.module.css";

function HomeHero(): ReactNode {
  return (
    <section className={styles.hero}>
      <div>
        <h1>
          سازنده وب‌سایت برای افراد <span>خلاق برتر</span>
        </h1>
        <p>
          وب‌سایت‌ها، نمونه‌کارها، فروشگاه‌ها و وبلاگ‌های خیره‌کننده ایجاد کنید
          - همه در یک مکان. در زمان و هزینه صرفه‌جویی کنید!
        </p>

        <Search />
      </div>
      <HeroImages />
    </section>
  );
}

export default HomeHero;
