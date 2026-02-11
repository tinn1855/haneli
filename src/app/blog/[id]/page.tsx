"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/newsletter";
import { Section } from "@/components/organisms/section";
import { BlogContent } from "@/components/molecules/blog-content";
import { BlogCard } from "@/components/molecules/blog-card";
import { SectionHeader } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Home } from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = use(params);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main>
      <Header />
      <Navigation />

      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <Breadcrumb>
              <BreadcrumbList className="text-xs font-light tracking-wider uppercase">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center gap-1.5 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/blog"
                    className="hover:text-foreground"
                  >
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground max-w-50 truncate">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs font-light tracking-wider uppercase"
              >
                <ArrowLeft size={12} />
                Back
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Section spacing="spacious">
        <div className="container mx-auto px-4">
          <BlogContent post={post} />
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section spacing="spacious" className="bg-muted/10">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Related Articles"
              subtitle="You might also enjoy these posts"
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}
