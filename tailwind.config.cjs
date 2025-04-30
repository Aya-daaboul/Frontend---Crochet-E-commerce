module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e09ba4",
        secondary: "#f8e6e9",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        flair: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
