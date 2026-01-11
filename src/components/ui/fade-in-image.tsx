"use client";

import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface FadeInImageProps extends ImageProps {
  className?: string;
  containerClassName?: string;
}

export function FadeInImage({
  className,
  containerClassName,
  ...props
}: FadeInImageProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", containerClassName)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Image className={cn(className)} {...props} />
    </motion.div>
  );
}
