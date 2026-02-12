import type { CheckoutBreadcrumbItem, CountryOption, ShippingOption } from "@/types/checkout";
import type { CheckoutFormValues } from "@/lib/schemas";

export const countryOptions: CountryOption[] = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
];

export const shippingOptions: ShippingOption[] = [
  {
    value: "standard",
    label: "Standard (3-5 business days)",
    description: "Free for orders over $100",
  },
  {
    value: "express",
    label: "Express (1-2 business days)",
    description: "Flat $15 surcharge",
  },
];

export function getCheckoutBreadcrumbItems(isEmpty: boolean): CheckoutBreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    ...(isEmpty ? [] : [{ label: "Cart", href: "/cart" }]),
    { label: "Checkout", isCurrent: true },
  ];
}

export const checkoutFormDefaultValues: CheckoutFormValues = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  company: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  shippingMethod: "standard",
  paymentMethod: "card",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  notes: "",
};
