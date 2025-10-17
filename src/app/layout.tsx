import { ReactNode } from "react";
import { StrictMode } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ToastProvider } from "@/components/toast/showToast";

import CartProvider from "@/providers/CartProvider";

import "@/styles/fonts.css";
import "@/styles/globals.css";

const yekanBakhPro = localFont({
  src: "../fonts/YekanBakhFaNum-VF.ttf",
});

export const metadata: Metadata = {
  title: "وبسایت فروشگاهی تم پی",
  description: "ارائه وبسایت های مناسب برای کسب و کارهای کوچک ایرانی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return (
    <StrictMode>
      <CartProvider>
        <html lang="fa" dir="rtl">
          <body className={`${yekanBakhPro.className}`}>
            <Header />
            <main>{children}</main>
            <ToastProvider />
            <Footer />
          </body>
        </html>
      </CartProvider>
    </StrictMode>
  );
}
