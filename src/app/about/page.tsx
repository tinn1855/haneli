import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/newsletter";
import {
  AboutHero,
  AboutStats,
  AboutMission,
  AboutValues,
  AboutWhyChoose,
  AboutProcess,
  AboutCategories,
} from "@/components/sections/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Haneli - Personalized Products",
  description:
    "Learn about Haneli's mission to create unique personalized products. From meaningful gifts to memorable keepsakes, every item carries your personal touch.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Navigation />
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutWhyChoose />
      <AboutProcess />
      <AboutCategories />
      <Newsletter />
      <Footer />
    </main>
  );
}
