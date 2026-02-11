"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { whyChooseUs } from "@/data/about";

export function AboutWhyChoose() {
  return (
    <Section spacing="spacious" className="bg-muted/20">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Why Choose Us"
          title="Your Satisfaction is Our Priority"
          description="Discover the reasons why customers trust and choose our personalization services"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 2, md: 4 }} gap="md">
        {whyChooseUs.map((item, index) => {
          const Icon = item.icon;
          return (
            <ScrollAnimation
              key={item.id}
              direction="fade"
              delay={index * 0.1}
              duration={0.4}
            >
              <Card className="flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50 h-full">
                <div className="mb-4 flex size-12 items-center justify-center">
                  <Icon className="size-6 text-foreground" />
                </div>
                <h3 className="mb-2 text-sm font-light tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </ScrollAnimation>
          );
        })}
      </Grid>
    </Section>
  );
}
