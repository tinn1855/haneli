"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  stockText?: string;
  className?: string;
}

export function QuantitySelector({
  value: controlledValue,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  showLabel = true,
  stockText = "In stock, ready to ship",
  className,
}: QuantitySelectorProps) {
  const [internalValue, setInternalValue] = useState(min);
  const value = controlledValue ?? internalValue;

  const handleChange = (delta: number) => {
    const newValue = Math.max(min, Math.min(max, value + delta));
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && <Label>{label}</Label>}
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none rounded-l-md"
            onClick={() => handleChange(-1)}
            disabled={value <= min}
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-12 text-center font-medium">{value}</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none rounded-r-md"
            onClick={() => handleChange(1)}
            disabled={value >= max}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        {stockText && (
          <span className="text-sm text-muted-foreground">{stockText}</span>
        )}
      </div>
    </div>
  );
}
