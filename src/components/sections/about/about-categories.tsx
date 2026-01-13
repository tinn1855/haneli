"use client";

import { Section } from "@/components/organisms/section";
import { SectionHeader, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { productCategories } from "@/data/about";

export function AboutCategories() {
  return (
    <Section className="border-t border-border/50 bg-muted/20">
      <ScrollAnimation direction="up" delay={0.1}>
        <SectionHeader
          subtitle="Product Categories"
          title="Diverse Selection"
          description="Explore our personalized product categories for every occasion and need"
        />
      </ScrollAnimation>

      <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
        {productCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <ScrollAnimation
              key={category.id}
              direction="up"
              delay={0.2 + index * 0.1}
              duration={0.5}
            >
              <Card className="relative flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50 h-full cursor-pointer">
                <div className="mb-6 flex size-16 items-center justify-center">
                  <Icon className="size-8 text-foreground" />
                </div>
                <h3 className="text-base font-light tracking-wide text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </Card>
            </ScrollAnimation>
          );
        })}
      </Grid>
    </Section>
  );
}
