"use client";

import Link from "next/link";
import { Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { LanguageSelector } from "../language-select";
import { CurrencySelector } from "../currency-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <section className="border-b py-2 bg-muted/40">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" />
            <address className="not-italic">The United States</address>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector defaultValue="en" className="text-xs" />
            <CurrencySelector defaultValue="usd" className="text-xs" />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Heading
                variant="h4"
                className="font-bold tracking-tight text-primary"
              >
                Hanelia
              </Heading>
            </Link>
          </div>

          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-9 pr-4"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" />
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="User account">
              <User className="size-5" />
            </Button>
          </div>
        </div>
      </section>
    </header>
  );
}
