import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../section";
import { SectionHeader, ProductCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/data/product";

export function Products() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Our Collection"
        title="Featured Products"
        description="Discover our curated selection of personalized products crafted with exceptional attention to detail"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-none border-2 border-foreground bg-transparent px-8 py-6 text-sm font-light tracking-wider uppercase hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <Link href="/products">
            View All Products
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

