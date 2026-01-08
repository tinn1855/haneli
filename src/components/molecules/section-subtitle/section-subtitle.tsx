import { cn } from "@/lib/utils";

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionSubtitle({
  children,
  className,
}: SectionSubtitleProps) {
  return (
    <p
      className={cn(
        "text-xs font-light tracking-[0.2em] uppercase text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

