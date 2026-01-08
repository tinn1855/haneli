import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { TrustBadge } from "@/types/trust-badge";

interface TrustBadgeCardProps {
  trustBadge: TrustBadge;
  className?: string;
}

export function TrustBadgeCard({ trustBadge, className }: TrustBadgeCardProps) {
  const Icon = trustBadge.icon;

  return (
    <Card
      className={cn(
        "flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50",
        className
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center">
        <Icon className="size-6 text-foreground" />
      </div>
      <h3 className="mb-2 text-sm font-light tracking-wide text-foreground">
        {trustBadge.title}
      </h3>
      <p className="text-xs font-light leading-relaxed text-muted-foreground">
        {trustBadge.description}
      </p>
    </Card>
  );
}

