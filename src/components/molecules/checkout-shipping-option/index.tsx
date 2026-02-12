"use client";

import { cn } from "@/lib/utils";
import type { ShippingOption } from "@/types/checkout";

interface CheckoutShippingOptionProps {
  option: ShippingOption;
  isActive: boolean;
  onSelect: () => void;
}

export function CheckoutShippingOption({
  option,
  isActive,
  onSelect,
}: CheckoutShippingOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        "w-full rounded-md border border-border/50 px-4 py-3 text-left transition-colors hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "border-foreground shadow-[0_6px_20px_rgb(15,15,15,0.08)]",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-foreground">
            {option.label}
          </p>
          <p className="text-xs font-light text-muted-foreground">
            {option.description}
          </p>
        </div>
        <div className="text-xs font-light text-muted-foreground">
          {isActive ? "Selected" : "Select"}
        </div>
      </div>
    </button>
  );
}
