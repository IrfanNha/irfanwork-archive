"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/projects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProjectsHero() {
  return (
    <motion.section
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Main Title */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground font-light uppercase tracking-wider">
          {PROJECTS.length} Project{PROJECTS.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
      >
        Explore my collection of projects, from web applications to
        creative experiments. Each project represents a journey of learning,
        building, and growing as a developer.
      </motion.p>
    </motion.section>
  );
}