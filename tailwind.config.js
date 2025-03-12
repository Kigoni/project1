/** @type {import('tailwindcss').Config} */
import process from "process";

export default {
  content: [
    process.env.NODE_ENV === "production"
      ? "./dist/**/*.{js,ts,jsx,tsx,html}"
      : "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
      },
      colors: {
        primary: {
          50: "#F0FDF4",
          100: "#DCFCE7 ",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
    },
  },
  plugins: [],
};
