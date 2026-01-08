import {
  ShoppingBag,
  Edit3,
  Eye,
  CheckCircle,
} from "lucide-react";
import type { PersonalizationStep } from "@/types/personalization-step";

export const personalizationSteps: PersonalizationStep[] = [
  {
    id: "1",
    step: 1,
    title: "Choose Product",
    description: "Select from our curated collection of personalized products",
    icon: ShoppingBag,
  },
  {
    id: "2",
    step: 2,
    title: "Enter Name / Upload Image",
    description: "Add your personal touch with custom text or upload your image",
    icon: Edit3,
  },
  {
    id: "3",
    step: 3,
    title: "Preview",
    description: "Review your personalized design before placing your order",
    icon: Eye,
  },
  {
    id: "4",
    step: 4,
    title: "Place Order",
    description: "Complete your purchase and receive your personalized product",
    icon: CheckCircle,
  },
];

