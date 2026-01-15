"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No results found",
  description = "No articles found matching your search criteria.",
  actionLabel = "Clear Filters",
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      className="mt-12 text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-lg font-light text-muted-foreground mb-6">
        {description}
      </p>
      {onAction && (
        <Button variant="luxury" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
