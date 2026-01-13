import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
}

export function ProductPrice({
  price,
  originalPrice,
  size = "md",
  showSavings = true,
  className,
}: ProductPriceProps) {
  const savings = originalPrice ? originalPrice - price : 0;

  const sizeClasses = {
    sm: {
      price: "text-lg font-medium",
      original: "text-sm",
    },
    md: {
      price: "text-2xl font-medium",
      original: "text-lg",
    },
    lg: {
      price: "text-3xl font-medium",
      original: "text-xl",
    },
  };

  return (
    <div className={cn("flex items-baseline gap-3 flex-wrap", className)}>
      <span className={sizeClasses[size].price}>${price}</span>
      {originalPrice && (
        <>
          <span
            className={cn(
              sizeClasses[size].original,
              "text-muted-foreground line-through"
            )}
          >
            ${originalPrice}
          </span>
          {showSavings && (
            <Badge className="bg-red-100 text-red-600 border-0">
              Save ${savings}
            </Badge>
          )}
        </>
      )}
    </div>
  );
}
