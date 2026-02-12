"use client";

import Link from "next/link";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormFieldInput } from "@/components/molecules/form-field-input";
import { FormFieldSelect } from "@/components/molecules/form-field-select";
import { FormFieldTextarea } from "@/components/molecules/form-field-textarea";
import { CheckoutShippingOption } from "@/components/molecules/checkout-shipping-option";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Heading } from "@/components/ui/heading";
import type { UseFormReturn } from "react-hook-form";
import type { CheckoutFormValues } from "@/lib/schemas";
import type { CountryOption, ShippingOption } from "@/types/checkout";

interface CheckoutFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  countryOptions: CountryOption[];
  shippingOptions: ShippingOption[];
}

export function CheckoutForm({
  form,
  onSubmit,
  countryOptions,
  shippingOptions,
}: CheckoutFormProps) {
  return (
    <ScrollAnimation direction="up" delay={0.1}>
      <div className="space-y-10">
        <div>
          <Heading variant="h1" as="h1" className="mb-2">
            Checkout
          </Heading>
          <p className="text-sm font-light text-muted-foreground">
            Complete your details to finalize the purchase.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-12"
            noValidate
          >
            <div className="space-y-6 border border-border/50 rounded-md p-6">
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground">
                  Contact Information
                </h2>
                <p className="text-xs font-light text-muted-foreground">
                  We will use this to send you order updates.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Email address"
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Phone number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      autoComplete="tel"
                      field={field}
                    />
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6 border border-border/50 rounded-md p-6">
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground">
                  Shipping Address
                </h2>
                <p className="text-xs font-light text-muted-foreground">
                  Where should we ship your order?
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormFieldInput
                      label="First name"
                      autoComplete="given-name"
                      placeholder="Jane"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Last name"
                      autoComplete="family-name"
                      placeholder="Doe"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Company (optional)"
                      placeholder="Company name"
                      autoComplete="organization"
                      field={{ ...field, value: field.value ?? "" }}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormFieldSelect
                      label="Country"
                      placeholder="Select country"
                      options={countryOptions}
                      field={{
                        value: field.value,
                        onChange: field.onChange,
                      }}
                    />
                  )}
                />
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormFieldInput
                        label="Street address"
                        placeholder="123 Luxury St."
                        autoComplete="address-line1"
                        field={field}
                      />
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Apartment, suite, etc. (optional)"
                      placeholder="Unit 5A"
                      autoComplete="address-line2"
                      field={{ ...field, value: field.value ?? "" }}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormFieldInput
                      label="City"
                      placeholder="Chicago"
                      autoComplete="address-level2"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormFieldInput
                      label="State / Province"
                      placeholder="Illinois"
                      autoComplete="address-level1"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Postal code"
                      placeholder="60604"
                      autoComplete="postal-code"
                      field={field}
                    />
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground">
                  Delivery Method
                </h2>
                <p className="text-xs font-light text-muted-foreground">
                  Choose how quickly you want your items.
                </p>
              </div>
              <FormField
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <div className="space-y-4">
                    {shippingOptions.map((option) => (
                      <CheckoutShippingOption
                        key={option.value}
                        option={option}
                        isActive={field.value === option.value}
                        onSelect={() => field.onChange(option.value)}
                      />
                    ))}
                    {form.formState.errors.shippingMethod && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.shippingMethod.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-6 border border-border/50 rounded-md p-6">
              <div>
                <h2 className="text-lg font-light tracking-wide text-foreground">
                  Payment Details
                </h2>
                <p className="text-xs font-light text-muted-foreground">
                  Secure payment powered by Stripe.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormFieldInput
                        label="Name on card"
                        placeholder="Jane Doe"
                        autoComplete="cc-name"
                        field={field}
                      />
                    )}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormFieldInput
                        label="Card number"
                        placeholder="4242424242424242"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        maxLength={19}
                        field={field}
                      />
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="cardExpiry"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Expiry (MM/YY)"
                      placeholder="08/27"
                      autoComplete="cc-exp"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardCvc"
                  render={({ field }) => (
                    <FormFieldInput
                      label="Security code"
                      placeholder="123"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      field={field}
                    />
                  )}
                />
              </div>
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormFieldTextarea
                  label="Order notes (optional)"
                  placeholder="Add delivery instructions or personalization details."
                  rows={4}
                  field={{ ...field, value: field.value ?? "" }}
                />
              )}
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-xs font-light text-muted-foreground md:max-w-sm">
                By placing your order you agree to our{" "}
                <Link
                  href="/policy"
                  className="underline underline-offset-4"
                >
                  terms & policies
                </Link>
                .
              </p>
              <Button
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full md:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Processing..."
                  : "Place Order"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollAnimation>
  );
}
