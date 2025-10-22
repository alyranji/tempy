"use client";

import { ChangeEvent, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import styles from "../dashboard.module.css";

const InsertSchema = z.object({
  title: z.string().min(3, "عنوان حداقل باید ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات کوتاه است"),
  image: z.any().optional(),
  demo_url: z.string().url("آدرس دمو معتبر نیست").optional(),
  slug: z.string().min(5),
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
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(InsertSchema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const watchFields = watch(["categories", "tags", "features", "addons"]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const parseArray = (value?: string) =>
    value
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  const onSubmit: SubmitHandler<TemplateFormData> = async (data) => {
    const formData = new FormData();

    const arrayFields: (keyof TemplateFormData)[] = [
      "categories",
      "tags",
      "features",
      "addons",
    ];

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value && (value as any)[0]) {
        formData.append("image", (value as any)[0]);
      } else if (
        arrayFields.includes(key as any) &&
        typeof value === "string"
      ) {
        const arr = parseArray(value);
        formData.append(key, JSON.stringify(arr));
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await fetch("/api/templates/add", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("تمپلیت با موفقیت اضافه شد!");
      } else {
        alert("خطا: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ارسال درخواست");
    }
  };

  return (
    <>
      <h2>افزودن تمپلیت جدید</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          عنوان
          <input type="text" {...register("title")} />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </label>
        <label>
          Slug{" "}
          <input
            type="text"
            {...register("slug")}
            placeholder="مثلا: my-template"
          />
        </label>

        <label>
          توضیحات
          <textarea rows={5} {...register("description")} />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </label>

        <label>
          تصویر
          <input
            type="file"
            {...register("image")}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "200px", marginTop: "8px" }}
              />
            </div>
          )}
        </label>

        <label>
          آدرس دمو
          <input type="text" {...register("demo_url")} />
          {errors.demo_url && (
            <p className={styles.error}>{errors.demo_url.message}</p>
          )}
        </label>

        <label>
          قیمت تمپلیت
          <input type="number" {...register("price")} />
          {errors.price && (
            <p className={styles.error}>{errors.price.message}</p>
          )}
        </label>

        {(["categories", "tags", "features", "addons"] as const).map(
          (field) => (
            <label key={field}>
              {field === "categories" && "دسته‌بندی‌ها (با کاما جدا شود)"}
              {field === "tags" && "تگ‌ها (با کاما جدا شود)"}
              {field === "features" && "ویژگی‌ها (با کاما جدا شود)"}
              {field === "addons" && "اددان‌ها (با کاما جدا شود)"}
              <input
                type="text"
                {...register(field)}
                placeholder={
                  field === "categories"
                    ? "store,blog,landing"
                    : field === "tags"
                      ? "modern,rtl,ui"
                      : field === "features"
                        ? "responsive,seo-ready"
                        : "woocommerce,slider"
                }
              />
              <div className={styles.jsonPreview}>
                پیش‌نمایش JSON: {JSON.stringify(parseArray(watchFields[field]))}
              </div>
            </label>
          ),
        )}

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
