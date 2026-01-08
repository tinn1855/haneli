import { cn } from "@/lib/utils";
import { BaseCard } from "../base-card";
import { ImageCard } from "../image-card";
import { CardContent } from "../card-content";
import { TYPOGRAPHY } from "@/lib/constants";
import type { Occasion } from "@/types/occasion";

interface OccasionCardProps {
  occasion: Occasion;
  className?: string;
}

export function OccasionCard({ occasion, className }: OccasionCardProps) {
  return (
    <BaseCard href={occasion.href} className={className}>
      <ImageCard
        src={occasion.image}
        alt={occasion.name}
        aspectRatio="4/3"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <CardContent>
        <div className="mb-2 flex-1">
          <h3 className={cn("mb-2", TYPOGRAPHY.title.base, TYPOGRAPHY.title.md)}>
            {occasion.name}
          </h3>
          <p className={TYPOGRAPHY.description}>{occasion.description}</p>
        </div>
      </CardContent>
    </BaseCard>
  );
}

