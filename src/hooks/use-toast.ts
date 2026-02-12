"use client";

import { useToastContext } from "@/contexts/toast-context";

export type ToastType = "success" | "error" | "info";

/**
 * Toast hook – phải dùng trong ToastProvider.
 * Toast hiển thị ở góc dưới phải (ToastContainer render trong layout).
 */
export function useToast() {
  return useToastContext();
}
