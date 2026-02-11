"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TYPOGRAPHY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WishlistSummaryProps {
  totalItems: number;
  totalValue: number;
  totalOriginalValue: number;
  onAddAllToCart?: () => void;
  onClearWishlist?: () => void;
  className?: string;
}

export function WishlistSummary({
  totalItems,
  totalValue,
  totalOriginalValue,
  onAddAllToCart,
  onClearWishlist,
  className,
}: WishlistSummaryProps) {
  const hasItems = totalItems > 0;
  const potentialSavings = Math.max(totalOriginalValue - totalValue, 0);

  return (
    <Card
      className={cn(
        "rounded-none border border-border/50 bg-background p-6 md:p-8",
        className
      )}
    >
      <h3 className="mb-6 text-xl font-light tracking-wide text-foreground">
        Wishlist Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="font-light text-muted-foreground">Saved items</span>
          <span className="font-light text-foreground">{totalItems}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-light text-muted-foreground">
            Estimated value
          </span>
          <span className="font-light text-foreground">
            ${totalValue.toFixed(2)}
          </span>
        </div>
        {potentialSavings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span className="font-light">Potential savings</span>
            <span className="font-light">
              ${potentialSavings.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <Separator className="mb-6" />

      <Button
        variant="luxury"
        size="lg"
        className="w-full"
        onClick={onAddAllToCart}
        disabled={!hasItems || !onAddAllToCart}
      >
        Move all to cart
        <ShoppingCart className="ml-2 size-4" />
      </Button>

      {onClearWishlist && (
        <Button
          variant="ghost"
          className="mt-3 w-full"
          onClick={onClearWishlist}
          disabled={!hasItems}
        >
          <Trash2 className="mr-2 size-4" />
          Clear wishlist
        </Button>
      )}

      <Button variant="outline" className="mt-3 w-full" asChild>
        <Link href="/products">Continue shopping</Link>
      </Button>

      <p className="mt-4 text-xs font-light leading-relaxed text-muted-foreground">
        Items in your wishlist aren&apos;t reserved. Add them to the cart to
        secure current pricing and availability.
      </p>
    </Card>
  );
}
