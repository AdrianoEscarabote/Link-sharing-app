/** @type {import("tailwindcss").Config } */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark_purple: "#633CFF",
        light_purple: "#EFEBFF",
        super_light_purple: "#BEADFF",
        almost_dark: "#333333",
        gray: "#737373",
        light_gray: "#D9D9D9",
        almost_white: "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939",
      },
    },
  },
  plugins: [],
};
