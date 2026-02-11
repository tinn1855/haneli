"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface WishlistItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export function WishlistItem({
  product,
  onAddToCart,
  onRemove,
}: WishlistItemProps) {
  return (
    <div className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
      <div className="flex gap-4 md:gap-6">
        <Link
          href={`/products/${product.id}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden border border-border/50 bg-muted/20 md:h-32 md:w-32"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Link
                href={`/products/${product.id}`}
                className="text-base font-light tracking-wide text-foreground transition-colors hover:text-foreground/70"
              >
                {product.name}
              </Link>
              {product.category && (
                <p className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                  {product.category}
                </p>
              )}
              {product.description && (
                <p className="text-xs font-light leading-relaxed text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(product.id)}
              aria-label="Remove from wishlist"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className={cn(TYPOGRAPHY.price, "text-xl")}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className={cn(TYPOGRAPHY.priceOriginal, "text-xs")}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-none px-4"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="mr-2 size-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
