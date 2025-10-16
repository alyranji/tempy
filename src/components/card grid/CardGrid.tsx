"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { Template } from "@/types/templates";

import { filterTemplates } from "@/utils/filter-templates";

import TemplateCard from "../template card/template-card";

import styles from "./CardGrid.module.css";

const CardGrid = (): ReactNode => {
  const [templates, setTemplates] = useState<Template[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates(): Promise<void> {
      try {
        const data = await filterTemplates({});
        setTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <section className={styles.grid}>
      {templates?.map((template, index) => (
        <TemplateCard key={index} template={template} />
      ))}
    </section>
  );
};
export default CardGrid;
