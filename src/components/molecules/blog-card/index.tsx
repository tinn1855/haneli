"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";
import { CARD_STYLES, TYPOGRAPHY } from "@/lib/constants";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block h-full group">
      <motion.article
        className={cn(
          "relative flex h-full flex-col border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
          featured && "md:flex-row"
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-muted/20",
            featured ? "md:w-1/2 aspect-4/3 md:aspect-auto" : "aspect-16/10"
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={CARD_STYLES.image}
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
          />
          {post.featured && (
            <div className="absolute left-4 top-4">
              <Badge variant="product">Featured</Badge>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col p-6 md:p-8",
            featured && "md:w-1/2 justify-center"
          )}
        >
          <div className="flex flex-wrap items-center gap-4 text-xs font-light tracking-wider uppercase text-muted-foreground mb-4">
            <Badge
              variant="outline"
              className="rounded-none font-light tracking-wider"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h3
            className={cn(
              "font-light tracking-wide text-foreground leading-snug mb-3 group-hover:text-foreground/70 transition-colors",
              featured ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              TYPOGRAPHY.description,
              "line-clamp-2 mb-6",
              featured && "line-clamp-3"
            )}
          >
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/30">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/50">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-light tracking-wide text-foreground">
                {post.author.name}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm font-light tracking-wider uppercase text-foreground/70 group-hover:text-foreground transition-colors">
              <span>Read</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
