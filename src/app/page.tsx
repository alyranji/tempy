import { ReactNode } from "react";

import HomeHero from "@/components/home-hero/home-hero";
import TemplateFilterLayout from "@/components/template-filter-layout/TemplateFilterLayout";

export default function Home(): ReactNode {
  return (
    <>
      <HomeHero />
      <TemplateFilterLayout />
    </>
  );
}
