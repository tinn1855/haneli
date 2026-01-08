import { Section } from "../section";
import { TrustBadgeCard } from "@/components/molecules/trust-badge-card";
import { trustBadges } from "@/data/trust-badge";

export function TrustBadges() {
  return (
    <Section className="border-t border-border/50 bg-muted/20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {trustBadges.map((trustBadge) => (
          <TrustBadgeCard key={trustBadge.id} trustBadge={trustBadge} />
        ))}
      </div>
    </Section>
  );
}

