import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface CardDividerProps {
  children?: React.ReactNode;
  className?: string;
}

export function CardDivider({ children, className }: CardDividerProps) {
  return (
    <div className={cn("pt-4", className)}>
      <Separator className="border-border/30" />
      {children}
    </div>
  );
}
