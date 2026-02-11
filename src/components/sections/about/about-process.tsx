"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { processSteps } from "@/data/about";

export function AboutProcess() {
  return (
    <Section spacing="compact" className="bg-background">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="How It Works"
          title="Simple & Quick Process"
          description="Create your perfect personalized product in just 4 easy steps"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollAnimation
              key={step.id}
              direction="up"
              delay={0.2 + index * 0.1}
              duration={0.5}
            >
              <Card className="relative flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex size-8 items-center justify-center rounded-full border border-border/50 bg-background text-xs font-light tracking-wide text-foreground">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4 flex size-16 items-center justify-center">
                  <Icon className="size-8 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-base font-light tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Card>
            </ScrollAnimation>
          );
        })}
      </Grid>
    </Section>
  );
}
