/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Стол и бумага
        table: "#F1EDF7",
        paper: "#FFFFFF",
        line: "#DDD6EC",
        // Чернила
        ink: "#1E1633",
        "ink-soft": "#5E5675",
        // Акценты
        cherry: "#D92D47",
        cobalt: "#3340E0",
        sun: "#FFC93C",
      },
      fontFamily: {
        sans: ['"Golos Text"', "system-ui", "sans-serif"],
        display: ['"Yeseva One"', "Georgia", "serif"],
      },
      borderRadius: {
        card: "28px",
        tile: "20px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(30,22,51,.08), 0 14px 30px -14px rgba(30,22,51,.38)",
        lift: "0 1px 0 rgba(30,22,51,.06), 0 8px 18px -10px rgba(30,22,51,.28)",
      },
    },
  },
  plugins: [],
};
