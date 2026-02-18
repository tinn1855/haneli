"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/types/product";

const CATEGORIES = ["Jewelry", "Accessories", "Home Decor", "Gifts"];
const BADGES = ["Best Seller", "New", "Sale", "Trending"];

const defaultProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "Jewelry",
  badge: undefined,
  featured: false,
};

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (data: Omit<Product, "id"> | Partial<Product> & { id: string }) => void;
}

function getFormFromProduct(product: Product | null): Omit<Product, "id"> {
  if (!product) return defaultProduct;
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    badge: product.badge,
    featured: product.featured ?? false,
  };
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductFormDialogProps) {
  const [form, setForm] = useState<Omit<Product, "id">>(() =>
    getFormFromProduct(product)
  );
  const isEdit = !!product;

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync form when modal opens with product
      setForm(getFormFromProduct(product));
    }
  }, [open, product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && product) {
      onSubmit({ ...form, id: product.id });
    } else {
      onSubmit(form);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Product name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Product description"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={0.01}
                value={form.price || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: Number(e.target.value) || 0 }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($) - optional</Label>
              <Input
                id="originalPrice"
                type="number"
                min={0}
                step={0.01}
                value={form.originalPrice ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    originalPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
              placeholder="https://..."
              required
            />
            {form.image && (
              <div className="relative mt-2 aspect-square max-w-[120px] overflow-hidden rounded-md border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image}
                  alt="Preview"
                  className="size-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm((p) => ({ ...p, category: v }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Badge - optional</Label>
            <Select
              value={form.badge ?? "none"}
              onValueChange={(v) =>
                setForm((p) => ({
                  ...p,
                  badge: v === "none" ? undefined : v,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {BADGES.map((badge) => (
                  <SelectItem key={badge} value={badge}>
                    {badge}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={form.featured}
              onCheckedChange={(checked) =>
                setForm((p) => ({ ...p, featured: !!checked }))
              }
            />
            <Label
              htmlFor="featured"
              className="text-sm font-normal cursor-pointer"
            >
              Featured product
            </Label>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save" : "Add Product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
