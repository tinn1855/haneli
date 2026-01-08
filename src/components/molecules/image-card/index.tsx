import Image from "next/image";
import { cn } from "@/lib/utils";
import { CARD_STYLES } from "@/lib/constants";

interface ImageCardProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "4/3";
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ImageCard({
  src,
  alt,
  aspectRatio = "square",
  sizes,
  className,
  children,
}: ImageCardProps) {
  return (
    <div
      className={cn(
        CARD_STYLES.imageContainer,
        aspectRatio === "square" ? "aspect-square" : "aspect-[4/3]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={CARD_STYLES.image}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
      {children}
    </div>
  );
}

