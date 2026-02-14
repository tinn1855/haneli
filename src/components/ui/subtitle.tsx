import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const subtitleVariants = cva("uppercase tracking-[0.2em]", {
  variants: {
    variant: {
      default:
        "text-xs font-light text-muted-foreground",
      hero: "text-xs font-medium tracking-[0.25em] text-white/70",
      light: "text-sm font-light text-foreground/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SubtitleElement = HTMLParagraphElement;
type SubtitleProps = React.HTMLAttributes<SubtitleElement> &
  VariantProps<typeof subtitleVariants>;

const Subtitle = React.forwardRef<SubtitleElement, SubtitleProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(subtitleVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Subtitle.displayName = "Subtitle";

export { Subtitle, subtitleVariants };
export type { SubtitleProps };
