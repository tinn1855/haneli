"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/organisms/section";
import { SectionHeader } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { faqItems } from "@/data/faq";

export function FAQ() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <ScrollAnimation direction="up" delay={0.1}>
          <SectionHeader
            subtitle="Customer Care"
            title="Frequently Asked Questions"
            description="Find answers to common questions about our personalization services"
          />
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <Accordion type="single" collapsible className="w-full space-y-1">
            {faqItems.map((item, index) => (
              <ScrollAnimation
                key={item.id}
                direction="fade"
                delay={0.3 + index * 0.05}
                duration={0.4}
              >
                <AccordionItem
                  value={item.id}
                  className="border-b border-border/50"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-light tracking-wide hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm font-light leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollAnimation>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>
    </Section>
  );
}
