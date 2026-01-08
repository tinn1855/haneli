// Shared constants for styling
export const CARD_STYLES = {
  base: "group relative flex h-full flex-col border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
  imageContainer: "relative overflow-hidden bg-muted/20",
  image: "object-cover transition-transform duration-500 group-hover:scale-105",
  content: "flex flex-1 flex-col border-t border-border/50 p-6",
  divider: "border-t border-border/30",
} as const;

export const TYPOGRAPHY = {
  title: {
    base: "font-light tracking-wide text-foreground",
    sm: "text-base",
    md: "text-lg",
  },
  description: "text-sm font-light leading-relaxed text-muted-foreground",
  price: "text-lg font-medium tracking-wide text-foreground",
  priceOriginal: "text-sm font-light text-muted-foreground line-through",
} as const;

