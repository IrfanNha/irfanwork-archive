"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CORE_INTERESTS } from "@/constants/home";
import { Container } from "../ui/container";

const MotionLink = motion.create(Link);

export function HomeCoreInterests() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section ref={ref} className="relative py-24">
      <Container>
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-border">
              Core Interests
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold">
              What I&lsquo;m
              <br />
              Passionate About
            </h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Three interconnected areas that drive my curiosity and shape my
              approach to technology
            </motion.p>
          </motion.div>

          {/* Interests Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {CORE_INTERESTS.map((interest, index) => {
              const Icon = interest.icon; // lucide icon component
              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full p-8 rounded-lg bg-card border border-border hover:border-foreground/20 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      className={`text-4xl mb-6 inline-flex p-3 rounded-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    {/* Title */}
                    <motion.h3 className="text-2xl font-bold mb-4">
                      {interest.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {interest.description}
                    </p>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        Key Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {interest.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: 0.6 + index * 0.1 + skillIndex * 0.05,
                            }}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted border border-border text-foreground/70"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.p className="text-muted-foreground mb-6">
              Want to dive deeper into any of these areas? Let&lsquo;s have a
              conversation!
            </motion.p>

            <MotionLink
              href="/projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium border border-border hover:bg-muted transition-all duration-300"
            >
              <span>Explore My Work</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </MotionLink>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
