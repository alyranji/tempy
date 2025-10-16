"use client";

import { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./AddTemplateForm.module.css";

const templateSchema = z.object({
  title: z.string().min(1),
  image: z.string().url(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  demoUrl: z.string().url(),
  slug: z.string(),
  category: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number(),
  isRtl: z.boolean(),
  addOns: z.array(z.string()).optional(),
  score: z.number().min(1).max(5),
  sellCount: z.number(),
  reviewCount: z.number(),
  requirements: z.array(z.string()).optional(),
  status: z.enum(["active", "draft"]),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

export default function AddTemplateForm(): ReactNode {
  const { register, handleSubmit, control, reset } =
    useForm<TemplateFormValues>({
      resolver: zodResolver(templateSchema),
      defaultValues: {
        features: [""],
        category: [""],
        tags: [""],
        addOns: [""],
        requirements: [""],
        isRtl: false,
        score: 1,
        sellCount: 0,
        reviewCount: 0,
        status: "active",
      },
    });

  const onSubmit = async (data: TemplateFormValues): Promise<void> => {
    const template = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      features: data.features?.filter((f) => f),
      category: data.category?.filter((c) => c),
      tags: data.tags?.filter((t) => t),
      addOns: data.addOns?.filter((a) => a),
      requirements: data.requirements?.filter((r) => r),
    };

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(template),
      });

      const result = await res.json();
      if (result.success) {
        alert("Template added successfully!");
        reset();
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Title</label>
        <input {...register("title")} />
      </div>

      <div className={styles.field}>
        <label>Image URL</label>
        <input {...register("image")} />
      </div>

      <div className={styles.field}>
        <label>Description</label>
        <textarea {...register("description")} />
      </div>

      <div className={styles.field}>
        <label>Slug</label>
        <input {...register("slug")} />
      </div>

      <div className={styles.field}>
        <label>Demo URL</label>
        <input {...register("demoUrl")} />
      </div>

      <div className={styles.field}>
        <label>Price</label>
        <input type="number" {...register("price", { valueAsNumber: true })} />
      </div>

      <div className={styles.fieldCheckbox}>
        <label>Is RTL</label>
        <input type="checkbox" {...register("isRtl")} />
      </div>

      <div className={styles.field}>
        <label>Score</label>
        <input
          type="number"
          min={1}
          max={5}
          {...register("score", { valueAsNumber: true })}
        />
      </div>

      <div className={styles.field}>
        <label>Sell Count</label>
        <input
          type="number"
          {...register("sellCount", { valueAsNumber: true })}
        />
      </div>

      <div className={styles.field}>
        <label>Review Count</label>
        <input
          type="number"
          {...register("reviewCount", { valueAsNumber: true })}
        />
      </div>

      <div className={styles.field}>
        <label>Status</label>
        <select {...register("status")}>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* می‌توانی بخش‌های آرایه‌ای مثل features, category, tags, addOns, requirements را اضافه کنی */}

      <button type="submit" className={styles.submitBtn}>
        Add Template
      </button>
    </form>
  );
}
