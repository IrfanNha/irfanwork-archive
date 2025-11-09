"use client";

import { motion } from "framer-motion";
import { ABOUT_STATS } from "@/constants/about";

export function AboutStats() {
  return (
    <section className="max-w-6xl mx-auto mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ABOUT_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 mb-4">
              <stat.icon className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
