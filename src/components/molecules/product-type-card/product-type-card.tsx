import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/types/product-type";

interface ProductTypeCardProps {
  productType: ProductType;
  className?: string;
}

export function ProductTypeCard({ productType, className }: ProductTypeCardProps) {
  return (
    <Link
      href={productType.href}
      className={cn(
        "group relative flex h-full flex-col border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
        <Image
          src={productType.image}
          alt={productType.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-border/50 p-6">
        <div className="mb-2 flex-1">
          <h3 className="mb-2 text-lg font-light tracking-wide text-foreground">
            {productType.name}
          </h3>
          <p className="text-sm font-light leading-relaxed text-muted-foreground">
            {productType.description}
          </p>
        </div>

        {productType.count && (
          <div className="border-t border-border/30 pt-4">
            <span className="text-xs font-light tracking-wide text-muted-foreground">
              {productType.count} products
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

