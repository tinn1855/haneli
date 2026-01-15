"use client";

import { Send } from "lucide-react";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { SectionHeader } from "@/components/molecules";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { FormFieldInput } from "@/components/molecules/form-field-input";
import { FormFieldTextarea } from "@/components/molecules/form-field-textarea";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { contactInfo } from "@/data/contact";
import { useContactForm } from "@/hooks/use-contact-form";

export default function ContactPage() {
  const { form, onSubmit } = useContactForm();

  return (
    <main>
      <Header />
      <Navigation />
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimation direction="up" delay={0.1}>
            <SectionHeader
              subtitle="Get in Touch"
              title="Contact Us"
              description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            />
          </ScrollAnimation>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ScrollAnimation direction="up" delay={0.2}>
              <Card className="rounded-none border border-border/50 bg-background p-8 md:p-10">
                <Heading
                  variant="h3"
                  className="mb-6 text-2xl font-light tracking-wide"
                  as="h3"
                >
                  Send us a Message
                </Heading>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormFieldInput
                          label="Name"
                          placeholder="Your name"
                          field={field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormFieldInput
                          label="Email Address"
                          type="email"
                          placeholder="your.email@example.com"
                          field={field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormFieldInput
                          label="Subject"
                          placeholder="What is this regarding?"
                          field={field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormFieldTextarea
                          label="Message"
                          placeholder="Tell us more about your inquiry..."
                          field={field}
                          rows={6}
                        />
                      )}
                    />

                    <Button
                      type="submit"
                      variant="luxury"
                      size="lg"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 size-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </ScrollAnimation>

            <div className="space-y-6">
              <ScrollAnimation direction="up" delay={0.3}>
                <div>
                  <Heading
                    variant="h3"
                    className="mb-6 text-2xl font-light tracking-wide"
                    as="h3"
                  >
                    Contact Information
                  </Heading>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    Reach out to us through any of these channels. We&apos;re
                    here to help and answer any questions you may have.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <ScrollAnimation
                      key={info.title}
                      direction="fade"
                      delay={0.4 + index * 0.1}
                      duration={0.4}
                    >
                      <Card className="group rounded-none border border-border/50 bg-background p-6 transition-all duration-500 hover:border-foreground/50">
                        <a
                          href={info.href}
                          className="flex items-start gap-4"
                          {...(info.href === "#" && {
                            onClick: (e) => e.preventDefault(),
                          })}
                        >
                          <div className="flex size-12 shrink-0 items-center justify-center border border-border/50 bg-muted/30 transition-all duration-300 group-hover:border-foreground/50 group-hover:bg-foreground/5">
                            <Icon className="size-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1 text-sm font-light tracking-wide text-foreground">
                              {info.title}
                            </h4>
                            <p className="text-sm font-light leading-relaxed text-muted-foreground">
                              {info.content}
                            </p>
                          </div>
                        </a>
                      </Card>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
