import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormFieldTextareaProps
  extends React.ComponentProps<"textarea"> {
  label: string;
  labelClassName?: string;
  field: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
    name: string;
  };
}

export function FormFieldTextarea({
  label,
  labelClassName,
  className,
  field,
  ...props
}: FormFieldTextareaProps) {
  return (
    <FormItem>
      <FormLabel variant="form" className={labelClassName}>
        {label}
      </FormLabel>
      <FormControl>
        <Textarea
          className={className}
          {...field}
          {...props}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
