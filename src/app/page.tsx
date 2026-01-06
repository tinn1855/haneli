import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Newsletter } from "@/components/common/newsletter";

export default function Home() {
  return (
    <main>
      <Header />
      <Navigation />
      <Newsletter />
      <Footer />
    </main>
  );
}
