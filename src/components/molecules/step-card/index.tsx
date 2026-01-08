import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { PersonalizationStep } from "@/types/personalization-step";

interface StepCardProps {
  step: PersonalizationStep;
  className?: string;
}

export function StepCard({ step, className }: StepCardProps) {
  const Icon = step.icon;

  return (
    <Card
      className={cn(
        "relative flex flex-col items-center text-center rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50",
        className
      )}
    >
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
      <h3 className=" text-base font-light tracking-wide text-foreground">
        {step.title}
      </h3>
      <p className="text-sm font-light leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </Card>
  );
}
