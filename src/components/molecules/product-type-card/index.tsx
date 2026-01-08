import { cn } from "@/lib/utils";
import { BaseCard } from "../base-card";
import { ImageCard } from "../image-card";
import { CardContent } from "../card-content";
import { CardDivider } from "../card-divider";
import { TYPOGRAPHY } from "@/lib/constants";
import type { ProductType } from "@/types/product-type";

interface ProductTypeCardProps {
  productType: ProductType;
  className?: string;
}

export function ProductTypeCard({ productType, className }: ProductTypeCardProps) {
  return (
    <BaseCard href={productType.href} className={className}>
      <ImageCard
        src={productType.image}
        alt={productType.name}
        aspectRatio="4/3"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />

      <CardContent>
        <div className="mb-2 flex-1">
          <h3 className={cn("mb-2", TYPOGRAPHY.title.base, TYPOGRAPHY.title.md)}>
            {productType.name}
          </h3>
          <p className={TYPOGRAPHY.description}>{productType.description}</p>
        </div>

        {productType.count && (
          <CardDivider>
            <span className="text-xs font-light tracking-wide text-muted-foreground">
              {productType.count} products
            </span>
          </CardDivider>
        )}
      </CardContent>
    </BaseCard>
  );
}

