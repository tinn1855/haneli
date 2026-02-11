"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TYPOGRAPHY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    onUpdateQuantity(item.id, newQuantity);
  };

  const subtotal = item.product.price * item.quantity;
  const discount = item.product.originalPrice
    ? (item.product.originalPrice - item.product.price) * item.quantity
    : 0;

  return (
    <div className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <Link
          href={`/products/${item.product.id}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden border border-border/50 bg-muted/20 md:h-32 md:w-32"
        >
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </Link>

        {/* Product Info */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link
                href={`/products/${item.product.id}`}
                className="text-base font-light tracking-wide text-foreground hover:text-foreground/70 transition-colors"
              >
                {item.product.name}
              </Link>
              {item.product.category && (
                <p className="text-xs font-light text-muted-foreground mt-1">
                  {item.product.category}
                </p>
              )}
              {item.personalization?.text && (
                <p className="text-xs font-light text-muted-foreground mt-1">
                  Personalization: {item.personalization.text}
                </p>
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.id)}
              aria-label="Remove item"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between gap-4 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md"
                onClick={() => handleQuantityChange(-1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="w-10 text-center text-sm font-light">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-md"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="size-3.5" />
              </Button>
            </div>

            {/* Price */}
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2">
                <span className={TYPOGRAPHY.price}>${subtotal.toFixed(2)}</span>
                {item.product.originalPrice && (
                  <span className={cn(TYPOGRAPHY.priceOriginal, "text-xs")}>
                    ${(item.product.originalPrice * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs font-light text-green-600 mt-0.5">
                  Save ${discount.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
