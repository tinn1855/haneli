"use client";

import { Section } from "@/components/organisms/section";
import { TrustBadgeCard, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { trustBadges } from "@/data/trust-badge";

export function TrustBadges() {
  return (
    <Section className="border-t border-border/50 bg-muted/20">
      <Grid cols={{ default: 2, md: 3, lg: 6 }} gap="md">
        {trustBadges.map((trustBadge, index) => (
          <ScrollAnimation
            key={trustBadge.id}
            direction="fade"
            delay={index * 0.1}
            duration={0.4}
          >
            <TrustBadgeCard trustBadge={trustBadge} />
          </ScrollAnimation>
        ))}
      </Grid>
    </Section>
  );
}

