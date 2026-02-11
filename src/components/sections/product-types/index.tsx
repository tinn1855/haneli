"use client";

import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductTypeCard,
  CTAButton,
  Grid,
} from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { popularProductTypes } from "@/data/product-type";

export function ProductTypes() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Categories"
          title="Popular Types of Product"
          description="Explore our curated collections of personalized products"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {popularProductTypes.map((productType, index) => (
          <ScrollAnimation
            key={productType.id}
            direction="up"
            delay={0.2 + index * 0.1}
            duration={0.5}
          >
            <ProductTypeCard productType={productType} />
          </ScrollAnimation>
        ))}
      </Grid>

      <ScrollAnimation direction="up" delay={0.5}>
        <CTAButton href="/products" className="mt-8 flex justify-center">
          See all products
        </CTAButton>
      </ScrollAnimation>
    </Section>
  );
}

