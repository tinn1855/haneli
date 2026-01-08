import {
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Shield,
  Truck,
  Headphones,
} from "lucide-react";
import type {
  FooterLinkSection,
  FeatureItem,
  SocialLink,
  PaymentMethod,
} from "@/types/footer";

export const footerSections: FooterLinkSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const features: FeatureItem[] = [
  { icon: Truck, text: "Free shipping on orders over $50" },
  { icon: Shield, text: "Secure payment processing" },
  { icon: Headphones, text: "24/7 customer support" },
];

export const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export const paymentMethods: PaymentMethod[] = [
  { icon: CreditCard, label: "Visa" },
  { icon: CreditCard, label: "Mastercard" },
  { icon: CreditCard, label: "PayPal" },
  { icon: CreditCard, label: "Apple Pay" },
];

