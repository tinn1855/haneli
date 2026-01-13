"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductActionsProps {
  price: number;
  quantity: number;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  onShare?: () => void;
  className?: string;
}

export function ProductActions({
  price,
  quantity,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
  onShare,
  className,
}: ProductActionsProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
        <Button
          variant="luxury"
          size="xl"
          className="flex-1"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2 size-5" />
          Add to Cart - ${(price * quantity).toFixed(2)}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="xl"
              onClick={onToggleWishlist}
              className={cn(isWishlisted && "text-red-500")}
            >
              <Heart className={cn("size-5", isWishlisted && "fill-red-500")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="xl" onClick={onShare}>
              <Share2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share this product</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
