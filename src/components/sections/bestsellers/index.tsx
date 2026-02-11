"use client";

import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductCard,
  CTAButton,
  CarouselSection,
} from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { bestsellers } from "@/data/bestsellers";

export function Bestsellers() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Top Picks"
          title="Bestsellers / Trending Products"
          description="Discover our most popular and trending personalized products loved by customers"
        />
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={0.2}>
        <CarouselSection
          dotsCount={bestsellers.length}
          cols={{ default: 1, md: 2, lg: 4 }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CarouselSection>
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={0.3}>
        <CTAButton href="/products/bestsellers" className="mt-8 flex justify-center">
          View All Bestsellers
        </CTAButton>
      </ScrollAnimation>
    </Section>
  );
}

