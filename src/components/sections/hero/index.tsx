"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SafeLink } from "@/components/ui/safe-link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/hero";
import type { CarouselApi } from "@/components/ui/carousel";
import { Heading } from "@/components/ui/heading";
import { Subtitle } from "@/components/ui/subtitle";

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    queueMicrotask(onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative min-h-[85vh] w-full flex items-center">
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70"
                    aria-hidden
                  />
                </div>

                <div className="container relative z-10 flex items-center justify-center py-24 md:py-32">
                  <div className="max-w-3xl text-center mx-auto">
                    <Subtitle variant="hero" className="mb-6">
                      {slide.subtitle}
                    </Subtitle>
                    <Heading variant="display" className="text-white">
                      {slide.title}
                    </Heading>
                    <p className="mt-6 text-base text-white/85 leading-relaxed md:text-lg max-w-xl mx-auto">
                      {slide.description}
                    </p>
                    <div className="mt-10 flex justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-none border border-white/80 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-light tracking-wide px-8"
                      >
                        <SafeLink
                          href={slide.buttonLink}
                          className="inline-flex items-center gap-2 group/btn"
                        >
                          {slide.buttonText}
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </SafeLink>
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/60 to-transparent pointer-events-none"
                  aria-hidden
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8 size-10 rounded-none border border-white/20 bg-transparent text-white opacity-100 hover:bg-white/10 hover:border-white/40 hover:text-white focus:opacity-100" />
        <CarouselNext className="right-4 md:right-8 size-10 rounded-none border border-white/20 bg-transparent text-white opacity-100 hover:bg-white/10 hover:border-white/40 hover:text-white focus:opacity-100" />
      </Carousel>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 ${
              selectedIndex === i
                ? "h-0.5 w-10 bg-white"
                : "h-px w-8 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
