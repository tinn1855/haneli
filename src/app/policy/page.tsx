"use client";

import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { SectionHeader } from "@/components/molecules";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Separator } from "@/components/ui/separator";
import { policies } from "@/data/policy";

export default function PolicyPage() {
  return (
    <main>
      <Header />
      <Navigation />
      <Section spacing="spacious">
        <div className="mx-auto max-w-4xl">
          <ScrollAnimation direction="up" delay={0.1}>
            <SectionHeader
              subtitle="Legal Information"
              title="Policies & Terms"
              description="Please review our policies and terms to understand how we operate and protect your rights."
            />
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.2}>
            <Tabs defaultValue={policies[0]?.id} className="mt-12">
              <TabsList variant="underline" className="mb-8">
                {policies.map((policy) => (
                  <TabsTrigger
                    key={policy.id}
                    value={policy.id}
                    variant="underline"
                  >
                    {policy.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {policies.map((policy) => (
                <TabsContent
                  key={policy.id}
                  value={policy.id}
                  className="mt-8 space-y-8"
                >
                  <div>
                    <Heading
                      variant="h2"
                      className="mb-4 text-3xl font-light tracking-tight"
                      as="h2"
                    >
                      {policy.title}
                    </Heading>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">
                      {policy.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-12">
                    {policy.sections.map((section, index) => (
                      <ScrollAnimation
                        key={section.id}
                        direction="fade"
                        delay={0.3 + index * 0.1}
                        duration={0.4}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Heading
                              variant="h3"
                              className="text-xl font-light tracking-wide"
                              as="h3"
                            >
                              {section.title}
                            </Heading>
                            <span className="text-xs font-light text-muted-foreground">
                              Last updated: {section.lastUpdated}
                            </span>
                          </div>
                          <div className="space-y-3">
                            {section.content.map((paragraph, pIndex) => (
                              <p
                                key={pIndex}
                                className="text-sm font-light leading-relaxed text-muted-foreground"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          {index < policy.sections.length - 1 && (
                            <Separator className="mt-8" />
                          )}
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </ScrollAnimation>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
