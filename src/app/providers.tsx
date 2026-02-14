"use client";

import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/toast-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ToastProvider>
    </CartProvider>
  );
}
