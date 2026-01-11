"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, OccasionCard, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { occasions } from "@/data/occasion";

export function Occasions() {
  return (
    <Section className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Gift Ideas"
          title="Occasions / Gift Guides"
          description="Find the perfect personalized gift for every special occasion"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {occasions.map((occasion, index) => (
          <ScrollAnimation
            key={occasion.id}
            direction="up"
            delay={0.2 + index * 0.1}
            duration={0.5}
          >
            <OccasionCard occasion={occasion} />
          </ScrollAnimation>
        ))}
      </Grid>
    </Section>
  );
}

