import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../section";
import { SectionHeader, ProductTypeCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { popularProductTypes } from "@/data/product-type";

export function ProductTypes() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Categories"
        title="Popular Types of Product"
        description="Explore our curated collections of personalized products"
      />

      {/* Product Types Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {popularProductTypes.map((productType) => (
          <ProductTypeCard key={productType.id} productType={productType} />
        ))}
      </div>

      {/* See All Products Button */}
      <div className="mt-12 flex justify-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-none border-2 border-foreground bg-transparent px-8 py-6 text-sm font-light tracking-wider uppercase hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <Link href="/products">
            See all products
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

