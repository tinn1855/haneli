"use client";

import { useMemo } from "react";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { CartItem } from "@/components/molecules/cart-item";
import { CartSummary } from "@/components/molecules/cart-summary";
import { EmptyCart } from "@/components/sections/cart/empty-cart";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { cart, isLoading, isMounted, updateQuantity, removeItem, getSummary } =
    useCart();

  // Calculate summary only when mounted and cart is available
  const summary = useMemo(() => {
    if (!isMounted || cart.length === 0) {
      return { subtotal: 0, discount: 0, shipping: 0, total: 0 };
    }
    return getSummary();
  }, [isMounted, cart, getSummary]);

  const isEmpty = isMounted && cart.length === 0;

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

  return (
    <main>
      <Header />
      <Navigation />

      <div className="container py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Section>
        <div>
          {isEmpty ? (
            <EmptyCart />
          ) : (
            <>
              <ScrollAnimation direction="up" delay={0.1}>
                <Heading className="mb-8" variant="h1" as="h1">
                  Shopping Cart
                </Heading>
              </ScrollAnimation>

              <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-2">
                  <ScrollAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                      {cart.map((item, index) => (
                        <ScrollAnimation
                          key={item.id}
                          direction="fade"
                          delay={0.3 + index * 0.1}
                          duration={0.4}
                        >
                          <CartItem
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                          />
                        </ScrollAnimation>
                      ))}
                    </div>
                  </ScrollAnimation>
                </div>

                <div className="lg:col-span-1">
                  <ScrollAnimation direction="up" delay={0.4}>
                    <CartSummary summary={summary} />
                  </ScrollAnimation>
                </div>
              </div>
            </>
          )}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
