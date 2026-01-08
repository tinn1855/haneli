"use client";

import { Section } from "../section";
import { SectionHeader, FeedbackCard } from "@/components/molecules";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { feedbacks } from "@/data/feedback";

export function Feedback() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Testimonials"
        title="What Our Customers Say"
        description="Discover the experiences of those who have chosen our personalized products"
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
            {feedbacks.map((feedback) => (
              <CarouselItem
                key={feedback.id}
                className="pl-1 md:pl-2 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <FeedbackCard feedback={feedback} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-12 flex justify-center">
            <CarouselDots count={feedbacks.length} />
          </div>
        </Carousel>
      </div>
    </Section>
  );
}

