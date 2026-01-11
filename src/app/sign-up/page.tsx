"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FormFieldInput } from "@/components/molecules/form-field-input";
import { FormFieldSelect } from "@/components/molecules/form-field-select";
import { FormFieldDatePicker } from "@/components/molecules/form-field-date-picker";
import { signUpSchema, type SignUpFormValues } from "@/lib/schemas";
import { SEX_OPTIONS, getMaxDate, getMinBirthYear } from "@/lib/constants/form";

export default function SignUpPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      sex: undefined,
    },
  });

  function onSubmit(data: SignUpFormValues) {
    console.log("Sign up:", data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <Heading variant="h1">Hanelia</Heading>
          </Link>
          <p className="text-sm font-light text-muted-foreground">
            Create your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormFieldInput
                    label="First Name"
                    placeholder="John"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormFieldInput
                    label="Last Name"
                    placeholder="Doe"
                    field={field}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormFieldDatePicker
                    label="Date of Birth"
                    placeholder="Select date"
                    field={field}
                    maxDate={getMaxDate()}
                    fromYear={getMinBirthYear()}
                    toYear={new Date().getFullYear()}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormFieldSelect
                    label="Sex"
                    placeholder="Select your sex"
                    options={SEX_OPTIONS}
                    field={field}
                  />
                )}
              />
            </div>

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

            <div className="rounded-md border border-border/50 bg-muted/30 p-4">
              <p className="text-xs font-light text-muted-foreground leading-relaxed">
                After submitting this form, you will receive an email with a
                temporary password. Please check your inbox and use it to sign
                in. You will be required to change your password on first login.
              </p>
            </div>

            <Button
              variant="luxury"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm font-light text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-foreground transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
