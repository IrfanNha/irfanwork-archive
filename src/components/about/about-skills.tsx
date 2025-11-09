"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/constants/about";

export function AboutSkills() {
  return (
    <section className="max-w-6xl mx-auto mb-20 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
          Skills & Expertise
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Technologies and skills I work with
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {SKILLS.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-shadow"
          >
            {/* Category Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
              {skillGroup.category}
            </h3>

            {/* Skills List */}
            <div className="space-y-2">
              {skillGroup.items.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + skillIndex * 0.05,
                  }}
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground group"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/40 group-hover:bg-foreground transition-colors" />
                  <span className="group-hover:text-foreground transition-colors leading-snug">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
