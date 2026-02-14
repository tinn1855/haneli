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
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

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
  const { getTotalItems, isMounted: cartMounted } = useCart();
  const { getCount: getWishlistCount, isMounted: wishlistMounted } =
    useWishlist();
  const isMounted = cartMounted && wishlistMounted;
  const cartItemsCount = isMounted ? getTotalItems() : 0;
  const wishlistCount = isMounted ? getWishlistCount() : 0;

  return (
    <header className="w-full border-b border-border/50 bg-background">
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
              className="relative h-10 w-10 transition-colors duration-200"
              aria-label="Wishlist"
              asChild
            >
              <Link
                href="/wishlist"
                className="transition-opacity duration-200 hover:opacity-80"
              >
                <Heart className="size-5 transition-transform duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-light text-background animate-in fade-in-0 zoom-in-95 duration-300">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 transition-colors duration-200"
              aria-label="Shopping cart"
              asChild
            >
              <Link
                href="/cart"
                className="transition-opacity duration-200 hover:opacity-80"
              >
                <ShoppingCart className="size-5 transition-transform duration-200" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-light text-background animate-in fade-in-0 zoom-in-95 duration-300">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            <UserDropdown />
          </div>
        </div>
      </section>
    </header>
  );
}
