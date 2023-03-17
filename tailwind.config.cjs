/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, html}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Tilt Warp"', "cursive"],
        global: ['"Jost"', "cursive"],
      },
      gridTemplateRows: {
        // Set the first line to 6rem(navigation, search), rest auto
        layout: "6rem auto",
      },
    },
  },
  plugins: [],
};
