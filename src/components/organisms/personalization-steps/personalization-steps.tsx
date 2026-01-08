import { Section } from "../section";
import { SectionHeader, StepCard } from "@/components/molecules";
import { personalizationSteps } from "@/data/personalization-step";

export function PersonalizationSteps() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="How It Works"
        title="Personalization in 4 Steps"
        description="Create your perfect personalized product in just a few simple steps"
      />

      {/* Steps Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {personalizationSteps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
}

