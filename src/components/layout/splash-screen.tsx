"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 400); // kasih delay biar animasinya smooth
          return 100;
        }
        return old + 2;
      });
    }, 40); // speed loading
    return () => clearInterval(timer);
  }, []);

  if (done) return null; // hilangin splash screen setelah selesai

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-999"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Irfanwork
      </motion.h1>

      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
    </motion.div>
  );
}
