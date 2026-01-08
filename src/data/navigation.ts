import type { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
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

