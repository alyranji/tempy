"use client";

import { PropsWithChildren, ReactNode } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Template } from "@/types/templates";

import TemplateCard from "../template card/template-card";

import styles from "./card-slider.module.css";

type TemplateSliderProps = PropsWithChildren & {
  templates: Template[];
};
const CardSlider = ({
  children,
  templates,
}: TemplateSliderProps): ReactNode => {
  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        spaceBetween={30}
        slidesPerView={4}
        autoplay
        loop
      >
        {templates.map((template, index) => (
          <SwiperSlide key={index}>
            <TemplateCard template={template} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default CardSlider;
