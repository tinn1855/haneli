import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { ContactInfo } from "@/types/contact";

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email",
    content: "hello@hanelia.com",
    href: "mailto:hello@hanelia.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Fashion Street, New York, NY 10001",
    href: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Fri: 9:00 AM - 6:00 PM",
    href: "#",
  },
];
