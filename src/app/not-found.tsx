"use client";

import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { Heading } from "@/components/ui/heading";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function NotFound() {
  return (
    <main>
      <Header />
      <Navigation />
      <Section className="min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollAnimation direction="fade" delay={0.1}>
            <div className="mb-8">
              <Heading variant="display" as="h1">
                404
              </Heading>
              <Heading variant="h1" as="h1">
                Page Not Found
              </Heading>
            </div>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Please check the URL or return to the homepage.
            </p>
          </ScrollAnimation>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
