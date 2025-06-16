// tailwind.config.js

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
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
        // Override default sans
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      // ===== Custom Box Shadow =====
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
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
