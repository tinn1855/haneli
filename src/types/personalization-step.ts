import type { LucideIcon } from "lucide-react";

// Personalization Step types
export interface PersonalizationStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

