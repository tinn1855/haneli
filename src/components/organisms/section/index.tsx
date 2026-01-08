import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}

