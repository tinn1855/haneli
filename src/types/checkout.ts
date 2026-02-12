export interface CheckoutBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface ShippingOption {
  value: "standard" | "express";
  label: string;
  description: string;
}
