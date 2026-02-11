"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, CartSummary } from "@/types/cart";
import type { Product } from "@/types/product";

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

export function useCart() {
  // Initialize with empty array to avoid hydration mismatch
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    setCart(loadCartFromStorage());
    setIsLoading(false);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoading]);

  // Add item to cart
  const addItem = useCallback(
    (product: Product, quantity: number = 1, personalization?: CartItem["personalization"]) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product.id === product.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          return prevCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          personalization,
        };

        return [...prevCart, newItem];
      });
    },
    []
  );

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate cart summary
  const getSummary = useCallback((): CartSummary => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Mock shipping calculation (free shipping over $100)
    const shipping = subtotal >= 100 ? 0 : 10;

    // Mock discount (10% off for orders over $200)
    const discount = subtotal >= 200 ? subtotal * 0.1 : 0;

    const total = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
    };
  }, [cart]);

  // Get total items count
  const getTotalItems = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    isLoading,
    isMounted,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getSummary,
    getTotalItems,
  };
}
