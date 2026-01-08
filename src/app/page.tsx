import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Newsletter } from "@/components/common/newsletter";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Navigation />
      <Hero />
      <Newsletter />
      <Footer />
    </main>
  );
}
