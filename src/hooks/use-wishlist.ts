"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";

const STORAGE_KEY = "wishlist";

type WishlistListener = (items: Product[]) => void;

let wishlistItems: Product[] = [];
let initialized = false;
const listeners = new Set<WishlistListener>();
let storageListenerAttached = false;

const loadFromStorage = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Product[]) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Product[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage:", error);
  }
};

const notifyListeners = () => {
  listeners.forEach((listener) => listener(wishlistItems));
};

const handleStorageEvent = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY) return;
  try {
    const nextItems = event.newValue
      ? (JSON.parse(event.newValue) as Product[])
      : [];
    wishlistItems = nextItems;
    notifyListeners();
  } catch (error) {
    console.error("Failed to parse wishlist from storage event:", error);
  }
};

const ensureInitialized = () => {
  if (initialized) return;
  initialized = true;
  wishlistItems = loadFromStorage();

  if (typeof window !== "undefined" && !storageListenerAttached) {
    window.addEventListener("storage", handleStorageEvent);
    storageListenerAttached = true;
  }
};

const subscribe = (listener: WishlistListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const updateWishlist = (updater: (items: Product[]) => Product[]) => {
  ensureInitialized();
  const nextItems = updater(wishlistItems);
  if (nextItems === wishlistItems) {
    return wishlistItems;
  }

  wishlistItems = nextItems;
  saveToStorage(wishlistItems);
  notifyListeners();
  return wishlistItems;
};

export function useWishlist() {
  const [items, setItems] = useState<Product[]>(() =>
    initialized ? wishlistItems : []
  );
  const [isLoading, setIsLoading] = useState(!initialized);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    ensureInitialized();
    setItems(wishlistItems);
    setIsMounted(true);
    setIsLoading(false);

    const unsubscribe = subscribe((nextItems) => {
      setItems(nextItems);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const add = useCallback((product: Product) => {
    updateWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    updateWishlist((prev) => {
      if (!prev.some((p) => p.id === productId)) return prev;
      return prev.filter((p) => p.id !== productId);
    });
  }, []);

  const toggle = useCallback((product: Product) => {
    updateWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const clear = useCallback(() => {
    updateWishlist((prev) => {
      if (prev.length === 0) {
        return prev;
      }
      return [];
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
    clear,
    isInWishlist,
    getCount,
  };
}
