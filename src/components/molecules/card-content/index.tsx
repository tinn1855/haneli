import { cn } from "@/lib/utils";
import { CardContent as ShadcnCardContent } from "@/components/ui/card";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <ShadcnCardContent className={cn("flex flex-1 flex-col border-t border-border/50 p-6", className)}>
      {children}
    </ShadcnCardContent>
  );
}

