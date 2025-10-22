"use client";

import { ReactNode } from "react";

import styles from "../dashboard.module.css";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
}

export default function Sidebar({ active, onSelect }: SidebarProps): ReactNode {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.logo}>Pida Dashboard</h2>

      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${
            active === "add-template" ? styles.active : ""
          }`}
          onClick={() => onSelect("add-template")}
        >
          افزودن تمپلیت
        </li>
        {/* اینجا بعدا گزینه‌های دیگه مثل مدیریت کاربران، سفارش‌ها و ... اضافه می‌شن */}
      </ul>
    </nav>
  );
}
