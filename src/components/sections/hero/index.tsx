"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingBag, Sparkles, Palette, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  icon?: React.ReactNode;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Personalized Products",
    subtitle: "Design Your Way",
    badge: "New Collection",
    description:
      "Create unique products with your name, logo, or custom design. From t-shirts and bags to accessories - everything can be personalized.",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1920&h=800&fit=crop&q=80",
    buttonText: "Start Designing",
    buttonLink: "/products",
    icon: <Palette className="size-6" />,
  },
  {
    id: 2,
    title: "Meaningful Gifts",
    subtitle: "For Your Loved Ones",
    badge: "Best Seller",
    description:
      "Create special and meaningful gifts with personalized products. Print names, images, or loving messages on any product.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=800&fit=crop&q=80",
    buttonText: "View Collection",
    buttonLink: "/products",
    icon: <Sparkles className="size-6" />,
  },
  {
    id: 3,
    title: "Premium Quality Printing",
    subtitle: "Advanced Technology",
    badge: "Premium",
    description:
      "Using modern printing technology to ensure sharp image quality, vibrant colors, and long-lasting durability for every product.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=800&fit=crop&q=80",
    buttonText: "Learn More",
    buttonLink: "/about",
    icon: <ShoppingBag className="size-6" />,
  },
];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40 z-10" />
                </div>

                {/* Content */}
                <div className="container relative z-20 h-full flex items-center">
                  <div className="max-w-2xl space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {slide.badge && (
                          <Badge variant="secondary" className="gap-1">
                            <Star className="size-3 fill-current" />
                            {slide.badge}
                          </Badge>
                        )}
                        <div className="flex items-center gap-2">
                          {slide.icon && (
                            <div className="text-primary">{slide.icon}</div>
                          )}
                          <p className="text-sm font-medium text-primary uppercase tracking-wider">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                      <Heading
                        variant="display"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                      >
                        {slide.title}
                      </Heading>
                    </div>
                    <p className="text-lg text-foreground/90 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild size="lg" className="gap-2">
                        <Link href={slide.buttonLink}>
                          {slide.buttonText}
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2 bg-background/80 backdrop-blur-sm"
                      >
                        <Link href="/products">
                          <ShoppingBag className="size-4" />
                          Browse All Products
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

