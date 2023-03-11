/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, html}", "./index.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Set the first line to 4rem(navigation, search), rest auto
        layout: "4rem auto",
      },
    },
  },
  plugins: [],
};
