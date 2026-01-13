import { Truck, Shield, RotateCcw, type LucideIcon } from "lucide-react";

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductTrustBadge {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const productFeatures: ProductFeature[] = [
  {
    title: "Premium Materials",
    description: "Crafted with the finest quality materials",
  },
  {
    title: "Handcrafted",
    description: "Each piece is carefully made by skilled artisans",
  },
  {
    title: "Personalized",
    description: "Customizable with your personal message",
  },
  {
    title: "Gift Ready",
    description: "Beautifully packaged for gifting",
  },
];

export const productTrustBadges: ProductTrustBadge[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export const productDetails = [
  "Premium quality materials",
  "Handcrafted by skilled artisans",
  "Customizable engraving options",
  "Gift-ready packaging included",
];
