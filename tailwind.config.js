/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robomono: ["Roboto Mono", "monospace"], // custom font
      },
    },
  },
  plugins: [],
}
