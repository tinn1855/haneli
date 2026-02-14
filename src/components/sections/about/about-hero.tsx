"use client";

import { motion } from "framer-motion";
import { Heading } from "@/components/ui/heading";
import { Subtitle } from "@/components/ui/subtitle";
import { aboutHero } from "@/data/about";

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-muted/20">
      <div className="container relative py-16 md:py-24 lg:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Subtitle variant="light">{aboutHero.subtitle}</Subtitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Heading
              variant="display"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-none"
            >
              {aboutHero.title}
            </Heading>
          </motion.div>
          <motion.p
            className="mx-auto max-w-2xl text-lg md:text-xl font-light leading-relaxed text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {aboutHero.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
