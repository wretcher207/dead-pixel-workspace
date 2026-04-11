import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0706",
          900: "#0a0706",
          800: "#100b09",
          700: "#17110d",
          600: "#1f1812",
          500: "#2a2018",
        },
        bone: {
          DEFAULT: "#f3ebdd",
          50: "#fbf6ec",
          100: "#f3ebdd",
          200: "#e9dfcb",
          300: "#c7b99e",
          400: "#a8987a",
          500: "#7f715a",
        },
        rose: {
          DEFAULT: "#c79b72",
          50: "#f4e4d2",
          100: "#ecd0b3",
          200: "#e3b48a",
          300: "#d4a077",
          400: "#c79b72",
          500: "#b58560",
          600: "#946a48",
        },
        blush: "#d9a894",
        mute: "#8a7a66",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tightest-2": "-0.035em",
        "tightest-3": "-0.045em",
        widest2: "0.28em",
        widest3: "0.42em",
      },
      fontSize: {
        "hero-lg": ["clamp(3.4rem, 9vw, 9.5rem)", { lineHeight: "0.92" }],
        "hero-md": ["clamp(2.4rem, 6vw, 5.5rem)", { lineHeight: "0.96" }],
        "display-lg": ["clamp(2.4rem, 5.5vw, 5rem)", { lineHeight: "1.02" }],
        "display-md": ["clamp(1.9rem, 3.4vw, 3rem)", { lineHeight: "1.08" }],
      },
      spacing: {
        "section": "clamp(6rem, 10vw, 10rem)",
      },
      backgroundImage: {
        "grain": "url('/assets/grain.svg')",
      },
      boxShadow: {
        "rose-glow": "0 30px 120px -40px rgba(199,155,114,0.45), 0 10px 40px -25px rgba(217,168,148,0.35)",
        "ink-lift": "0 60px 120px -60px rgba(0,0,0,0.9), 0 30px 60px -40px rgba(0,0,0,0.7)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring-2": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
