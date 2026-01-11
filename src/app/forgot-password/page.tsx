"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FormFieldInput } from "@/components/molecules/form-field-input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/schemas";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password:", data);
    // TODO: Implement forgot password API call
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <Link href="/" className="inline-block">
              <Heading variant="h1">Hanelia</Heading>
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-light text-muted-foreground">
                Check your email
              </p>
              <p className="text-sm font-light text-muted-foreground">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-foreground">
                  {form.getValues("email")}
                </span>
              </p>
              <p className="text-sm font-light text-muted-foreground mt-4">
                Didn&apos;t receive the email? Check your spam folder or try
                again.
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <Button
                variant="luxury"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Resend Email
              </Button>
              <Link
                href="/sign-in"
                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <Heading variant="h1">Hanelia</Heading>
          </Link>
          <p className="text-sm font-light text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormFieldInput
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  field={field}
                />
              )}
            />

            <Button
              type="submit"
              variant="luxury"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Sending..."
                : "Send Reset Link"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Link
            href="/sign-in"
            className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
