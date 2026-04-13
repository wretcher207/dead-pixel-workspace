import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF6EE",
          warm: "#F5EFE2",
          soft: "#FFFDF8",
        },
        gold: {
          DEFAULT: "#B08A42",
          light: "#D9BC7A",
          deep: "#8C6C2A",
          glow: "#E8D4A0",
        },
        sage: {
          DEFAULT: "#7A8B6C",
          deep: "#5D6B52",
        },
        blush: {
          DEFAULT: "#E8C1B8",
          deep: "#C9877A",
          pale: "#F6E6E1",
        },
        ink: {
          DEFAULT: "#1F1A14",
          soft: "#55483A",
          muted: "#8A7A68",
        },
        line: "#EADFCB",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.025em",
        headline: "-0.035em",
        eyebrow: "0.22em",
      },
      boxShadow: {
        card: "0 30px 60px -30px rgba(176, 138, 66, 0.22), 0 10px 30px -18px rgba(31, 26, 20, 0.12)",
        float: "0 50px 100px -50px rgba(140, 108, 42, 0.28), 0 16px 40px -24px rgba(31, 26, 20, 0.18)",
        ring: "0 0 0 1px rgba(176, 138, 66, 0.25)",
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
