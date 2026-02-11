"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

export function EmptyCart() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBag className="size-12 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl md:text-3xl font-light tracking-tight">
          Your cart is empty
        </EmptyTitle>
        <EmptyDescription className="text-sm font-light leading-relaxed">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="luxury" size="lg" asChild>
          <Link href="/products">
            Start Shopping
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
