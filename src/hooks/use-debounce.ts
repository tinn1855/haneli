"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for debouncing a value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @param onDebounced - Optional callback when the debounced value changes
 * @returns The debounced value
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  onDebounced?: () => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (!isFirstRender.current && onDebounced) {
        onDebounced();
      }
      isFirstRender.current = false;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onDebounced]);

  return debouncedValue;
}
