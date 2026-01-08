import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative flex h-full flex-col border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
      </div>

      <div className="flex flex-1 flex-col border-t border-border/50 p-6">
        <div className="mb-3 flex-1">
          <h3 className="mb-2 text-base font-light tracking-wide text-foreground">
            {product.name}
          </h3>
          <p className="text-sm font-light leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 border-t border-border/30 pt-4">
          <span className="text-lg font-medium tracking-wide text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm font-light text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
