"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { companyValues } from "@/data/about";

export function AboutValues() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Our Values"
          title="What We Stand For"
          description="These core values guide everything we do and shape how we serve our customers"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {companyValues.map((value, index) => {
          const Icon = value.icon;
          return (
            <ScrollAnimation
              key={value.id}
              direction="up"
              delay={0.2 + index * 0.1}
              duration={0.5}
            >
              <Card className="relative flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50 h-full">
                <div className="mb-6 flex size-16 items-center justify-center">
                  <Icon className="size-8 text-foreground" />
                </div>
                <h3 className="text-base font-light tracking-wide text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </ScrollAnimation>
          );
        })}
      </Grid>
    </Section>
  );
}
