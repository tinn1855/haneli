"use client";

import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageCard } from "../image-card";
import { CardContent } from "../card-content";
import { CardDivider } from "../card-divider";
import { TYPOGRAPHY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface WishlistCardProps {
  product: Product;
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  className?: string;
}

export function WishlistCard({
  product,
  onRemove,
  onAddToCart,
  className,
}: WishlistCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col rounded-none border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 overflow-hidden",
        className
      )}
    >
      <Link href={`/products/${product.id}`} className="block flex-1 min-h-0">
        <ImageCard
          src={product.image}
          alt={product.name}
          aspectRatio="square"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <CardContent>
        <div className="flex-1">
          <Link
            href={`/products/${product.id}`}
            className={cn(
              TYPOGRAPHY.title.base,
              TYPOGRAPHY.title.sm,
              "hover:text-foreground/70 transition-colors"
            )}
          >
            {product.name}
          </Link>
          <p className={TYPOGRAPHY.description}>{product.description}</p>
        </div>

        <CardDivider>
          <div className="flex items-baseline gap-2 pt-4">
            <span className={TYPOGRAPHY.price}>${product.price}</span>
            {product.originalPrice && (
              <span className={TYPOGRAPHY.priceOriginal}>
                ${product.originalPrice}
              </span>
            )}
          </div>
        </CardDivider>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-none"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 size-4" />
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive rounded-none"
            onClick={(e) => {
              e.preventDefault();
              onRemove(product.id);
            }}
            aria-label="Remove from wishlist"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
