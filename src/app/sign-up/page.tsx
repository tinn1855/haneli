"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { format } from "date-fns";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { signUpSchema, type SignUpFormValues } from "@/lib/schemas";

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

function getMaxDate(): Date {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 13));
}

function handleDateOfBirthSelect(
  selectedDate: Date | undefined,
  fieldOnChange: (value: string) => void
) {
  if (selectedDate) {
    fieldOnChange(format(selectedDate, "yyyy-MM-dd"));
  } else {
    fieldOnChange("");
  }
}

function renderDateOfBirthField({
  field,
}: {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}) {
  const date = field.value ? new Date(field.value) : undefined;
  const maxDate = getMaxDate();

  return (
    <FormItem>
      <FormLabel className="text-sm font-light">Date of Birth</FormLabel>
      <FormControl>
        <DatePicker
          date={date}
          onSelect={(selectedDate) =>
            handleDateOfBirthSelect(selectedDate, field.onChange)
          }
          maxDate={maxDate}
          fromYear={1900}
          toYear={new Date().getFullYear()}
          placeholder="Select date"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function renderFirstNameField({
  field,
}: {
  field: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    name: string;
  };
}) {
  return (
    <FormItem>
      <FormLabel className="text-sm font-light">First Name</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="John"
          className="rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function renderLastNameField({
  field,
}: {
  field: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    name: string;
  };
}) {
  return (
    <FormItem>
      <FormLabel className="text-sm font-light">Last Name</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="Doe"
          className="rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function renderEmailField({
  field,
}: {
  field: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    name: string;
  };
}) {
  return (
    <FormItem>
      <FormLabel className="text-sm font-light">Email Address</FormLabel>
      <FormControl>
        <Input
          type="email"
          placeholder="your.email@example.com"
          className="rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function renderSexOption(option: { value: string; label: string }) {
  return (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  );
}

function handleSexChange(
  value: string,
  fieldOnChange: (value: string) => void
) {
  fieldOnChange(value);
}

function renderSexField({
  field,
}: {
  field: {
    value: string | undefined;
    onChange: (value: string) => void;
  };
}) {
  return (
    <FormItem>
      <FormLabel className="text-sm font-light">Sex</FormLabel>
      <Select
        onValueChange={(value) => handleSexChange(value, field.onChange)}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="rounded-none border-0 border-b border-border/50 bg-transparent px-0 py-2 focus:ring-0 focus:border-foreground transition-colors w-full">
            <SelectValue placeholder="Select your sex" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>{sexOptions.map(renderSexOption)}</SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

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
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <Heading
              variant="h1"
              className="text-3xl font-light tracking-[0.15em] uppercase"
            >
              Hanelia
            </Heading>
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
                render={renderFirstNameField}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={renderLastNameField}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={renderDateOfBirthField}
              />

              <FormField
                control={form.control}
                name="sex"
                render={renderSexField}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={renderEmailField}
            />

            <div className="rounded-md border border-border/50 bg-muted/30 p-4">
              <p className="text-xs font-light text-muted-foreground leading-relaxed">
                After submitting this form, you will receive an email with a
                temporary password. Please check your inbox and use it to sign
                in. You will be required to change your password on first login.
              </p>
            </div>

            <Button
              type="submit"
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
