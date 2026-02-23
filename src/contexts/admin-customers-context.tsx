"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import type { Customer } from "@/types/customer";
import { initialCustomers } from "@/data/customer";

const STORAGE_KEY = "admin-customers";

function loadFromStorage(): Customer[] {
  if (typeof window === "undefined") return initialCustomers;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Customer[];
      return Array.isArray(parsed) ? parsed : initialCustomers;
    }
  } catch {
    // ignore
  }
  return initialCustomers;
}

function saveToStorage(customers: Customer[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch {
    // ignore
  }
}

type AdminCustomersContextValue = {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id">) => Customer;
  addCustomers: (customers: Omit<Customer, "id">[]) => Customer[];
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  deleteCustomers: (ids: string[]) => void;
  getCustomer: (id: string) => Customer | undefined;
  resetToDefault: () => void;
};

const AdminCustomersContext = createContext<
  AdminCustomersContextValue | undefined
>(undefined);

export function AdminCustomersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  useEffect(() => {
    setCustomers(loadFromStorage());
  }, []);

  const addCustomer = useCallback((customer: Omit<Customer, "id">) => {
    const id = `cust-${Date.now()}`;
    const newCustomer: Customer = { ...customer, id };
    setCustomers((prev) => {
      const next = [...prev, newCustomer];
      saveToStorage(next);
      return next;
    });
    return newCustomer;
  }, []);

  const addCustomers = useCallback((toAdd: Omit<Customer, "id">[]) => {
    const base = Date.now();
    const newCustomers: Customer[] = toAdd.map((c, i) => ({
      ...c,
      id: `cust-${base}-${i}`,
    }));
    setCustomers((prev) => {
      const next = [...prev, ...newCustomers];
      saveToStorage(next);
      return next;
    });
    return newCustomers;
  }, []);

  const updateCustomer = useCallback(
    (id: string, updates: Partial<Customer>) => {
      setCustomers((prev) => {
        const next = prev.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        saveToStorage(next);
        return next;
      });
    },
    []
  );

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const deleteCustomers = useCallback((ids: string[]) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    setCustomers((prev) => {
      const next = prev.filter((c) => !idSet.has(c.id));
      saveToStorage(next);
      return next;
    });
  }, []);

  const getCustomer = useCallback(
    (id: string) => customers.find((c) => c.id === id),
    [customers]
  );

  const resetToDefault = useCallback(() => {
    setCustomers(initialCustomers);
    saveToStorage(initialCustomers);
  }, []);

  const value = useMemo(
    () => ({
      customers,
      addCustomer,
      addCustomers,
      updateCustomer,
      deleteCustomer,
      deleteCustomers,
      getCustomer,
      resetToDefault,
    }),
    [
      customers,
      addCustomer,
      addCustomers,
      updateCustomer,
      deleteCustomer,
      deleteCustomers,
      getCustomer,
      resetToDefault,
    ]
  );

  return (
    <AdminCustomersContext.Provider value={value}>
      {children}
    </AdminCustomersContext.Provider>
  );
}

export function useAdminCustomers() {
  const ctx = useContext(AdminCustomersContext);
  if (!ctx) {
    throw new Error(
      "useAdminCustomers must be used within AdminCustomersProvider"
    );
  }
  return ctx;
}
