"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/types/cart";

interface CheckoutOrderSummaryItemProps {
  item: CartItem;
}

export function CheckoutOrderSummaryItem({ item }: CheckoutOrderSummaryItemProps) {
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex items-start gap-4 border-b border-border/40 pb-4 last:border-b-0 last:pb-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border/50 bg-muted/20">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/products/${item.product.id}`}
          className="text-sm font-light tracking-wide text-foreground transition-colors hover:text-foreground/70"
        >
          {item.product.name}
        </Link>
        <p className="text-xs font-light text-muted-foreground">
          Qty {item.quantity} × ${item.product.price.toFixed(2)}
        </p>
        {item.personalization?.text && (
          <p className="text-xs font-light text-muted-foreground">
            Personalization: {item.personalization.text}
          </p>
        )}
      </div>
      <span className="text-sm font-medium text-foreground">
        ${itemTotal.toFixed(2)}
      </span>
    </div>
  );
}
