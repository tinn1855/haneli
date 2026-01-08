import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  cols?: {
    default?: 1 | 2 | 3 | 4 | 6;
    md?: 1 | 2 | 3 | 4 | 6;
    lg?: 1 | 2 | 3 | 4 | 6;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
} as const;

const colsMdMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
} as const;

const colsLgMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
} as const;

export function Grid({ children, cols, gap = "md", className }: GridProps) {
  const colsDefault = cols?.default ?? 1;
  const colsMd = cols?.md ?? colsDefault;
  const colsLg = cols?.lg ?? colsMd;

  return (
    <div
      className={cn(
        "grid",
        colsMap[colsDefault],
        colsMdMap[colsMd],
        colsLgMap[colsLg],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

