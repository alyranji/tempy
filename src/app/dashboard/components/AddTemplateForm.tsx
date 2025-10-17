"use client";

import { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "../dashboard.module.css";

const TemplateSchema = z.object({
  title: z.string().min(3, "عنوان حداقل باید ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات کوتاه است"),
  image: z.any(),
  demoUrl: z.string().url("آدرس دمو معتبر نیست"),
  price: z.number().min(0, "قیمت معتبر نیست"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  tags: z.string().optional(),
  isRTL: z.boolean().optional(),
});

type TemplateFormData = z.infer<typeof TemplateSchema>;

export default function AddTemplateForm(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(TemplateSchema),
  });

  const onSubmit = async (data: TemplateFormData): any => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as any),
    );

    const res = await fetch("/api/templates/add", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>افزودن تمپلیت جدید</h2>

      <label>تصویر تمپلیت</label>
      <input type="file" {...register("image")} />

      <label>عنوان تمپلیت</label>
      <input type="text" {...register("title")} />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <label>توضیحات</label>
      <textarea rows={4} {...register("description")} />
      {errors.description && (
        <p className={styles.error}>{errors.description.message}</p>
      )}

      <label>آدرس دمو</label>
      <input type="url" {...register("demoUrl")} />
      {errors.demoUrl && (
        <p className={styles.error}>{errors.demoUrl.message}</p>
      )}

      <label>قیمت (تومان)</label>
      <input type="number" {...register("price", { valueAsNumber: true })} />
      {errors.price && <p className={styles.error}>{errors.price.message}</p>}

      <label>دسته‌بندی</label>
      <input type="text" {...register("category")} placeholder="مثلاً شرکتی" />
      {errors.category && (
        <p className={styles.error}>{errors.category.message}</p>
      )}

      <label>تگ‌ها (با کاما جدا کنید)</label>
      <input
        type="text"
        {...register("tags")}
        placeholder="مثلاً Next.js, UI"
      />

      <label>
        <input type="checkbox" {...register("isRTL")} /> راست‌چین
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "در حال ارسال..." : "افزودن تمپلیت"}
      </button>
    </form>
  );
}
