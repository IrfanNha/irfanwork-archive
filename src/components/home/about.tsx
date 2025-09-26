"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  BarChart3,
} from "lucide-react";
import { PERSONAL_INFO } from "@/constants/home";
import { Container } from "@/components/ui/container";

// Social icons dipindah keluar biar nggak recreate tiap render
const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function HomeAbout() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // useMemo untuk array statis
  const drives = React.useMemo(
    () => ["Philosophy", "Clean Code", "User Experience", "Innovation", "Community"],
    []
  );

  return (
    <motion.section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent" />

      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Icon Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Background decoration */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-radial from-yellow-300/20 via-yellow-400/20 to-transparent blur-3xl -z-10" />

            {/* Main Icon */}
            <motion.div
              className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center rounded-2xl bg-card/80 border border-yellow-500/20 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <BarChart3 className="w-20 h-20 md:w-28 md:h-28 text-yellow-600" />
            </motion.div>

            {/* Floating element - Status */}
            <motion.div
              className="absolute -top-4 -right-0.5 bg-card/90 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 shadow-lg"
              animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Available</span>
              </div>
            </motion.div>

            {/* Floating element - Location */}
            <motion.div
              className="absolute -bottom-6 -left-0 bg-card/90 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 shadow-lg"
              animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-yellow-600">
                <span>📍</span>
                <span>Indonesia</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <Badge
                variant="outline"
                className="border-yellow-500/30 text-yellow-600 bg-yellow-500/5"
              >
                About Me
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold">
                Crafting Digital
                <br />
                <span className="text-yellow-400">
                  Experiences
                </span>
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full origin-left"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {PERSONAL_INFO.fullBio}
            </motion.p>

            {/* Skills/Interests preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-foreground">What drives me:</h4>
              <div className="flex flex-wrap gap-2">
                {drives.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="border-yellow-500/20 text-yellow-600 hover:bg-yellow-500/5 transition-colors"
                    >
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              {/* Email CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-xl transition-all duration-300 group"
                  asChild
                >
                  <a href={`mailto:${PERSONAL_INFO.email}`}>
                    <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Get In Touch
                  </a>
                </Button>
              </motion.div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Connect with me:
                </span>
                <div className="flex gap-3">
                  {Object.entries(PERSONAL_INFO.socialLinks).map(
                    ([platform, url], index) => {
                      const Icon =
                        SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS];
                      if (!Icon || !url) return null;

                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-card/50 border border-yellow-500/20 flex items-center justify-center hover:bg-yellow-500/10 hover:border-yellow-500/40 transition-all duration-300 group"
                        >
                          <Icon className="w-4 h-4 group-hover:text-yellow-600 transition-colors" />
                        </motion.a>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
