import type { ProductType } from "@/types/product-type";

export const popularProductTypes: ProductType[] = [
  {
    id: "1",
    name: "Jewelry",
    description: "Personalized necklaces, rings, and bracelets",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&q=90",
    href: "/products/jewelry",
    count: 24,
  },
  {
    id: "2",
    name: "Accessories",
    description: "Wallets, watches, and leather goods",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop&q=90",
    href: "/products/accessories",
    count: 32,
  },
  {
    id: "3",
    name: "Home Decor",
    description: "Photo frames, wall art, and decorative items",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop&q=90",
    href: "/products/home-decor",
    count: 18,
  },
  {
    id: "4",
    name: "Gifts",
    description: "Thoughtful personalized gifts for every occasion",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop&q=90",
    href: "/products/gifts",
    count: 45,
  },
];

