import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    variant: {
      display:
        "text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight",
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
      h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
      h3: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug tracking-tight",
      h4: "text-xl md:text-2xl lg:text-3xl font-semibold leading-snug tracking-tight",
      h5: "text-lg md:text-xl lg:text-2xl font-semibold leading-normal tracking-tight",
      h6: "text-base md:text-lg lg:text-xl font-semibold leading-normal tracking-tight",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

type HeadingElement = HTMLHeadingElement;
type HeadingProps = React.HTMLAttributes<HeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

const Heading = React.forwardRef<HeadingElement, HeadingProps>(
  ({ className, variant = "h1", as, ...props }, ref) => {
    const Component = as || (variant === "display" ? "h1" : variant) || "h1";

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
export type { HeadingProps };

