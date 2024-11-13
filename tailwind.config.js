/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "san-serif"],
        spaceGrotesk: ["SpaceGrotesk", "san-serif"],
      },
      colors: {
        primaryColor: "#6366F1",
      },
      keyframes: {
        "slide-down-fade-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-down-fade-in": "slide-down-fade-in 300ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
