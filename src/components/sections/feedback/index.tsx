"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, FeedbackCard, CarouselSection } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { feedbacks } from "@/data/feedback";

export function Feedback() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Customers Say"
          description="Discover the experiences of those who have chosen our personalized products"
        />
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={0.2}>
        <CarouselSection
          dotsCount={feedbacks.length}
          cols={{ default: 1, md: 2, lg: 3 }}
        >
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </CarouselSection>
      </ScrollAnimation>
    </Section>
  );
}

