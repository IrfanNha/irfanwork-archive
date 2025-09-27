"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Sparkles, Zap} from "lucide-react";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const mouseRef = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { damping: 15 });

  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const loadingMessages = useMemo(() => [
    "Initializing...",
    "Loading assets...",
    "Preparing experience...",
    "Almost ready...",
    "Welcome!"
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 800);
          return 100;
        }
        return old + 1.5;
      });
    }, 30);

    // Update loading text based on progress
    const textTimer = setInterval(() => {
      const messageIndex = Math.min(Math.floor(progress / 20), loadingMessages.length - 1);
      setLoadingText(loadingMessages[messageIndex]);
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [progress, loadingMessages]);

  useEffect(() => {
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseRef.current = { x: clientX, y: clientY };
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
      
      // Use requestAnimationFrame for smooth updates
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const px = (clientX - innerWidth / 2) * 0.01;
        const py = (clientY - innerHeight / 2) * 0.01;
        setParallax({ x: px, y: py });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mouseX, mouseY]);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        perspective: 1000,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs - reduced for better performance */}
        {[...Array(3)].map((_, i) => {
          const size = 120 + i * 40;
          const left = 20 + i * 30;
          const top = 30 + i * 25;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 blur-xl"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                x: [0, 30 - i * 10, 0],
                y: [0, 20 - i * 5, 0],
                scale: [1, 1.1 + i * 0.1, 1],
                opacity: [0.3, 0.5 + i * 0.1, 0.3],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}

        {/* Grid pattern - optimized with CSS */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 193, 7, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 193, 7, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center space-y-8"
        style={{
          transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          willChange: 'transform',
        }}
      >
        {/* Logo/Brand */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-yellow-400/30 to-amber-500/30 rounded-full blur-2xl"
            style={{ willChange: 'transform, opacity' }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.h1
            className="text-4xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Irfanwork
          </motion.h1>

          {/* Floating icons around logo */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Code className="w-8 h-8 text-yellow-500" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -360, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Sparkles className="w-6 h-6 text-amber-500" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-8"
            animate={{
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Zap className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Loading progress */}
        <motion.div
          className="w-80 max-w-sm space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Progress bar container */}
          <div className="relative">
            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 rounded-full relative"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
            
            {/* Progress percentage */}
            <motion.div
              className="absolute -top-8 right-0 text-sm font-medium text-muted-foreground"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.p
            className="text-center text-muted-foreground text-sm font-medium"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-yellow-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-yellow-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-yellow-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-yellow-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      />
    </motion.div>
  );
}
