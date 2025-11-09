"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeftCircle } from "lucide-react";
import { MOTION, ANIMATION_VARIANTS } from "@/constants";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-[80vh] flex items-center">
      <Container className="py-24">
        <div className="grid gap-10 lg:grid-cols-2 items-center max-w-4xl mx-auto">
          {/* Left: Icon */}
          <motion.div
            variants={ANIMATION_VARIANTS.scale}
            initial="hidden"
            animate="visible"
            transition={{ duration: MOTION.MEDIUM }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              className="bg-card border border-border p-10 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowLeftCircle className="w-32 h-32 text-foreground/20" />
            </motion.div>
          </motion.div>

          {/* Right: text + actions */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: MOTION.MEDIUM }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Page Not Found
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed">
              The page you&apos;re looking for could not be found.
              It may have been moved or deleted.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Double-check the URL you entered.</li>
              <li>• Try using the search feature.</li>
              <li>• Or return to the homepage.</li>
            </ul>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="default" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </motion.div>
              </Link>

              <Link href="/blog">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Browse Blog
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}