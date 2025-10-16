import { type ReactNode } from "react";

import Image from "next/image";

import styles from "./hero-images.module.css";

const images: string[] = [
  "/pixpa_01.png",
  "/pixpa_02.png",
  "/pixpa_03.png",
  "/pixpa_04.png",
  "/pixpa_05.png",
  "/pixpa_06.png",
];
const HeroImages = (): ReactNode => {
  return (
    <section className={styles.wrapper}>
      {images.map((link, index) => (
        <div key={link} className={styles.item}>
          <Image
            src={link}
            width={500}
            height={500}
            alt={`image item ${1 + index}`}
          />
        </div>
      ))}
    </section>
  );
};

export default HeroImages;
