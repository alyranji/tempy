import React, { ReactNode } from "react";

import { Template } from "@/types/templates";

import TemplateCard from "../template card/template-card";

import styles from "./CardGrid.module.css";

type CardGridType = {
  loading?: boolean;
  templates: Template[] | undefined;
};

const CardGrid = ({ loading, templates }: CardGridType): ReactNode => {
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
