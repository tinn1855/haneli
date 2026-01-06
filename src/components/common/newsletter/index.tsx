"use client";

import { Mail } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <Heading variant="h6" className="mb-2 text-sm font-semibold" as="h3">
              Subscribe to Newsletter
            </Heading>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new products and upcoming sales
            </p>
          </div>
          <form className="flex gap-2 md:w-[400px]">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button type="submit" size="default">
              <Mail className="size-4" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

