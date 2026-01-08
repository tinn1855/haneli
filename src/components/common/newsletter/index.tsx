"use client";

import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionSubtitle } from "@/components/molecules";

export function Newsletter() {
  return (
    <section className="border-t border-border/50 bg-background py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4">
            <SectionSubtitle>Stay Connected</SectionSubtitle>
          </div>
          <Heading
            variant="h2"
            className="mb-6 text-3xl md:text-4xl font-light tracking-tight"
            as="h2"
          >
            Subscribe to our Newsletter
          </Heading>
          <p className="mb-10 text-sm font-light leading-relaxed text-muted-foreground">
            Get the latest updates on new products and upcoming sales
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Email"
              className="flex-1 rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-3 text-center focus-visible:ring-0 focus-visible:border-foreground transition-colors sm:text-left"
            />
            <Button variant="luxury" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
