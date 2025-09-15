// constants/themes.ts

// Animation durations
export const MOTION = {
  FAST: 0.2,
  MEDIUM: 0.4,
  SLOW: 0.8,
} as const;

// Framer Motion variants
export const ANIMATION_VARIANTS = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  slideDown: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  slideInLeft: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
  slideInRight: { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  stagger: { visible: { transition: { staggerChildren: 0.1 } } },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Color palette
export const COLORS = {
  BITCOIN: {
    50: "#fffdf0",
    100: "#fffbe6",
    200: "#fff5c2",
    300: "#ffed8f",
    400: "#ffe066",
    500: "#f7931a",
    600: "#e67e22",
    700: "#d68910",
    800: "#b7750f",
    900: "#8b5a0c",
  },
} as const;

// Theme options
export const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "💻" },
] as const;

// Types
export type MotionDuration = keyof typeof MOTION;
export type ThemeOption = (typeof THEME_OPTIONS)[number]["value"];
