// components/ToastProvider.tsx
"use client";

import { ReactNode } from "react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components/ToastProvider.tsx

// components/ToastProvider.tsx

// components/ToastProvider.tsx

// components/ToastProvider.tsx

// components/ToastProvider.tsx

// ✅ تابع نمایش Toast با پراپس دلخواه
export function showToast(
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
): void {
  const options = {
    position: "bottom-right" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light" as const,
    transition: Bounce,
    rtl: true,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
  }
}

export function ToastProvider(): ReactNode {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
}
