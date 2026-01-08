"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { navigationItems } from "@/data/navigation";
import type { NavItem } from "@/types/navigation";

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
        className="text-sm font-light tracking-wide text-foreground transition-colors hover:text-foreground/70"
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
        className="flex items-center gap-1.5 text-sm font-light tracking-wide text-foreground transition-colors hover:text-foreground/70"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-4 w-56 -translate-x-1/2 border border-border/50 bg-background p-2 shadow-lg">
          <nav className="flex flex-col">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-light tracking-wide text-foreground transition-colors hover:bg-muted/50"
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
    <section className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex justify-center">
        <nav className="flex items-center gap-8 lg:gap-12 py-5">
          {navigationItems.map((item) => (
            <NavDropdown key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </section>
  );
}
