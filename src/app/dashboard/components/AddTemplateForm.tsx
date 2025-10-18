"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import styles from "../dashboard.module.css";

const InsertSchema = z.object({
  title: z.string().min(3, "عنوان حداقل باید ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات کوتاه است"),
  image: z.any(),
  demo_url: z.string().url("آدرس دمو معتبر نیست"),
  price: z.coerce.number().nonnegative("قیمت معتبر نیست"),
  categories: z.string().optional(),
  tags: z.string().optional(),
  features: z.string().optional(),
  addons: z.string().optional(),
  rtl: z.boolean(),
});

type TemplateFormData = z.infer<typeof InsertSchema>;

export default function AddTemplateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(InsertSchema),
  });

  const onSubmit: SubmitHandler<TemplateFormData> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value && (value as any)[0]) {
        formData.append("image", (value as any)[0]);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const res = await fetch("/api/templates", {
      method: "POST",
      body: formData,
    });

    console.log(await res.json());
  };

  return (
    <>
      <h2>افزودن تمپلیت جدید</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          عنوان <input type="text" {...register("title")} />
        </label>
        <label>
          توضیحات <textarea rows={5} {...register("description")} />
        </label>
        <label>
          تصویر <input type="file" {...register("image")} />
        </label>
        <label>
          آدرس دمو <input type="text" {...register("demo_url")} />
        </label>
        <label>
          قیمت تمپلیت <input type="number" {...register("price")} />
        </label>
        <label>
          دسته‌بندی‌ها (با کاما جدا شود)
          <input
            type="text"
            {...register("categories")}
            placeholder="store,blog,landing"
          />
        </label>
        <label>
          تگ‌ها (با کاما جدا شود)
          <input
            type="text"
            {...register("tags")}
            placeholder="modern,rtl,ui"
          />
        </label>
        <label>
          ویژگی‌ها (با کاما جدا شود)
          <input
            type="text"
            {...register("features")}
            placeholder="responsive,seo-ready"
          />
        </label>
        <label>
          اددان‌ها (با کاما جدا شود)
          <input
            type="text"
            {...register("addons")}
            placeholder="woocommerce,slider"
          />
        </label>
        <label htmlFor="rtl-checkbox">
          راستچین
          <input type="checkbox" id="rtl-checkbox" {...register("rtl")} />
        </label>
        <button type="submit">
          {isSubmitting ? "درحال ارسال ..." : "افزودن تمپلیت"}
        </button>
      </form>
    </>
  );
}
