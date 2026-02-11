"use client";

import { Section } from "@/components/organisms/section";
import { Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Card } from "@/components/ui/card";
import { missionStatement, visionStatement } from "@/data/about";
import { Target, Eye } from "lucide-react";

export function AboutMission() {
  return (
    <Section spacing="spacious" className="bg-muted/20">
      <Grid cols={{ default: 1, md: 2 }} gap="md">
        <ScrollAnimation direction="up" delay={0.1}>
          <Card className="rounded-none border border-border/50 bg-background p-8 md:p-10 lg:p-12 transition-all duration-500 hover:border-foreground/50 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex size-12 items-center justify-center">
                <Target className="size-6 text-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground">
                {missionStatement.title}
              </h3>
            </div>
            <p className="text-sm md:text-base font-light leading-relaxed text-muted-foreground">
              {missionStatement.description}
            </p>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <Card className="rounded-none border border-border/50 bg-background p-8 md:p-10 lg:p-12 transition-all duration-500 hover:border-foreground/50 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex size-12 items-center justify-center">
                <Eye className="size-6 text-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground">
                {visionStatement.title}
              </h3>
            </div>
            <p className="text-sm md:text-base font-light leading-relaxed text-muted-foreground">
              {visionStatement.description}
            </p>
          </Card>
        </ScrollAnimation>
      </Grid>
    </Section>
  );
}
