/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

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
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("current", "&.active");
    })
  ],
};
