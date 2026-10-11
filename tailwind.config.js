/** @type {import('tailwindcss').Config} */
// Цвета завязаны на CSS-переменные (см. src/index.css),
// чтобы раздел 18+ мог переключиться на тёмную тему без правок компонентов.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        wine: "rgb(var(--wine) / <alpha-value>)",
        ivory: "#FBF8F3",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(42,37,32,0.04)",
        lift: "0 8px 24px rgba(42,37,32,0.08)",
        cta: "0 4px 16px rgba(198,138,62,0.25)",
        "cta-hover": "0 6px 20px rgba(198,138,62,0.38)",
      },
    },
  },
  plugins: [],
};
