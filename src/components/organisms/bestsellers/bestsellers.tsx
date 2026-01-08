"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../section";
import { SectionHeader, ProductCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { bestsellers } from "@/data/bestsellers";

export function Bestsellers() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Top Picks"
        title="Bestsellers / Trending Products"
        description="Discover our most popular and trending personalized products loved by customers"
      />

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 md:-ml-2">
            {bestsellers.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 md:pl-2 basis-full md:basis-1/2 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-12 flex justify-center">
            <CarouselDots count={bestsellers.length} />
          </div>
        </Carousel>
      </div>

      {/* View All Button */}
      <div className="mt-8 flex justify-center">
        <Button
          asChild
          variant="luxury"
          size="xl"
        >
          <Link href="/products/bestsellers">
            View All Bestsellers
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
