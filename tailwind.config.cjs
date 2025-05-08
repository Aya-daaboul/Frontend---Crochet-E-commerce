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
    extend: {
      animation: {
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
