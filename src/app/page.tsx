import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Newsletter } from "@/components/common/newsletter";
import { Hero } from "@/components/sections/hero";
import { FAQ } from "@/components/sections/faq";
import { Feedback, Products } from "@/components/organisms";

export default function Home() {
  return (
    <main>
      <Header />
      <Navigation />
      <Hero />
      <Products />
      <Feedback />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
