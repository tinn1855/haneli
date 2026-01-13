import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  totalReviews?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function ProductRating({
  rating,
  totalReviews,
  maxRating = 5,
  size = "md",
  showCount = true,
  className,
}: ProductRatingProps) {
  const sizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              index < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
}
