import Link from "next/link";
import { Heading } from "@/components/ui/heading";

import {
  footerSections,
  features,
  socialLinks,
  paymentMethods,
} from "@/data/footer";
import type { FooterLinkSection, FeatureItem } from "@/types/footer";

function FooterLinkSection({ title, links }: FooterLinkSection) {
  return (
    <div>
      <Heading
        variant="h6"
        className="mb-6 text-xs font-light tracking-[0.15em] uppercase"
        as="h3"
      >
        {title}
      </Heading>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
    <div className="flex items-center gap-3 text-sm font-light text-muted-foreground">
      <Icon className="size-4" />
      <span>{text}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Heading
                variant="h3"
                className="text-2xl font-light tracking-[0.15em] uppercase"
              >
                Hanelia
              </Heading>
            </Link>
            <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
              Your trusted destination for quality products. We bring you the
              best shopping experience with exceptional service and premium
              selections.
            </p>
            <div className="flex flex-col gap-4">
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

      <section className="border-t border-border/50">
        <div className="container py-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <p className="text-xs font-light tracking-wide text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Hanelia. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs font-light tracking-wide text-muted-foreground">
                Follow Us
              </span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-light tracking-wide text-muted-foreground">
                We accept
              </span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center border border-border/50 bg-background p-2"
                      title={method.label}
                    >
                      <Icon className="size-3.5 text-muted-foreground" />
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
