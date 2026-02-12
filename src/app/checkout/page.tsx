"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { Spinner } from "@/components/ui/spinner";
import { EmptyCart } from "@/components/sections/cart/empty-cart";
import {
  CheckoutBreadcrumb,
  CheckoutForm,
  CheckoutOrderSummary,
} from "@/components/sections/checkout";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import {
  countryOptions,
  shippingOptions,
  getCheckoutBreadcrumbItems,
  checkoutFormDefaultValues,
} from "@/data/checkout";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas";

export default function CheckoutPage() {
  const { cart, isLoading, isMounted, clearCart, getSummary } = useCart();
  const { success } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutFormDefaultValues,
  });

  const baseSummary = useMemo(() => {
    if (!isMounted) {
      return { subtotal: 0, discount: 0, shipping: 0, total: 0 };
    }
    return getSummary();
  }, [isMounted, getSummary]);

  const shippingMethod = useWatch({
    control: form.control,
    name: "shippingMethod",
  });
  const shippingCost =
    shippingMethod === "express"
      ? Math.max(baseSummary.shipping + 15, 15)
      : baseSummary.shipping;

  const orderTotal = baseSummary.subtotal - baseSummary.discount + shippingCost;

  const isEmpty = isMounted && cart.length === 0;

  const breadcrumbItems = useMemo(
    () => getCheckoutBreadcrumbItems(isEmpty),
    [isEmpty],
  );

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout submission", { data, cart });
    success("Thank you! Your order has been placed.");
    clearCart();
  };

  if (isLoading || !isMounted) {
    return (
      <main>
        <Header />
        <Navigation />
        <Section spacing="spacious">
          <div className="container flex items-center justify-center">
            <Spinner className="size-8 text-foreground" />
          </div>
        </Section>
        <Footer />
      </main>
    );
  }

  if (isEmpty) {
    return (
      <main>
        <Header />
        <Navigation />
        <CheckoutBreadcrumb items={breadcrumbItems} />
        <Section spacing="spacious">
          <EmptyCart />
        </Section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Navigation />
      <CheckoutBreadcrumb items={breadcrumbItems} />

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_minmax(320px,1fr)] lg:gap-16">
          <CheckoutForm
            form={form}
            onSubmit={onSubmit}
            countryOptions={countryOptions}
            shippingOptions={shippingOptions}
          />
          <CheckoutOrderSummary
            cart={cart}
            baseSummary={baseSummary}
            shippingCost={shippingCost}
            orderTotal={orderTotal}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
