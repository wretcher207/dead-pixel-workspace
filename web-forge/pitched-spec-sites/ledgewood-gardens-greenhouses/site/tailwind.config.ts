import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moss: "#2F5D4E",
        sage: "#6C8A73",
        eucalyptus: "#A9BFA5",
        ivory: "#F7F3E9",
        cream: "#EFE8D4",
        charcoal: "#1F2A24",
        bark: "#3E2F24",
        marigold: "#E9A84C",
        coral: "#E96B52",
        rose: "#D56A8A",
        mauve: "#A88096",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      letterSpacing: {
        display: "-0.02em",
        heading: "-0.015em",
        eyebrow: "0.18em",
      },
      boxShadow: {
        elevated: "0 12px 32px rgba(47,93,78,0.12)",
        floating:
          "0 24px 60px -20px rgba(47,93,78,0.28), 0 8px 24px -12px rgba(47,93,78,0.18)",
        "inset-soft": "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        site: "1240px",
        prose: "62ch",
      },
      spacing: {
        section: "7.5rem",
        "section-sm": "4.5rem",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
