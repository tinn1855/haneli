"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";

export function useContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form:", data);
    form.reset();
    setIsSuccess(true);
    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return {
    form,
    onSubmit,
    isSuccess,
  };
}
