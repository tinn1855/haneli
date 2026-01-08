"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { LanguageSelector } from "../language-select";
import { CurrencySelector } from "../currency-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Assume user is not logged in for now
  const isLoggedIn = false;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    if (
      containerRef.current &&
      relatedTarget &&
      !containerRef.current.contains(relatedTarget)
    ) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  if (isLoggedIn) {
    return (
      <Button variant="ghost" size="icon" aria-label="User account" asChild>
        <Link href="/account">
          <User className="size-5" />
        </Link>
      </Button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User account">
            <User className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40"
          sideOffset={4}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DropdownMenuItem asChild>
            <Link href="/sign-in">Sign In</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sign-up">Sign Up</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Header() {
  return (
    <header className="w-full border-b border-border/50 bg-background">
      <section className="border-b border-border/30 py-3">
        <div className="container flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-3.5" />
            <address className="not-italic font-light">
              Lincoln- 344, Illinois, Chicago, USA
            </address>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector defaultValue="en" className="text-xs" />
            <CurrencySelector defaultValue="usd" className="text-xs" />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Heading
                variant="h3"
                className="text-2xl font-light tracking-[0.15em] uppercase"
              >
                Hanelia
              </Heading>
            </Link>
          </div>

          <div className="relative flex-1 max-w-md mx-12">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full border-0 border-b border-border/50 rounded-none bg-transparent pl-10 pr-4 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-light text-background">
                0
              </span>
            </Button>
            <UserDropdown />
          </div>
        </div>
      </section>
    </header>
  );
}
