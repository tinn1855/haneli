import {
  Truck,
  Shield,
  Headphones,
  Award,
  Lock,
  RefreshCw,
} from "lucide-react";
import type { TrustBadge } from "@/types/trust-badge";

export const trustBadges: TrustBadge[] = [
  {
    id: "1",
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    id: "2",
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    id: "3",
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer care",
  },
  {
    id: "4",
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with excellence",
  },
  {
    id: "5",
    icon: Lock,
    title: "Privacy Protected",
    description: "Your data is safe",
  },
  {
    id: "6",
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

