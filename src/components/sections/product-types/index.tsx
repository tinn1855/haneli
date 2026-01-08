import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductTypeCard,
  CTAButton,
  Grid,
} from "@/components/molecules";
import { popularProductTypes } from "@/data/product-type";

export function ProductTypes() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Categories"
        title="Popular Types of Product"
        description="Explore our curated collections of personalized products"
      />

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {popularProductTypes.map((productType) => (
          <ProductTypeCard key={productType.id} productType={productType} />
        ))}
      </Grid>

      <CTAButton href="/products" className="mt-8 flex justify-center">
        See all products
      </CTAButton>
    </Section>
  );
}

