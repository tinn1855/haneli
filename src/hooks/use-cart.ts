"use client";

import { useCartContext } from "@/contexts/cart-context";

/**
 * Cart hook – reads from CartContext. Must be used inside CartProvider.
 * Số giỏ hàng trên header cập nhật ngay khi add/remove từ bất kỳ trang nào.
 */
export function useCart() {
  return useCartContext();
}
