"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CartItem, CartSummary } from "@/types/cart";
import type { Product } from "@/types/product";

const STORAGE_KEY = "cart";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

type CartContextValue = {
  cart: CartItem[];
  isLoading: boolean;
  isMounted: boolean;
  addItem: (
    product: Product,
    quantity?: number,
    personalization?: CartItem["personalization"]
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSummary: () => CartSummary;
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCart(loadCartFromStorage());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoading, isMounted]);

  const addItem = useCallback(
    (
      product: Product,
      quantity: number = 1,
      personalization?: CartItem["personalization"]
    ) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return prevCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

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

  const removeItem = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getSummary = useCallback((): CartSummary => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal >= 100 ? 0 : 10;
    const discount = subtotal >= 200 ? subtotal * 0.1 : 0;
    const total = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
    };
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const value: CartContextValue = {
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

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (ctx == null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
