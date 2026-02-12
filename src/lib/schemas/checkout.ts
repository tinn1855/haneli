"use client";

import * as z from "zod";

import { emailSchema } from "./auth";

export const checkoutShippingMethods = ["standard", "express"] as const;

export const checkoutPaymentMethods = ["card"] as const;

export const checkoutSchema = z.object({
  email: emailSchema,
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+-]+$/, "Please enter a valid phone number"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  company: z.string().optional(),
  addressLine1: z
    .string()
    .min(1, "Street address is required")
    .min(3, "Street address must be at least 3 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State / Province is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^[A-Za-z0-9\- ]+$/, "Please enter a valid postal code"),
  country: z.string().min(1, "Country is required"),
  shippingMethod: z.enum(checkoutShippingMethods, {
    required_error: "Please select a shipping method",
  }),
  paymentMethod: z.enum(checkoutPaymentMethods, {
    required_error: "Please select a payment method",
  }),
  cardName: z
    .string()
    .min(1, "Name on card is required")
    .min(3, "Name on card must be at least 3 characters"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^\d{12,19}$/, "Card number must be between 12 and 19 digits"),
  cardExpiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cardCvc: z
    .string()
    .min(1, "Security code is required")
    .regex(/^\d{3,4}$/, "Security code must be 3 or 4 digits"),
  notes: z
    .string()
    .max(500, "Notes must be under 500 characters")
    .optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
