"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products/new" },
      { label: "Best Sellers", href: "/products/bestsellers" },
      { label: "Sale", href: "/products/sale" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Policy", href: "/policy" },
  { label: "Contact", href: "/contact" },
];

function NavDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm font-medium text-foreground transition-colors hover:text-primary"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
      >
        {item.label}
        <ChevronDown
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
          <nav className="flex flex-col">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setIsOpen(false)}
                className="rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {child.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  return (
    <section className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex justify-center">
        <nav className="flex items-center gap-4 lg:gap-10 py-4">
          {navigationItems.map((item) => (
            <NavDropdown key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </section>
  );
}
