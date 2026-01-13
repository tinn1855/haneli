"use client";

import { Section } from "@/components/organisms/section";
import { Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { aboutStats } from "@/data/about";

export function AboutStats() {
  return (
    <Section className="border-t border-border/50 bg-background">
      <Grid cols={{ default: 2, md: 4 }} gap="md">
        {aboutStats.map((stat, index) => (
          <ScrollAnimation
            key={stat.id}
            direction="fade"
            delay={index * 0.1}
            duration={0.4}
          >
            <Card className="flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50">
              <div className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-light tracking-wide text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          </ScrollAnimation>
        ))}
      </Grid>
    </Section>
  );
}
