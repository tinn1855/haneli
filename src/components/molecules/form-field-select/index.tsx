import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface SelectOption {
  value: string
  label: string
}

interface FormFieldSelectProps {
  label: string
  placeholder?: string
  options: readonly SelectOption[] | SelectOption[]
  field: {
    value: string | undefined
    onChange: (value: string) => void
  }
  labelClassName?: string
  className?: string
}

export function FormFieldSelect({
  label,
  placeholder = "Select an option",
  options,
  field,
  labelClassName,
  className,
}: FormFieldSelectProps) {
  return (
    <FormItem>
      <FormLabel variant="form" className={labelClassName}>
        {label}
      </FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger variant="underline" className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}
