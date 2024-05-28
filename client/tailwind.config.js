/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        secondary: "#2a9d8f",
        "accent-one": "#e9c46a",
        "accent-two": "#f4a261",
      },
    },
    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
