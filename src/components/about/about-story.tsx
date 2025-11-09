"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants/about";

export function AboutStory() {
  return (
    <section className="max-w-4xl mx-auto mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {ABOUT_CONTENT.approach}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="bg-card border border-border rounded-lg p-8 md:p-10">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {PERSONAL_INFO.fullBio}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Import this at the top of the file
import { PERSONAL_INFO } from "@/constants/home";
