"use client";

import { useState } from "react";
import { ReactNode } from "react";

import AddTemplateForm from "./components/AddTemplateForm";
import Sidebar from "./components/Sidebar";

import styles from "./dashboard.module.css";

export default function DashboardPage(): ReactNode {
  const [activeSection, setActiveSection] = useState("add-template");

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <Sidebar active={activeSection} onSelect={setActiveSection} />
      </aside>

      <main className={styles.main}>
        {activeSection === "add-template" && <AddTemplateForm />}
      </main>
    </div>
  );
}
