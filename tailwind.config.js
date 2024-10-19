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
    },
  },
  plugins: [],
};
