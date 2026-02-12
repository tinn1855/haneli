"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type ToastType = "success" | "error" | "info";

const TOAST_EXIT_DURATION = 350;

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [entered, setEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Enter: after mount transition in from right
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-close after duration
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => setIsExiting(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  // Exit: after animation call onClose (ref so parent re-renders don't reset the timer)
  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(() => onCloseRef.current?.(), TOAST_EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [isExiting]);

  const handleClose = () => {
    if (isExiting) return;
    setIsExiting(true);
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  };

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border p-4 shadow-lg transition-all duration-300 ease-out",
        styles[type],
        entered && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
      style={{ transitionDuration: isExiting ? `${TOAST_EXIT_DURATION}ms` : "300ms" }}
      role="alert"
    >
      <Icon className="size-5 shrink-0" />
      <p className="text-sm font-light">{message}</p>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0 hover:bg-transparent transition-opacity duration-200 hover:opacity-70"
        onClick={handleClose}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type?: ToastType }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-[min(calc(100vw-2rem),24rem)]"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
