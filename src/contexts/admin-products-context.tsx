"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import type { Product } from "@/types/product";
import { featuredProducts } from "@/data/product";
import { bestsellers } from "@/data/bestsellers";

const STORAGE_KEY = "admin-products";

const initialProducts: Product[] = [
  ...featuredProducts,
  ...bestsellers,
].filter(
  (product, index, self) => self.findIndex((p) => p.id === product.id) === index
);

function loadFromStorage(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Product[];
      return Array.isArray(parsed) ? parsed : initialProducts;
    }
  } catch {
    // ignore
  }
  return initialProducts;
}

function saveToStorage(products: Product[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }
}

type AdminProductsContextValue = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  resetToDefault: () => void;
};

const AdminProductsContext = createContext<
  AdminProductsContextValue | undefined
>(undefined);

export function AdminProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setProducts(loadFromStorage());
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...product, id };
    setProducts((prev) => {
      const next = [...prev, newProduct];
      saveToStorage(next);
      return next;
    });
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage(next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const resetToDefault = useCallback(() => {
    setProducts(initialProducts);
    saveToStorage(initialProducts);
  }, []);

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      resetToDefault,
    }),
    [
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      resetToDefault,
    ]
  );

  return (
    <AdminProductsContext.Provider value={value}>
      {children}
    </AdminProductsContext.Provider>
  );
}

export function useAdminProducts() {
  const ctx = useContext(AdminProductsContext);
  if (!ctx) {
    throw new Error("useAdminProducts must be used within AdminProductsProvider");
  }
  return ctx;
}
