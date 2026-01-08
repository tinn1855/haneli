import { Section } from "../section";
import { SectionHeader, OccasionCard } from "@/components/molecules";
import { occasions } from "@/data/occasion";

export function Occasions() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Gift Ideas"
        title="Occasions / Gift Guides"
        description="Find the perfect personalized gift for every special occasion"
      />

      {/* Occasions Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.id} occasion={occasion} />
        ))}
      </div>
    </Section>
  );
}
