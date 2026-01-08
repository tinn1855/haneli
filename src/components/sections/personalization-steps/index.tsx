import { Section } from "@/components/organisms/section";
import { SectionHeader, StepCard, Grid } from "@/components/molecules";
import { personalizationSteps } from "@/data/personalization-step";

export function PersonalizationSteps() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="How It Works"
        title="Personalization in 4 Steps"
        description="Create your perfect personalized product in just a few simple steps"
      />

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="lg">
        {personalizationSteps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </Grid>
    </Section>
  );
}

