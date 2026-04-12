import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ink — anchor charcoal pulled from the pedicure chair & logo linework
        ink: {
          DEFAULT: "#0e1117",
          900: "#0b0e14",
          800: "#121620",
          700: "#1a2030",
          600: "#232a3d",
          500: "#2e3750",
        },
        // Porcelain — warm off-white pulled from the mural's negative space
        porcelain: {
          DEFAULT: "#f6f4ef",
          50: "#fbfaf6",
          100: "#f6f4ef",
          200: "#ecece6",
          300: "#dddcd3",
          400: "#c8c7bc",
          500: "#aaa99e",
        },
        // Mist — powder blue sampled directly from the floral mural
        mist: {
          DEFAULT: "#a9c2d8",
          50: "#eef4fa",
          100: "#dae7f1",
          200: "#c5d7e7",
          300: "#a9c2d8",
          400: "#89a8c4",
          500: "#6a8ead",
          600: "#4f7694",
          700: "#3c5e79",
        },
        // Indigo — deep steel-blue from the darker petals in the mural
        indigo: {
          DEFAULT: "#2d4057",
          50: "#dfe4eb",
          100: "#b8c2d0",
          200: "#8494a9",
          300: "#586c84",
          400: "#3c5270",
          500: "#2d4057",
          600: "#1f2f42",
          700: "#14202f",
        },
        // Stone — the gray-blue wall tone
        stone: {
          DEFAULT: "#c6ccd4",
          50: "#eef0f3",
          100: "#e0e3e8",
          200: "#c6ccd4",
          300: "#a6afbb",
          400: "#828c9b",
          500: "#636d7c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        eyebrow: ["var(--font-eyebrow)", "serif"],
      },
      letterSpacing: {
        "tightest-2": "-0.035em",
        "tightest-3": "-0.045em",
        "tightest-4": "-0.055em",
        "widest2": "0.24em",
        "widest3": "0.38em",
        "widest4": "0.52em",
      },
      fontSize: {
        "hero-xl": ["clamp(3.8rem, 11vw, 11rem)", { lineHeight: "0.88" }],
        "hero-lg": ["clamp(3.2rem, 8.5vw, 8.5rem)", { lineHeight: "0.92" }],
        "display-lg": ["clamp(2.6rem, 5.5vw, 5rem)", { lineHeight: "1" }],
        "display-md": ["clamp(2rem, 3.6vw, 3.2rem)", { lineHeight: "1.08" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.18" }],
      },
      spacing: {
        "section": "clamp(5.5rem, 9vw, 9.5rem)",
        "section-lg": "clamp(7rem, 12vw, 13rem)",
      },
      backgroundImage: {
        "grain": "url('/assets/grain.svg')",
        "petal":
          "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(169,194,216,0.35), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 40%, rgba(45,64,87,0.22), transparent 70%), radial-gradient(ellipse 70% 70% at 40% 95%, rgba(169,194,216,0.18), transparent 70%)",
      },
      boxShadow: {
        "mist-glow":
          "0 30px 120px -40px rgba(45,64,87,0.45), 0 10px 40px -25px rgba(169,194,216,0.45)",
        "porcelain-lift":
          "0 60px 120px -60px rgba(20,32,47,0.55), 0 30px 60px -40px rgba(20,32,47,0.35)",
        "soft-float":
          "0 1px 2px rgba(20,32,47,0.06), 0 12px 32px -12px rgba(45,64,87,0.18), 0 30px 60px -30px rgba(45,64,87,0.22)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring-2": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-8px,0) rotate(0.4deg)" },
        },
      },
      animation: {
        "rise-in": "rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "drift": "drift 9s cubic-bezier(0.37, 0, 0.63, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
