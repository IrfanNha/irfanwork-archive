"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { PERSONAL_INFO } from "@/constants/home";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTheme } from "next-themes";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function HomeAbout() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const drives = React.useMemo(
    () => [
      "Philosophy",
      "Clean Code",
      "User Experience",
      "Innovation",
      "Community",
    ],
    []
  );

  return (
    <motion.section ref={ref} className="relative py-24">
      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - Icon */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              className="relative flex items-center justify-center rounded-full bg-card border border-border overflow-visible w-32 h-32 sm:w-36 sm:h-36 md:w-56 md:h-56"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {/* Orbit rings (only render after mounted to avoid SSR mismatch) */}
              {mounted &&
                [1, 1.4, 1.8].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-foreground/10"
                    style={{
                      width: `${100 * scale}%`,
                      height: `${100 * scale}%`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 20 + i * 10,
                      ease: "linear",
                    }}
                  >
                    <motion.span
                      className="absolute top-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.5)",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </motion.div>
                ))}

              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 border-2 border-foreground/20 rounded-full flex items-center justify-center bg-background">
                {mounted && (
                  <Image
                    src={theme === "dark" ? "/icon-light.svg" : "/icon.svg"}
                    alt="Site Logo"
                    width={40}
                    height={40}
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    priority
                  />
                )}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <Badge variant="outline" className="border-border">
                About Me
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Crafting Digital
                <br />
                Experiences
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {PERSONAL_INFO.fullBio}
            </motion.p>

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
                    <Badge variant="outline" className="border-border">
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" asChild>
                  <a href={`mailto:${PERSONAL_INFO.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </a>
                </Button>
              </motion.div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  Connect with me:
                </span>
                <div className="flex gap-3 flex-wrap">
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
                          animate={
                            isInView ? { opacity: 1, scale: 1 } : undefined
                          }
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Icon className="w-4 h-4" />
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
