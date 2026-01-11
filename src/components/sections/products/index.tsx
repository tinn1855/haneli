"use client";

import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductCard,
  CTAButton,
  Grid,
} from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { featuredProducts } from "@/data/product";

export function Products() {
  return (
    <Section className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Our Collection"
          title="Featured Products"
          description="Discover our curated selection of personalized products crafted with exceptional attention to detail"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {featuredProducts.map((product, index) => (
          <ScrollAnimation
            key={product.id}
            direction="up"
            delay={0.2 + index * 0.1}
            duration={0.5}
          >
            <ProductCard product={product} />
          </ScrollAnimation>
        ))}
      </Grid>

      <ScrollAnimation direction="up" delay={0.5}>
        <CTAButton href="/products" className="mt-8 flex justify-center">
          View All Products
        </CTAButton>
      </ScrollAnimation>
    </Section>
  );
}

