import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductCard,
  CTAButton,
  Grid,
} from "@/components/molecules";
import { featuredProducts } from "@/data/product";

export function Products() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Our Collection"
        title="Featured Products"
        description="Discover our curated selection of personalized products crafted with exceptional attention to detail"
      />

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>

      <CTAButton href="/products" className="mt-8 flex justify-center">
        View All Products
      </CTAButton>
    </Section>
  );
}

