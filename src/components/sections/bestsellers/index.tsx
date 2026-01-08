"use client";

import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductCard,
  CTAButton,
  CarouselSection,
} from "@/components/molecules";
import { bestsellers } from "@/data/bestsellers";

export function Bestsellers() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Top Picks"
        title="Bestsellers / Trending Products"
        description="Discover our most popular and trending personalized products loved by customers"
      />

      <CarouselSection
        dotsCount={bestsellers.length}
        cols={{ default: 1, md: 2, lg: 4 }}
      >
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CarouselSection>

      <CTAButton href="/products/bestsellers" className="mt-8 flex justify-center">
        View All Bestsellers
      </CTAButton>
    </Section>
  );
}

