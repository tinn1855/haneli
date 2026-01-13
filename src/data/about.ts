import {
  Heart,
  Gem,
  PenTool,
  Sparkles,
  Shield,
  Clock,
  Gift,
  Award,
  Package,
  Truck,
  Palette,
  type LucideIcon,
} from "lucide-react";

export interface CompanyValue {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface WhyChooseUs {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutStats {
  id: number;
  value: string;
  label: string;
}

export interface ProductCategory {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aboutHero = {
  subtitle: "About Us",
  title: "Crafting Unique Personalized Products",
  description:
    "We specialize in creating one-of-a-kind personalized products that carry your unique touch. From meaningful gifts to memorable keepsakes, every item is carefully designed and crafted to become the perfect present.",
};

export const missionStatement = {
  title: "Our Mission",
  description:
    "To empower everyone to create products with a personal touch, transforming ordinary moments into unforgettable memories. We believe every personalized gift carries a story, a message, and a special sentiment.",
};

export const visionStatement = {
  title: "Our Vision",
  description:
    "To become the leading destination for personalized products, where creativity meets craftsmanship to create meaningful and truly unique gifts that last a lifetime.",
};

export const companyValues: CompanyValue[] = [
  {
    id: 1,
    icon: PenTool,
    title: "Custom Design",
    description:
      "Each product is designed according to your ideas and wishes, ensuring absolute uniqueness.",
  },
  {
    id: 2,
    icon: Gem,
    title: "Premium Materials",
    description:
      "We use high-quality materials that stand the test of time, worthy of your precious memories.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Crafted with Care",
    description:
      "Our skilled artisans pay attention to every small detail, delivering perfect products.",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Modern Technology",
    description:
      "Combining traditional craftsmanship with advanced printing and laser engraving technology.",
  },
];

export const whyChooseUs: WhyChooseUs[] = [
  {
    id: 1,
    icon: Palette,
    title: "100% Personalized",
    description:
      "Full creative freedom with names, images, and messages on every product.",
  },
  {
    id: 2,
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "Product warranty and money-back guarantee if not satisfied with quality.",
  },
  {
    id: 3,
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Production time of 2-5 days with nationwide delivery in 1-3 days.",
  },
  {
    id: 4,
    icon: Gift,
    title: "Gift Packaging",
    description:
      "Elegant gift wrapping service with custom greeting cards on request.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    step: 1,
    icon: Package,
    title: "Choose Product",
    description:
      "Browse our diverse collection and select the product that fits your needs.",
  },
  {
    id: 2,
    step: 2,
    icon: PenTool,
    title: "Personalize",
    description:
      "Add names, images, messages, or custom designs to create something unique.",
  },
  {
    id: 3,
    step: 3,
    icon: Award,
    title: "Expert Crafting",
    description:
      "Our skilled artisans execute every detail with care and dedication.",
  },
  {
    id: 4,
    step: 4,
    icon: Truck,
    title: "Safe Delivery",
    description:
      "Products are carefully packaged and delivered right to your doorstep.",
  },
];

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    icon: Gift,
    title: "Personal Gifts",
    description: "Keychains, phone cases, mugs, custom printed t-shirts.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Love & Romance",
    description: "Photo albums, puzzle art, engraved jewelry for loved ones.",
  },
  {
    id: 3,
    icon: Award,
    title: "Corporate Gifts",
    description:
      "Company gifts, employee rewards, customer appreciation items.",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Special Occasions",
    description: "Birthday, wedding, graduation, and celebration keepsakes.",
  },
];

export const aboutStats: AboutStats[] = [
  {
    id: 1,
    value: "50K+",
    label: "Products Created",
  },
  {
    id: 2,
    value: "100+",
    label: "Design Templates",
  },
  {
    id: 3,
    value: "99%",
    label: "Happy Customers",
  },
  {
    id: 4,
    value: "24/7",
    label: "Support Available",
  },
];
