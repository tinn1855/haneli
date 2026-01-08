import { Heading } from "@/components/ui/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "How long does it take to personalize my product?",
    answer:
      "Our standard personalization process takes 3-5 business days from the time we receive your order. Rush orders can be completed in 1-2 business days for an additional fee. You'll receive a confirmation email with tracking information once your order ships.",
  },
  {
    id: "item-2",
    question: "What personalization options are available?",
    answer:
      "We offer a wide range of personalization options including custom text, names, logos, images, and designs. You can choose from various fonts, colors, and placement options. Our design team can also help create custom graphics for your products.",
  },
  {
    id: "item-3",
    question: "Can I see a preview before placing my order?",
    answer:
      "Yes! Our online design tool allows you to preview your personalized product in real-time before placing your order. You can adjust colors, fonts, sizes, and positioning until you're completely satisfied with the design.",
  },
  {
    id: "item-4",
    question: "What is your return and refund policy?",
    answer:
      "We offer a 30-day return policy for unpersonalized items. Personalized items can be returned if there's a manufacturing defect or error on our part. Custom orders cannot be returned unless there's a quality issue. Please contact our customer service team for assistance with returns.",
  },
  {
    id: "item-5",
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, we offer volume discounts for orders of 10 or more items. Discounts increase with larger quantities. Contact our sales team for a custom quote on bulk orders, and we'll work with you to create the perfect personalized products for your needs.",
  },
  {
    id: "item-6",
    question: "What file formats do you accept for custom designs?",
    answer:
      "We accept various file formats including PNG, JPG, PDF, SVG, and AI files. For best results, we recommend high-resolution images (300 DPI or higher) and vector files for logos. Our design team can help optimize your files if needed.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Heading variant="h2" className="mb-4">
              Frequently Asked Questions
            </Heading>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our personalization services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

