"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Currency {
  code: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "usd", name: "US Dollar" },
  { code: "eur", name: "Euro" },
  { code: "vnd", name: "Vietnamese Dong" },
];

interface CurrencySelectorProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function CurrencySelector({
  defaultValue = "usd",
  onValueChange,
  className,
}: CurrencySelectorProps) {
  const selectedCurrency = currencies.find(
    (curr) => curr.code === defaultValue
  );

  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Currency">
          <div className="flex items-center gap-2">
            <span>
              {selectedCurrency?.code.toUpperCase() ||
                defaultValue.toUpperCase()}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm flex-1">{currency.name}</span>
              <span className="text-muted-foreground text-xs">
                {currency.code.toUpperCase()}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
