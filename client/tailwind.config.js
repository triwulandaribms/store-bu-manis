/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          "brown-light": "#D2B48C",
          "warm-gray": "#EAEAEA",
          teal: "#5F9EA0",
        },
        fontFamily: {
          pacifico: ["Pacifico", "cursive"],
          roboto: ["Roboto", "sans-serif"],
          lato: ["Lato", "sans-serif"],
          montserrat: ["Montserrat", "sans-serif"],
          playfair: ["Playfair Display", "serif"],
          poppins: ["Poppins", "sans-serif"],
          caveat: ["Caveat", "cursive"],
        },
      },
    },
    plugins: [],
  };
  