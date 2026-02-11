"use client";

import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/organisms/section";
import { EmptyWishlist } from "@/components/sections/wishlist/empty-wishlist";
import { WishlistCard } from "@/components/molecules/wishlist-card";
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
  const { items, isLoading, isMounted, remove } = useWishlist();
  const { addItem } = useCart();
  const { success } = useToast();

  const isEmpty = isMounted && items.length === 0;

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    success("Added to cart!");
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
                <Heading className="mb-8" variant="h1" as="h1">
                  Wishlist
                </Heading>
                <p className="text-sm font-light text-muted-foreground mb-8">
                  {items.length} {items.length === 1 ? "item" : "items"} saved
                </p>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.2}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((product, index) => (
                    <ScrollAnimation
                      key={product.id}
                      direction="fade"
                      delay={0.3 + index * 0.05}
                      duration={0.4}
                    >
                      <WishlistCard
                        product={product}
                        onRemove={remove}
                        onAddToCart={handleAddToCart}
                      />
                    </ScrollAnimation>
                  ))}
                </div>
              </ScrollAnimation>
            </>
          )}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
