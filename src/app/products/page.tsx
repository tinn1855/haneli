"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/common/header";
import { Navigation } from "@/components/common/navigation";
import { Footer } from "@/components/common/footer";
import { Newsletter } from "@/components/common/newsletter";
import { Section } from "@/components/organisms/section";
import { SectionHeader, ProductCard, Grid } from "@/components/molecules";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { featuredProducts } from "@/data/product";
import { bestsellers } from "@/data/bestsellers";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Product } from "@/types/product";

// Pagination config
const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48];
const DEFAULT_ITEMS_PER_PAGE = 12;

// Combine all products for this page
const allProducts = [...featuredProducts, ...bestsellers].filter(
  (product, index, self) => self.findIndex((p) => p.id === product.id) === index
);

// Extract unique categories
const categories = Array.from(
  new Set(allProducts.map((product) => product.category))
);

// Price ranges
const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

// Badges/Tags
const badges = Array.from(
  new Set(allProducts.map((product) => product.badge).filter(Boolean))
) as string[];

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

type ViewMode = "grid" | "list";

// FilterSection Component using shadcn/ui Collapsible
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b border-border/50 pb-4"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-foreground transition-colors [&[data-state=open]>svg]:rotate-180">
        {title}
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

// FilterSidebar Component - Declared outside of render
interface FilterSidebarProps {
  className?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedPriceRanges: number[];
  onTogglePriceRange: (index: number) => void;
  selectedBadges: string[];
  onToggleBadge: (badge: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  products: Product[];
}

function FilterSidebar({
  className,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedPriceRanges,
  onTogglePriceRange,
  selectedBadges,
  onToggleBadge,
  hasActiveFilters,
  onClearFilters,
  products,
}: FilterSidebarProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Separator />

      {/* Categories */}
      <FilterSection title="Categories">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onToggleCategory(category)}
            />
            <Label
              htmlFor={`category-${category}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {category}
            </Label>
            <span className="text-xs text-muted-foreground">
              ({products.filter((p) => p.category === category).length})
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`price-${index}`}
              checked={selectedPriceRanges.includes(index)}
              onCheckedChange={() => onTogglePriceRange(index)}
            />
            <Label
              htmlFor={`price-${index}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {range.label}
            </Label>
            <span className="text-xs text-muted-foreground">
              (
              {
                products.filter(
                  (p) => p.price >= range.min && p.price < range.max
                ).length
              }
              )
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Badges/Tags */}
      {badges.length > 0 && (
        <FilterSection title="Tags">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center space-x-2">
              <Checkbox
                id={`badge-${badge}`}
                checked={selectedBadges.includes(badge)}
                onCheckedChange={() => onToggleBadge(badge)}
              />
              <Label
                htmlFor={`badge-${badge}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {badge}
              </Label>
              <span className="text-xs text-muted-foreground">
                ({products.filter((p) => p.badge === badge).length})
              </span>
            </div>
          ))}
        </FilterSection>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full"
        >
          <X className="mr-2 size-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialItemsPerPage = ITEMS_PER_PAGE_OPTIONS.includes(
    Number(searchParams.get("limit"))
  )
    ? Number(searchParams.get("limit"))
    : DEFAULT_ITEMS_PER_PAGE;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Update URL when page or itemsPerPage changes
  const updateURL = useCallback(
    (page: number, limit: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }
      if (limit !== DEFAULT_ITEMS_PER_PAGE) {
        params.set("limit", limit.toString());
      } else {
        params.delete("limit");
      }
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "/products", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(page, itemsPerPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
    updateURL(1, limit);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      result = result.filter((product) =>
        selectedPriceRanges.some((rangeIndex) => {
          const range = priceRanges[rangeIndex];
          return product.price >= range.min && product.price < range.max;
        })
      );
    }

    // Filter by badges
    if (selectedBadges.length > 0) {
      result = result.filter(
        (product) => product.badge && selectedBadges.includes(product.badge)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedPriceRanges,
    selectedBadges,
    sortBy,
  ]);

  // Pagination calculations
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    endIndex
  );

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pages;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setCurrentPage(1);
  };

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedBadges([]);
    setSortBy("default");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategories.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedBadges.length > 0 ||
    sortBy !== "default";

  const activeFilterCount =
    selectedCategories.length +
    selectedPriceRanges.length +
    selectedBadges.length;

  // Shared filter sidebar props
  const filterSidebarProps = {
    searchQuery,
    onSearchChange: setSearchQuery,
    selectedCategories,
    onToggleCategory: toggleCategory,
    selectedPriceRanges,
    onTogglePriceRange: togglePriceRange,
    selectedBadges,
    onToggleBadge: toggleBadge,
    hasActiveFilters,
    onClearFilters: clearFilters,
    products: allProducts,
  };

  return (
    <main>
      <Header />
      <Navigation />

      <Section className="bg-background min-h-screen">
        <ScrollAnimation direction="up" delay={0.1}>
          <SectionHeader
            subtitle="Our Collection"
            title="All Products"
            description="Explore our complete collection of personalized products, each crafted with care and attention to detail"
          />
        </ScrollAnimation>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <ScrollAnimation
            direction="left"
            delay={0.2}
            className="hidden lg:block"
          >
            <aside className="w-64 shrink-0 sticky top-24">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-medium mb-4">Filters</h3>
                <FilterSidebar {...filterSidebarProps} />
              </div>
            </aside>
          </ScrollAnimation>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: Mobile filter toggle & Results count */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 size-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
                    {totalItems} products
                  </span>
                </div>

                {/* Right: View mode & Sort */}
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "rounded-none rounded-l-md",
                        viewMode === "grid" && "bg-muted"
                      )}
                    >
                      <LayoutGrid className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "rounded-none rounded-r-md",
                        viewMode === "list" && "bg-muted"
                      )}
                    >
                      <List className="size-4" />
                    </Button>
                  </div>

                  {/* Sort */}
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollAnimation>

            {/* Mobile Filters Panel */}
            <div
              className={cn(
                "lg:hidden mb-6 overflow-hidden transition-all duration-300",
                showMobileFilters
                  ? "max-h-250 opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="rounded-lg border bg-card p-4">
                <FilterSidebar {...filterSidebarProps} />
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <ScrollAnimation direction="up" delay={0.25}>
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Active filters:
                  </span>
                  {selectedCategories.map((category) => (
                    <Button
                      key={category}
                      variant="secondary"
                      size="xs"
                      onClick={() => toggleCategory(category)}
                      className="h-7"
                    >
                      {category}
                      <X className="ml-1 size-3" />
                    </Button>
                  ))}
                  {selectedPriceRanges.map((index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="xs"
                      onClick={() => togglePriceRange(index)}
                      className="h-7"
                    >
                      {priceRanges[index].label}
                      <X className="ml-1 size-3" />
                    </Button>
                  ))}
                  {selectedBadges.map((badge) => (
                    <Button
                      key={badge}
                      variant="secondary"
                      size="xs"
                      onClick={() => toggleBadge(badge)}
                      className="h-7"
                    >
                      {badge}
                      <X className="ml-1 size-3" />
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={clearFilters}
                    className="h-7 text-muted-foreground"
                  >
                    Clear all
                  </Button>
                </div>
              </ScrollAnimation>
            )}

            {/* Products Grid/List */}
            {paginatedProducts.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
                    {paginatedProducts.map((product, index) => (
                      <ScrollAnimation
                        key={product.id}
                        direction="up"
                        delay={0.1 + (index % 6) * 0.05}
                        duration={0.5}
                      >
                        <ProductCard product={product} />
                      </ScrollAnimation>
                    ))}
                  </Grid>
                ) : (
                  <div className="space-y-4">
                    {paginatedProducts.map((product, index) => (
                      <ScrollAnimation
                        key={product.id}
                        direction="up"
                        delay={0.1 + (index % 6) * 0.05}
                        duration={0.5}
                      >
                        <ProductCard product={product} className="flex-row" />
                      </ScrollAnimation>
                    ))}
                  </div>
                )}

                {/* Pagination Bar */}
                {totalPages > 1 && (
                  <ScrollAnimation direction="up" delay={0.3}>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Left: Showing info */}
                      <p className="text-sm text-muted-foreground order-2 sm:order-1">
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, totalItems)} of {totalItems}{" "}
                        products
                      </p>

                      {/* Center: Pagination */}
                      <Pagination className="order-1 sm:order-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href={`?page=${currentPage - 1}${
                                itemsPerPage !== DEFAULT_ITEMS_PER_PAGE
                                  ? `&limit=${itemsPerPage}`
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1)
                                  handlePageChange(currentPage - 1);
                              }}
                              className={cn(
                                currentPage === 1 &&
                                  "pointer-events-none opacity-50"
                              )}
                            />
                          </PaginationItem>

                          {getPageNumbers().map((page, index) =>
                            page === "ellipsis" ? (
                              <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href={`?page=${page}${
                                    itemsPerPage !== DEFAULT_ITEMS_PER_PAGE
                                      ? `&limit=${itemsPerPage}`
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                  }}
                                  isActive={currentPage === page}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}

                          <PaginationItem>
                            <PaginationNext
                              href={`?page=${currentPage + 1}${
                                itemsPerPage !== DEFAULT_ITEMS_PER_PAGE
                                  ? `&limit=${itemsPerPage}`
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages)
                                  handlePageChange(currentPage + 1);
                              }}
                              className={cn(
                                currentPage === totalPages &&
                                  "pointer-events-none opacity-50"
                              )}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>

                      {/* Right: Items per page */}
                      <div className="flex items-center gap-2 order-3">
                        <span className="text-sm text-muted-foreground">
                          Show
                        </span>
                        <Select
                          value={itemsPerPage.toString()}
                          onValueChange={(value) => {
                            handleItemsPerPageChange(Number(value));
                          }}
                        >
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option}
                                value={option.toString()}
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </ScrollAnimation>
                )}
              </>
            ) : (
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">
                    No products found
                  </h3>
                  <p className="mb-4 max-w-md text-sm text-muted-foreground">
                    We couldn&apos;t find any products matching your search
                    criteria. Try adjusting your filters or search query.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </Section>

      <Newsletter />
      <Footer />
    </main>
  );
}
