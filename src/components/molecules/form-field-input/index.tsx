import * as React from "react"
import { Input, type InputProps } from "@/components/ui/input"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface FormFieldInputProps extends Omit<InputProps, "variant"> {
  label: string
  labelClassName?: string
  field: {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    name: string
  }
}

export function FormFieldInput({
  label,
  labelClassName,
  className,
  field,
  ...props
}: FormFieldInputProps) {
  return (
    <FormItem>
      <FormLabel variant="form" className={labelClassName}>
        {label}
      </FormLabel>
      <FormControl>
        <Input variant="underline" className={className} {...field} {...props} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
