/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./seo/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode palette
        light: {
          bg: "#FAF8F5",
          surface: "#FFFFFF",
          text: "#1F1F1F",
          subtext: "#666666",
          border: "#E7E2D9",
          accent: "#B68D40",
          "accent-hover": "#C99A4B",
          muted: "#F3EFE8",
        },
        // Dark mode palette
        dark: {
          bg: "#111111",
          surface: "#1C1C1C",
          "card-hover": "#262626",
          text: "#F8F8F8",
          subtext: "#BDBDBD",
          border: "#343434",
          accent: "#D0A85C",
          "accent-hover": "#E2BB72",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        soft: "0 24px 60px -20px rgba(31, 31, 31, 0.14)",
        "soft-dark": "0 24px 60px -20px rgba(0, 0, 0, 0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};
