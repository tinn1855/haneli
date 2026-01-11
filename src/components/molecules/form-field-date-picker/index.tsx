import * as React from "react"
import { format } from "date-fns"
import { DatePicker, type DatePickerProps } from "@/components/ui/date-picker"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface FormFieldDatePickerProps
  extends Omit<DatePickerProps, "date" | "onSelect"> {
  label: string
  field: {
    value: string
    onChange: (value: string) => void
  }
  labelClassName?: string
  className?: string
}

export function FormFieldDatePicker({
  label,
  field,
  labelClassName,
  className,
  ...props
}: FormFieldDatePickerProps) {
  const date = field.value ? new Date(field.value) : undefined

  function handleSelect(selectedDate: Date | undefined) {
    if (selectedDate) {
      field.onChange(format(selectedDate, "yyyy-MM-dd"))
    } else {
      field.onChange("")
    }
  }

  return (
    <FormItem>
      <FormLabel variant="form" className={labelClassName}>
        {label}
      </FormLabel>
      <FormControl>
        <DatePicker
          date={date}
          onSelect={handleSelect}
          className={className}
          {...props}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
