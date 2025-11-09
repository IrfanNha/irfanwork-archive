"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/constants/about";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

export function AboutTimeline() {
  const education = TIMELINE.filter((item) => item.type === "education");
  const experience = TIMELINE.filter((item) => item.type === "experience");

  return (
    <section className="max-w-6xl mx-auto mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Timeline</h2>
        <p className="text-lg text-muted-foreground">
          My educational background and professional experience
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Education Column */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold mb-6 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
              <span className="text-sm">
                <GraduationCap className="h-6 w-6" />
              </span>
            </div>
            Education
          </motion.h3>
          <div className="space-y-6 relative before:absolute before:left-4 before:top-8 before:bottom-8 before:w-px before:bg-border">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.year}
                      </span>
                      {item.current && (
                        <Badge variant="outline" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {item.organization}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Column */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold mb-6 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
              <span className="text-sm">
                <BriefcaseBusiness className="w-6 h-6" />
              </span>
            </div>
            Experience
          </motion.h3>
          <div className="space-y-6 relative before:absolute before:left-4 before:top-8 before:bottom-8 before:w-px before:bg-border">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.year}
                      </span>
                      {item.current && (
                        <Badge variant="outline" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {item.organization}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
