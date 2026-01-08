import { Section } from "@/components/organisms/section";
import { SectionHeader, OccasionCard, Grid } from "@/components/molecules";
import { occasions } from "@/data/occasion";

export function Occasions() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Gift Ideas"
        title="Occasions / Gift Guides"
        description="Find the perfect personalized gift for every special occasion"
      />

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.id} occasion={occasion} />
        ))}
      </Grid>
    </Section>
  );
}

