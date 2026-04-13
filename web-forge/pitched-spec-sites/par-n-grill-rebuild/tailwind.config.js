export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clubhouse: "#2D5A3D",
        gold: "#D4A843",
        charcoal: "#1A1A1A",
        cream: "#FAF8F5",
        burgundy: "#7A2C3D",
        sage: "#B8C5A8"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        script: ["Dancing Script", "cursive"]
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(212,168,67,0.2), 0 8px 24px rgba(212,168,67,0.25)"
      }
    }
  },
  plugins: []
};
