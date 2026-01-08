import { Section } from "@/components/organisms/section";
import { TrustBadgeCard, Grid } from "@/components/molecules";
import { trustBadges } from "@/data/trust-badge";

export function TrustBadges() {
  return (
    <Section className="border-t border-border/50 bg-muted/20">
      <Grid cols={{ default: 2, md: 3, lg: 6 }} gap="md">
        {trustBadges.map((trustBadge) => (
          <TrustBadgeCard key={trustBadge.id} trustBadge={trustBadge} />
        ))}
      </Grid>
    </Section>
  );
}

