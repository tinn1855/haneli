"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean | ((date: Date) => boolean);
  fromYear?: number;
  toYear?: number;
  maxDate?: Date;
  minDate?: Date;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Select date",
  className,
  disabled,
  fromYear,
  toYear,
  maxDate,
  minDate,
  captionLayout = "dropdown",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(selectedDate: Date | undefined) {
    onSelect?.(selectedDate);
    setOpen(false);
  }

  function isDateDisabled(checkDate: Date): boolean {
    if (typeof disabled === "function") {
      return disabled(checkDate);
    }
    if (disabled === true) {
      return true;
    }
    if (maxDate && checkDate > maxDate) {
      return true;
    }
    if (minDate && checkDate < minDate) {
      return true;
    }
    return false;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="underline"
          data-empty={!date}
          className={className}
        >
          <span>{date ? format(date, "PPP") : placeholder}</span>
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={isDateDisabled}
          captionLayout={captionLayout}
          fromYear={fromYear}
          toYear={toYear}
        />
      </PopoverContent>
    </Popover>
  );
}
