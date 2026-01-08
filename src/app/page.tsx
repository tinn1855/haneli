import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Newsletter } from "@/components/common/newsletter";
import { Hero } from "@/components/sections/hero";
import { FAQ } from "@/components/sections/faq";
import { Products } from "@/components/sections/products";
import { Bestsellers } from "@/components/sections/bestsellers";
import { PersonalizationSteps } from "@/components/sections/personalization-steps";
import { Occasions } from "@/components/sections/occasions";
import { ProductTypes } from "@/components/sections/product-types";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Feedback } from "@/components/sections/feedback";

export default function Home() {
  return (
    <main>
      <Header />
      <Navigation />
      <Hero />
      <ProductTypes />
      <Products />
      <Bestsellers />
      <PersonalizationSteps />
      <Occasions />
      <TrustBadges />
      <Feedback />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
