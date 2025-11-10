"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun, Check } from "lucide-react";
import { THEME_OPTIONS, ANIMATION_VARIANTS, MOTION } from "@/constants/index";

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const currentTheme = theme || "system";
  const CurrentIcon = themeIcons[currentTheme as keyof typeof themeIcons];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          whileFocus={{
            boxShadow: "0 0 12px hsl(var(--primary) / 0.5)", // accent glow
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 18,
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0 relative overflow-hidden group border border-transparent hover:border-primary/30 hover:bg-primary/10"
          >
            {/* Gradient sweep on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{
                duration: MOTION.MEDIUM,
                ease: "easeInOut",
              }}
            />

            {/* Animated theme icon */}
            <motion.div
              key={currentTheme}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <CurrentIcon className="h-4 w-4 transition-colors group-hover:text-primary" />
            </motion.div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <AnimatePresence>
        <DropdownMenuContent
          align="end"
          className="w-40 border-border bg-white dark:bg-[#121212] text-foreground shadow-md"
          asChild
        >
          <motion.div
            variants={ANIMATION_VARIANTS.scale}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: MOTION.FAST }}
          >
            <div className="py-1">
              {THEME_OPTIONS.map((option, index) => {
                const Icon =
                  themeIcons[option.value as keyof typeof themeIcons];
                const isSelected = currentTheme === option.value;

                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className="group cursor-pointer relative overflow-hidden"
                    asChild
                  >
                    <motion.div
                      variants={ANIMATION_VARIANTS.slideInLeft}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: MOTION.FAST,
                        delay: index * 0.05,
                      }}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between px-2 py-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                        <span className="text-sm">{option.label}</span>
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: MOTION.FAST }}
                          >
                            <Check className="h-3 w-3 text-primary" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hover background */}
                      <motion.div
                        className="absolute inset-0 bg-primary/10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: MOTION.FAST }}
                      />
                    </motion.div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
