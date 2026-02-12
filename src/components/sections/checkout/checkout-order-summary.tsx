"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Separator } from "@/components/ui/separator";
import { CheckoutOrderSummaryItem } from "@/components/molecules/checkout-order-summary-item";
import type { CartItem } from "@/types/cart";
import type { CartSummary } from "@/types/cart";

interface CheckoutOrderSummaryProps {
  cart: CartItem[];
  baseSummary: CartSummary;
  shippingCost: number;
  orderTotal: number;
}

export function CheckoutOrderSummary({
  cart,
  baseSummary,
  shippingCost,
  orderTotal,
}: CheckoutOrderSummaryProps) {
  return (
    <ScrollAnimation direction="up" delay={0.3}>
      <aside className="space-y-6 rounded-none border border-border/50 bg-background p-6 md:p-8">
        <div>
          <h2 className="text-lg font-light tracking-wide text-foreground">
            Order Summary
          </h2>
          <p className="text-xs font-light text-muted-foreground">
            Review your items before placing the order.
          </p>
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
            <CheckoutOrderSummaryItem key={item.id} item={item} />
          ))}
        </div>

        <Separator />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${baseSummary.subtotal.toFixed(2)}</span>
          </div>
          {baseSummary.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ${baseSummary.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>
              {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-base font-light tracking-wide text-foreground">
          <span>Total</span>
          <span className="text-xl font-medium">${orderTotal.toFixed(2)}</span>
        </div>

        <p className="text-xs font-light text-muted-foreground">
          All prices are in USD. Taxes are calculated at checkout.
        </p>
      </aside>
    </ScrollAnimation>
  );
}
