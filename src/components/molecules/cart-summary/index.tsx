"use client";

import { useState } from "react";
import { SafeLink } from "@/components/ui/safe-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TYPOGRAPHY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CartSummary as CartSummaryType } from "@/types/cart";
import { ArrowRight, Tag, Truck } from "lucide-react";

interface CartSummaryProps {
  summary: CartSummaryType;
  onApplyCoupon?: (code: string) => void;
  checkoutUrl?: string;
  className?: string;
}

export function CartSummary({
  summary,
  onApplyCoupon,
  checkoutUrl = "/checkout",
  className,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    if (couponCode.trim() && onApplyCoupon) {
      onApplyCoupon(couponCode.trim());
      setAppliedCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  return (
    <Card
      className={cn(
        "rounded-none border border-border/50 bg-background p-6 md:p-8",
        className
      )}
    >
      <h3 className="mb-6 text-xl font-light tracking-wide text-foreground">
        Order Summary
      </h3>

      {/* Coupon Code */}
      <div className="mb-6 space-y-2">
        <label className="text-sm font-light text-foreground">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="pl-9 rounded-none border border-border/50 bg-background"
              disabled={!!appliedCoupon}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || !!appliedCoupon}
            className="rounded-none"
          >
            Apply
          </Button>
        </div>
        {appliedCoupon && (
          <p className="text-xs font-light text-green-600">
            Coupon "{appliedCoupon}" applied
          </p>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Summary Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="font-light text-muted-foreground">Subtotal</span>
          <span className="font-light text-foreground">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="font-light text-muted-foreground">Discount</span>
            <span className="font-light text-green-600">
              -${summary.discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="font-light text-muted-foreground">Shipping</span>
          <span className="font-light text-foreground">
            {summary.shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${summary.shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {summary.subtotal < 100 && (
          <Alert className="mt-4">
            <Truck className="size-4" />
            <AlertDescription>
              Add ${(100 - summary.subtotal).toFixed(2)} more for free shipping
            </AlertDescription>
          </Alert>
        )}
        {summary.subtotal >= 100 && summary.shipping === 0 && (
          <Alert className="mt-4">
            <Truck className="size-4" />
            <AlertDescription>
              You qualify for free shipping!
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Total */}
      <div className="flex justify-between items-baseline mb-6">
        <span className="text-base font-light tracking-wide text-foreground">
          Total
        </span>
        <span className={cn(TYPOGRAPHY.price, "text-2xl")}>
          ${summary.total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button variant="luxury" size="lg" className="w-full" asChild>
        <SafeLink href={checkoutUrl}>
          Proceed to Checkout
          <ArrowRight className="ml-2 size-4" />
        </SafeLink>
      </Button>

      {/* Continue Shopping */}
      <Button variant="ghost" className="w-full mt-3" asChild>
        <SafeLink href="/products">Continue Shopping</SafeLink>
      </Button>
    </Card>
  );
}
