// tailwind.config.js

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // tambahkan js/jsx juga (bukan hanya ts/tsx)
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ===== Custom Colors =====
      colors: {
        background: "#171717",
        main: "#12E6C8",
        secondary: "#A287F4",
      },
      // ===== Custom Font Family =====
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        // Bisa override default:
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      // ===== Animations Aurora =====
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
