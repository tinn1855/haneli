"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SectionSubtitle } from "@/components/molecules";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/schemas";

export function Newsletter() {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    console.log("Newsletter subscription:", data);
    // TODO: Implement newsletter subscription API call
    form.reset();
  };

  return (
    <section className="border-t border-border/50 bg-background py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4">
            <SectionSubtitle>Stay Connected</SectionSubtitle>
          </div>
          <Heading
            variant="h2"
            className="mb-6 text-3xl md:text-4xl font-light tracking-tight"
            as="h2"
          >
            Subscribe to our Newsletter
          </Heading>
          <p className="mb-10 text-sm font-light leading-relaxed text-muted-foreground">
            Get the latest updates on new products and upcoming sales
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 sm:flex-row sm:items-start"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-3 text-center focus-visible:ring-0 focus-visible:border-foreground transition-colors sm:text-left"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="luxury"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
