/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        card: "#16161f",
        border: "#26263a",
        amber: "#f59e0b",
        wine: "#dc2626",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Unbounded", "sans-serif"],
      },
    },
  },
  plugins: [],
};