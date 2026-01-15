"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  allLabel?: string;
  searchPlaceholder?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
  allLabel = "All Posts",
  searchPlaceholder = "Search articles...",
}: CategoryFilterProps) {
  return (
    <section className="py-5 border-b border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Category Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <Button
              variant={selectedCategory === "all" ? "luxury" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange("all")}
              className="text-xs tracking-wider"
            >
              {allLabel}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "luxury" : "ghost"
                }
                size="sm"
                onClick={() => onCategoryChange(category.name)}
                className="text-xs tracking-wider"
              >
                {category.name}
                <span>({category.count})</span>
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-auto lg:min-w-80">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 py-2 text-sm rounded-none border-border/50 focus:border-foreground font-light tracking-wide"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
