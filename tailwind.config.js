/** @type {import('tailwindcss').Config} */
import process from "process";

export default {
  content: [
    process.env.NODE_ENV === "production"
      ? "./dist/**/*.{js,ts,jsx,tsx,html}"
      : "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
      colors: {
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5 ',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
