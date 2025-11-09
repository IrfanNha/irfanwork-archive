"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants/home";
import { ABOUT_CONTENT } from "@/constants/about";

export function AboutHero() {
  return (
    <section className="max-w-6xl mx-auto mb-20">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-border shadow-lg">
            <Image
              src={PERSONAL_INFO.image}
              alt={PERSONAL_INFO.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block"
            >
              <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                About Me
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {PERSONAL_INFO.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground font-light"
            >
              {PERSONAL_INFO.title}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>{ABOUT_CONTENT.intro}</p>
            <p>{ABOUT_CONTENT.mission}</p>
          </motion.div>

          {/* Location & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-6 pt-4 border-t border-border"
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="font-medium">{PERSONAL_INFO.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Email
              </p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-medium hover:text-foreground/80 transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
