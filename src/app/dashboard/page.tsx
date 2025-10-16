"use client";

import { ReactNode } from "react";
import { useState } from "react";

import AddTemplateForm from "./add-template/page";

import styles from "./dashboard.module.css";

export default function DashboardPage(): ReactNode {
  return (
    <div className={styles.dashboard}>
      <AddTemplateForm />
    </div>
  );
}
