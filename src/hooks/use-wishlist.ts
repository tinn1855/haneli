"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";

const STORAGE_KEY = "wishlist";

const loadFromStorage = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Product[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage:", error);
  }
};

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setItems(loadFromStorage());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(items);
    }
  }, [items, isLoading]);

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const getCount = useCallback(() => items.length, [items]);

  return {
    items,
    isLoading,
    isMounted,
    add,
    remove,
    toggle,
    isInWishlist,
    getCount,
  };
}
