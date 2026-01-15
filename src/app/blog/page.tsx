"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/newsletter";
import { Section } from "@/components/organisms/section";
import { SectionHeader } from "@/components/molecules";
import { BlogCard } from "@/components/molecules/blog-card";
import {
  CategoryFilter,
  FeaturedArticles,
  BlogPagination,
  EmptyState,
} from "@/components/sections/blog";
import { useDebounce, usePagination } from "@/hooks";
import { blogPosts, blogCategories } from "@/data/blog";
import {
  BLOG_POSTS_PER_PAGE,
  BLOG_SEARCH_DEBOUNCE_DELAY,
} from "@/lib/constants/blog";
import type { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchQuery = useDebounce(
    searchInput,
    BLOG_SEARCH_DEBOUNCE_DELAY
  );

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        debouncedSearchQuery === "" ||
        post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearchQuery]);

  const featuredPosts = useMemo(
    () => blogPosts.filter((post) => post.featured),
    []
  );

  const {
    currentPage,
    totalPages,
    setCurrentPage,
    paginateItems,
    getPageNumbers,
    resetPage,
  } = usePagination<BlogPost>({
    totalItems: filteredPosts.length,
    itemsPerPage: BLOG_POSTS_PER_PAGE,
  });

  const paginatedPosts = paginateItems(filteredPosts);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    resetPage();
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("latest-articles")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearFilters = () => {
    handleSearchChange("");
    handleCategoryChange("all");
  };

  const showFeatured =
    selectedCategory === "all" &&
    debouncedSearchQuery === "" &&
    featuredPosts.length > 0;

  return (
    <main>
      <Header />
      <Navigation />

      <CategoryFilter
        categories={blogCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
      />

      {showFeatured && (
        <Section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Featured Articles"
              subtitle="Don't miss these popular posts"
            />
            <FeaturedArticles posts={featuredPosts} />
          </div>
        </Section>
      )}

      <Section
        id="latest-articles"
        className={
          showFeatured ? "py-10 md:py-14 bg-muted/10" : "py-16 md:py-24"
        }
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title={
              selectedCategory === "all" ? "Latest Articles" : selectedCategory
            }
            subtitle={
              filteredPosts.length > 0
                ? `${filteredPosts.length} articles found`
                : "No articles found"
            }
          />

          {filteredPosts.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState onAction={handleClearFilters} />
          )}

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageNumbers={getPageNumbers()}
          />
        </div>
      </Section>

      <Newsletter />
      <Footer />
    </main>
  );
}
