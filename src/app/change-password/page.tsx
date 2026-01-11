"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormDescription } from "@/components/ui/form";
import { FormFieldInput } from "@/components/molecules/form-field-input";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/lib/schemas";

export default function ChangePasswordPage() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    console.log("Change password:", data);
    // TODO: Implement change password API call
    // After successful change, redirect to dashboard/home
  };

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
            Change your password
          </p>
          <p className="text-xs font-light text-muted-foreground">
            This is required for your first login
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormFieldInput
                    label="Current Password"
                    type="password"
                    placeholder="Enter your temporary password"
                    field={field}
                  />
                  <FormDescription className="text-xs">
                    Enter the temporary password sent to your email
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormFieldInput
                    label="New Password"
                    type="password"
                    placeholder="Enter your new password"
                    field={field}
                  />
                  <FormDescription className="text-xs">
                    Must be at least 6 characters
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormFieldInput
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
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
                ? "Changing password..."
                : "Change Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
