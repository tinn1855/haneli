"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface FeaturedArticlesProps {
  posts: BlogPost[];
}

export function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  if (posts.length === 0) return null;

  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <div className="mt-12">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Primary Featured Post - Large */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/blog/${primaryPost.id}`} className="group block h-full">
            <article className="relative h-full min-h-125 lg:min-h-150 overflow-hidden border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={primaryPost.image}
                  alt={primaryPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <div className="mb-4">
                  <Badge
                    variant="product"
                    className="bg-primary text-primary-foreground"
                  >
                    Featured
                  </Badge>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-light tracking-wider uppercase text-white/80 mb-4">
                  <Badge
                    variant="outline"
                    className="rounded-none font-light tracking-wider border-white/30 text-white"
                  >
                    {primaryPost.category}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(primaryPost.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{primaryPost.readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white leading-tight mb-4 group-hover:text-white/90 transition-colors">
                  {primaryPost.title}
                </h3>

                {/* Excerpt */}
                <p className="text-base md:text-lg font-light leading-relaxed text-white/80 line-clamp-2 mb-6 max-w-2xl">
                  {primaryPost.excerpt}
                </p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/30">
                      <Image
                        src={primaryPost.author.avatar}
                        alt={primaryPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-light tracking-wide text-white">
                      {primaryPost.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-light tracking-wider uppercase text-white group-hover:text-white/80 transition-colors">
                    <span>Read Article</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>

        {/* Secondary Featured Posts - Stacked */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {secondaryPosts.map((post, index) => (
            <SecondaryFeaturedCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface SecondaryFeaturedCardProps {
  post: BlogPost;
  index: number;
}

function SecondaryFeaturedCard({ post, index }: SecondaryFeaturedCardProps) {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.id}`} className="group block h-full">
        <article className="relative flex h-full min-h-70 overflow-hidden border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* Image */}
          <div className="relative w-2/5 overflow-hidden bg-muted/20">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 40vw, 20vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-light tracking-wider uppercase text-muted-foreground mb-3">
              <Badge
                variant="outline"
                className="rounded-none font-light tracking-wider text-[10px]"
              >
                {post.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime} min</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-light tracking-wide text-foreground leading-snug mb-3 group-hover:text-foreground/70 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm font-light leading-relaxed text-muted-foreground line-clamp-2 mb-4">
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="mt-auto flex items-center gap-1 text-xs font-light tracking-wider uppercase text-foreground/70 group-hover:text-foreground transition-colors">
              <span>Read</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
