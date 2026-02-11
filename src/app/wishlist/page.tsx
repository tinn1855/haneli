"use client";

import { useMemo } from "react";

import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { EmptyWishlist } from "@/components/sections/wishlist/empty-wishlist";
import { WishlistItem } from "@/components/molecules/wishlist-item";
import { WishlistSummary } from "@/components/molecules/wishlist-summary";
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
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

export default function WishlistPage() {
  const { items, isLoading, isMounted, remove, clear } = useWishlist();
  const { addItem } = useCart();
  const { success } = useToast();

  const totalItems = isMounted ? items.length : 0;
  const isEmpty = isMounted && totalItems === 0;

  const summary = useMemo(() => {
    if (!isMounted || items.length === 0) {
      return {
        totalValue: 0,
        totalOriginalValue: 0,
      };
    }

    return items.reduce(
      (acc, product) => {
        acc.totalValue += product.price;
        acc.totalOriginalValue += product.originalPrice ?? product.price;
        return acc;
      },
      {
        totalValue: 0,
        totalOriginalValue: 0,
      }
    );
  }, [isMounted, items]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    success("Added to cart!");
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    items.forEach((product) => addItem(product, 1));
    success("Added all wishlist items to cart!");
  };

  const handleClearWishlist = () => {
    if (items.length === 0) return;
    clear();
    success("Wishlist cleared.");
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
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Section>
        <div>
          {isEmpty ? (
            <EmptyWishlist />
          ) : (
            <>
              <ScrollAnimation direction="up" delay={0.1}>
                <Heading className="mb-4" variant="h1" as="h1">
                  Wishlist
                </Heading>
                <p className="mb-8 text-sm font-light text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "item saved" : "items saved"}
                </p>
              </ScrollAnimation>

              <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-2">
                  <ScrollAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                      {items.map((product, index) => (
                        <ScrollAnimation
                          key={product.id}
                          direction="fade"
                          delay={0.3 + index * 0.1}
                          duration={0.4}
                        >
                          <WishlistItem
                            product={product}
                            onAddToCart={handleAddToCart}
                            onRemove={remove}
                          />
                        </ScrollAnimation>
                      ))}
                    </div>
                  </ScrollAnimation>
                </div>

                <div className="lg:col-span-1">
                  <ScrollAnimation direction="up" delay={0.4}>
                    <WishlistSummary
                      totalItems={totalItems}
                      totalValue={summary.totalValue}
                      totalOriginalValue={summary.totalOriginalValue}
                      onAddAllToCart={handleAddAllToCart}
                      onClearWishlist={handleClearWishlist}
                    />
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
