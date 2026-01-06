import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Shield,
  Truck,
  Headphones,
  LucideIcon,
} from "lucide-react";
import { Heading } from "@/components/ui/heading";

interface LinkItem {
  label: string;
  href: string;
}

interface FooterLinkSection {
  title: string;
  links: LinkItem[];
}

interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

const footerSections: FooterLinkSection[] = [
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

const features: FeatureItem[] = [
  { icon: Truck, text: "Free shipping on orders over $50" },
  { icon: Shield, text: "Secure payment processing" },
  { icon: Headphones, text: "24/7 customer support" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const paymentMethods = [
  { icon: CreditCard, label: "Visa" },
  { icon: CreditCard, label: "Mastercard" },
  { icon: CreditCard, label: "PayPal" },
  { icon: CreditCard, label: "Apple Pay" },
];

function FooterLinkSection({ title, links }: FooterLinkSection) {
  return (
    <div>
      <Heading variant="h6" className="mb-4 text-sm font-semibold" as="h3">
        {title}
      </Heading>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({ icon: Icon, text }: FeatureItem) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-4" />
      <span>{text}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <section className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Heading
                variant="h4"
                className="font-bold tracking-tight text-primary"
              >
                Hanelia
              </Heading>
            </Link>
            <p className="mb-6 text-sm text-muted-foreground max-w-sm">
              Your trusted destination for quality products. We bring you the
              best shopping experience with exceptional service and premium
              selections.
            </p>
            <div className="flex flex-col gap-3">
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <FooterLinkSection key={section.title} {...section} />
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="container py-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Hanelia. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">We accept:</span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded border bg-background p-1.5"
                      title={method.label}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
