"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, FeedbackCard, CarouselSection } from "@/components/molecules";
import { feedbacks } from "@/data/feedback";

export function Feedback() {
  return (
    <Section className="bg-background">
      <SectionHeader
        subtitle="Testimonials"
        title="What Our Customers Say"
        description="Discover the experiences of those who have chosen our personalized products"
      />

      <CarouselSection
        dotsCount={feedbacks.length}
        cols={{ default: 1, md: 2, lg: 3 }}
      >
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </CarouselSection>
    </Section>
  );
}

