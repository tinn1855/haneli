import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon = Check,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border bg-background p-4",
        className
      )}
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
