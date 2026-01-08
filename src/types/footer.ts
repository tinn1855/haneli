import type { LucideIcon } from "lucide-react";

// Footer types
export interface LinkItem {
  label: string;
  href: string;
}

export interface FooterLinkSection {
  title: string;
  links: LinkItem[];
}

export interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface PaymentMethod {
  icon: LucideIcon;
  label: string;
}

