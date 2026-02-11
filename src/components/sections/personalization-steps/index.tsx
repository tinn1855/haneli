"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, StepCard, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { personalizationSteps } from "@/data/personalization-step";

export function PersonalizationSteps() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="How It Works"
          title="Personalization in 4 Steps"
          description="Create your perfect personalized product in just a few simple steps"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="lg">
        {personalizationSteps.map((step, index) => (
          <ScrollAnimation
            key={step.id}
            direction="up"
            delay={0.2 + index * 0.1}
            duration={0.5}
          >
            <StepCard step={step} />
          </ScrollAnimation>
        ))}
      </Grid>
    </Section>
  );
}

