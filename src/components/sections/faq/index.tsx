import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/organisms/section";
import { SectionHeader } from "@/components/molecules";
import { faqItems } from "@/data/faq";

export function FAQ() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          subtitle="Customer Care"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our personalization services"
        />

        <Accordion type="single" collapsible className="w-full space-y-1">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
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
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
