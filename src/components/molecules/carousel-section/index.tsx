"use client";

import { Children } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

interface CarouselSectionProps {
  children: React.ReactNode;
  itemClassName?: string;
  dotsCount: number;
  className?: string;
  cols?: {
    default?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
}

export function CarouselSection({
  children,
  itemClassName,
  dotsCount,
  className,
  cols = { default: 1, md: 2, lg: 3 },
}: CarouselSectionProps) {
  const colsLg = cols.lg ?? cols.md ?? cols.default ?? 3;
  const colsMd = cols.md ?? cols.default ?? 2;

  const getBasisClass = () => {
    if (colsLg === 4) return "basis-full md:basis-1/2 lg:basis-1/4";
    if (colsLg === 3) return "basis-full md:basis-1/2 lg:basis-1/3";
    if (colsMd === 2) return "basis-full md:basis-1/2";
    return "basis-full";
  };

  return (
    <div className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {Children.map(children, (child, index) => (
            <CarouselItem
              key={index}
              className={cn("pl-1 md:pl-2", getBasisClass(), itemClassName)}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center">
          <CarouselDots count={dotsCount} />
        </div>
      </Carousel>
    </div>
  );
}

