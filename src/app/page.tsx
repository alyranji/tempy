import { ReactNode } from "react";

import CardGrid from "@/components/card grid/CardGrid";
import HomeHero from "@/components/home-hero/home-hero";

export default function Home(): ReactNode {
  return (
    <>
      <HomeHero />
      <CardGrid />
    </>
  );
}
