"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants/about";
import { BookOpen, Star, Handshake, Target } from "lucide-react"; // 🧩 Import ikon dari lucide-react

export function AboutValues() {
  const ICONS = [BookOpen, Star, Handshake, Target]; // urutan sesuai index

  return (
    <section className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Values</h2>
        <p className="text-lg text-muted-foreground">
          Principles that guide my work and life
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {ABOUT_CONTENT.values.map((value, index) => {
          const Icon = ICONS[index] || BookOpen; // fallback ikon default
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-lg p-8 h-full hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  {/* Icon container */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                    <Icon className="w-6 h-6 text-foreground/80" />
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-foreground/80 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
