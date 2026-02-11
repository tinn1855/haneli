import type { Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  personalization?: {
    text?: string;
    color?: string;
    font?: string;
  };
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
