"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import {
  Calendar,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types/blog";

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = post.title;

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`,
        "_blank"
      );
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="mx-auto max-w-4xl">
      <motion.div
        className="relative mb-12 aspect-21/9 w-full overflow-hidden bg-muted/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="mb-8 flex flex-wrap items-center gap-4 text-xs font-light tracking-wider uppercase text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
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
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readTime} min read</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Heading
          variant="h1"
          className="mb-8 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight"
        >
          {post.title}
        </Heading>
      </motion.div>

      <motion.div
        className="mb-12 flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/50">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-light tracking-wide text-foreground">
              {post.author.name}
            </span>
            <span className="text-sm font-light text-muted-foreground">
              Author
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-light tracking-wider uppercase text-muted-foreground mr-2">
            Share
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none"
            onClick={() => handleShare()}
          >
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="prose prose-lg max-w-none
          prose-headings:font-light prose-headings:tracking-tight prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:font-light prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-foreground/70
          prose-strong:font-medium prose-strong:text-foreground
          prose-ul:text-foreground/80 prose-ol:text-foreground/80
          prose-li:font-light prose-li:mb-2
          prose-blockquote:border-l-2 prose-blockquote:border-foreground/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.length > 0 && (
        <motion.div
          className="mt-16 pt-8 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-xs font-light tracking-wider uppercase text-muted-foreground mb-4 block">
            Tags
          </span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-none font-light tracking-wider hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </article>
  );
}
