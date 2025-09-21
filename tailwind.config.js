/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define your custom font family here
        // The first name is your custom utility class name (e.g., 'font-poppins')
        // The second name is the font family name that you're referencing from Google Fonts
        poppins: ["Poppins", "sans-serif"], 
      },
    },
  },
  plugins: [],
}
