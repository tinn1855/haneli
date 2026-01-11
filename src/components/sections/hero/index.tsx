"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { heroSlides } from "@/data/hero";

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
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full">
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
                  <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
                </div>

                {/* Content */}
                <div className="container relative z-20 h-full flex items-center justify-center">
                  <motion.div
                    className="max-w-4xl text-center space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.p
                      className="text-sm font-light tracking-[0.2em] uppercase text-foreground/80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Heading
                        variant="display"
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none"
                      >
                        {slide.title}
                      </Heading>
                    </motion.div>
                    <motion.p
                      className="mx-auto max-w-2xl text-lg md:text-xl font-light leading-relaxed text-foreground/90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Button
                        asChild
                        variant="luxury"
                        size="xl"
                      >
                        <Link href={slide.buttonLink}>
                          {slide.buttonText}
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8 border-0 bg-white/10 backdrop-blur-md hover:bg-white/20" />
        <CarouselNext className="right-8 border-0 bg-white/10 backdrop-blur-md hover:bg-white/20" />
      </Carousel>
    </section>
  );
}
