import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function TrustBadge({
  icon: Icon,
  title,
  description,
  className,
}: TrustBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
