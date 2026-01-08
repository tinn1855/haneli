import { Heading } from "@/components/ui/heading";
import { SectionSubtitle } from "../section-subtitle";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16 text-center", className)}>
      {subtitle && (
        <div className="mb-4">
          <SectionSubtitle>{subtitle}</SectionSubtitle>
        </div>
      )}
      <Heading
        variant="h2"
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-light tracking-tight",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
