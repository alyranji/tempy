"use client";

import { ReactNode } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginSchema } from "@/schemas/login.schema";

import styles from "./login-page.module.css";

type FormInputs = z.infer<typeof loginSchema>;

export default function LoginPage(): ReactNode {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "ورود ناموفق بود.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      alert("ورود با موفقیت انجام شد ✅");

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("خطای ارتباط با سرور");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <Link href="/" className={styles.logo}>
              <h1>قالب مارکت</h1>
            </Link>
            <h2>ورود به حساب کاربری</h2>
            <p>به فروشگاه قالب‌های آماده خوش آمدید</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username">ایمیل</label>
              <input
                id="username"
                placeholder="example@email.com"
                className={styles.inputField}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className={styles.errorText}>{errors.username.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  فراموشی رمز عبور
                </Link>
                <label htmlFor="password">رمز عبور</label>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
                className={styles.inputField}
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              ورود
            </button>

            <div className={styles.divider}>
              <span>یا</span>
            </div>

            <div className={styles.registerText}>
              <p>
                حساب کاربری ندارید؟{" "}
                <Link href="/register" className={styles.registerLink}>
                  ثبت‌نام کنید
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.imageSection}>
        <Image
          src="/pixpa_03.png"
          alt="قالب‌های وبسایت"
          width={500}
          height={500}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3>قالب‌های حرفه‌ای</h3>
            <p>بیش از ۱۰۰ قالب آماده برای راه‌اندازی سریع وبسایت شما</p>
          </div>
        </div>
      </div>
    </div>
  );
}
