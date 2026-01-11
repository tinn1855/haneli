import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-transparent bg-primary text-primary-foreground hover:bg-primary/80 font-semibold",
        secondary:
          "rounded-full border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold",
        destructive:
          "rounded-full border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 font-semibold",
        outline: "rounded-full text-foreground font-semibold",
        product:
          "rounded-none border border-border/50 bg-background/90 px-3 py-1 font-light tracking-wide backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
