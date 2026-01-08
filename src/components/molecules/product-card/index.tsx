import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BaseCard } from "../base-card";
import { ImageCard } from "../image-card";
import { CardContent } from "../card-content";
import { CardDivider } from "../card-divider";
import { TYPOGRAPHY } from "@/lib/constants";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <BaseCard href={`/products/${product.id}`} className={className}>
      <ImageCard
        src={product.image}
        alt={product.name}
        aspectRatio="square"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      >
        {product.badge && (
          <div className="absolute left-4 top-4">
            <Badge
              variant="outline"
              className="rounded-none border border-border/50 bg-background/90 px-3 py-1 text-xs font-light tracking-wide backdrop-blur-sm"
            >
              {product.badge}
            </Badge>
          </div>
        )}
      </ImageCard>

      <CardContent>
        <div className="flex-1">
          <h3 className={cn(TYPOGRAPHY.title.base, TYPOGRAPHY.title.sm)}>
            {product.name}
          </h3>
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
      </CardContent>
    </BaseCard>
  );
}
