"use client";

import { use, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/newsletter";
import { Section } from "@/components/organisms/section";
import {
  SectionHeader,
  ProductCard,
  CarouselSection,
  ProductImageGallery,
  ProductPrice,
  ProductRating,
  QuantitySelector,
  TrustBadge,
  FeatureCard,
  ProductActions,
} from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "@/components/ui/toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  featuredProducts,
  bestsellers,
  productFeatures,
  productTrustBadges,
  productDetails,
} from "@/data";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { Check, Info } from "lucide-react";

// Combine all products
const allProducts = [...featuredProducts, ...bestsellers].filter(
  (product, index, self) => self.findIndex((p) => p.id === product.id) === index
);

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = allProducts.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState("");

  const { addItem } = useCart();
  const { toggle: toggleWishlist, isInWishlist, isMounted: wishlistMounted } = useWishlist();
  const { toasts, removeToast, success } = useToast();

  const isWishlisted = wishlistMounted && product ? isInWishlist(product.id) : false;

  // Get related products (same category, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image.replace("w=800", "w=801"),
    product.image.replace("w=800", "w=802"),
  ];

  const handleAddToCart = () => {
    if (!product) return;

    const personalization = personalizationText.trim()
      ? { text: personalizationText.trim() }
      : undefined;

    addItem(product, quantity, personalization);
    
    success(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to cart!`
    );
  };

  const handleToggleWishlist = () => {
    if (product) toggleWishlist(product);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    }
  };

  return (
    <main>
      <Header />
      <Navigation />

      {/* Breadcrumb */}
      <Section className="bg-background py-4 md:py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/products?category=${product.category}`}>
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-48">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      {/* Product Details */}
      <Section className="bg-background pt-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <ScrollAnimation direction="left" delay={0.1}>
            <ProductImageGallery
              images={productImages}
              productName={product.name}
              badge={product.badge}
              discount={discount > 0 ? discount : undefined}
            />
          </ScrollAnimation>

          {/* Product Info */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Category & Badges */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-light uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </span>
                {product.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Rating */}
              <ProductRating rating={4.8} totalReviews={128} />

              {/* Price */}
              <ProductPrice
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
              />

              <Separator />

              {/* Product Details Tabs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}. This exquisite piece is crafted with
                    the finest materials and meticulous attention to detail.
                    Perfect for gifting or treating yourself to something
                    special. Each item can be personalized with your choice of
                    engraving, making it truly one-of-a-kind.
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {productDetails.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">
                        Standard Shipping:
                      </strong>{" "}
                      5-7 business days
                    </p>
                    <p>
                      <strong className="text-foreground">
                        Express Shipping:
                      </strong>{" "}
                      2-3 business days
                    </p>
                    <p>
                      <strong className="text-foreground">
                        Free Shipping:
                      </strong>{" "}
                      On orders over $100
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Personalization Input */}
              <div className="space-y-2">
                <Label htmlFor="personalization">Personalization Text</Label>
                <Input
                  id="personalization"
                  placeholder="Enter your custom text (max 20 characters)"
                  maxLength={20}
                  className="max-w-md"
                  variant="underline"
                  value={personalizationText}
                  onChange={(e) => setPersonalizationText(e.target.value)}
                />
                {personalizationText.length > 0 && (
                  <Alert>
                    <Info className="size-4" />
                    <AlertDescription>
                      Your personalization will be engraved on this item
                    </AlertDescription>
                  </Alert>
                )}
                {personalizationText.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add your personal message or initials
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
              />

              {/* Action Buttons */}
              <ProductActions
                price={product.price}
                quantity={quantity}
                isWishlisted={isWishlisted}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onShare={handleShare}
              />

              <Separator />

              {/* Trust Badges */}
              <div className="grid gap-4 sm:grid-cols-3">
                {productTrustBadges.map((badge, index) => (
                  <TrustBadge
                    key={index}
                    icon={badge.icon}
                    title={badge.title}
                    description={badge.description}
                  />
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </Section>

      {/* Product Features */}
      <Section className="bg-muted/30">
        <ScrollAnimation direction="up" delay={0.1}>
          <SectionHeader
            subtitle="Details"
            title="Product Features"
            description="Discover what makes this product special"
          />
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {productFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </ScrollAnimation>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="bg-background">
          <ScrollAnimation direction="up" delay={0.1}>
            <SectionHeader
              subtitle="You May Also Like"
              title="Related Products"
              description="Explore more products from this collection"
            />
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.2}>
            <CarouselSection
              dotsCount={relatedProducts.length}
              cols={{ default: 1, md: 2, lg: 4 }}
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </CarouselSection>
          </ScrollAnimation>
        </Section>
      )}

      <Newsletter />
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
