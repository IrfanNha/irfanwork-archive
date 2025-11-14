"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 600);
          return 100;
        }
        return old + 1.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center dark:bg-[#0b0b0b] bg-[#ffffff] z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* === Elegant Orbit Background === */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 1.5, 2].map((scale, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-black/10 dark:border-white/10"
                style={{
                  width: `${12 * scale}rem`,
                  height: `${12 * scale}rem`,
                  borderWidth: "1px",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 30 + i * 10,
                  ease: "linear",
                }}
              >
                <motion.span
                  className="absolute top-[-3px] left-1/2 w-[0.44rem] h-[0.44rem] rounded-full 
             bg-[#121212]/85 dark:bg-white/85"
                  style={{
                    transform: "translate(-50%, calc(-100% + 1px)) scale(1.05)",
                  }}
                  animate={{ scale: [1.05, 1.15, 1.05] }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* === Content === */}
          <div className="w-full max-w-md px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <motion.h1
                className="text-3xl font-medium tracking-[0.25em] dark:text-white text-black uppercase"
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.25em", opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Irfanwork
              </motion.h1>
            </motion.div>

            {/* Progress Line */}
            <div className="relative">
              <div className="w-full h-[1px] dark:bg-white/20 bg-black/20" />
              <motion.div
                className="absolute top-0 left-0 h-[1px] dark:bg-white bg-black"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              />
            </div>

            {/* Percentage Text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-[10px] tracking-[0.3em] dark:text-white/80 text-black/80 uppercase font-light">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
