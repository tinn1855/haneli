"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  discount?: number;
  className?: string;
}

export function ProductImageGallery({
  images,
  productName,
  badge,
  discount,
  className,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {badge && (
          <div className="absolute left-4 top-4">
            <Badge variant="product">{badge}</Badge>
          </div>
        )}
        {discount && discount > 0 && (
          <div className="absolute right-4 top-4">
            <Badge className="bg-red-500 text-white border-0">
              -{discount}%
            </Badge>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square w-20 overflow-hidden border-2 transition-colors",
                selectedImage === index
                  ? "border-foreground"
                  : "border-transparent hover:border-muted-foreground"
              )}
            >
              <Image
                src={img}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
