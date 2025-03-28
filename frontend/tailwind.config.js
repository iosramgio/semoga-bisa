/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "maxx-black": "#1D1616",
        "maxx-red": "#8E1616",
        "maxx-red2": "#D84040",
        "maxx-white": "#eeeeee",
        

      }
    },
  },
  plugins: [],
}