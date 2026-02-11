"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

export function EmptyWishlist() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Heart className="size-12 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl md:text-3xl font-light tracking-tight">
          Your wishlist is empty
        </EmptyTitle>
        <EmptyDescription className="text-sm font-light leading-relaxed">
          Save items you love by adding them to your wishlist. You can add
          products from any product page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="luxury" size="lg" asChild>
          <Link href="/products">
            Browse Products
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
