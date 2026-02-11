import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const sectionSpacingVariants = cva("", {
  variants: {
    spacing: {
      compact: "py-6 md:py-8",
      normal: "py-8 md:py-12",
      spacious: "py-12 md:py-16",
    },
  },
  defaultVariants: {
    spacing: "normal",
  },
});

interface SectionProps extends VariantProps<typeof sectionSpacingVariants> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  spacing,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionSpacingVariants({ spacing }), className)}
    >
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}
