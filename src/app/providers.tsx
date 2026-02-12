"use client";

import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/toast-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  );
}
