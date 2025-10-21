/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'umd-red': '#E21833',
        'umd-black': '#000000',
        'umd-gold': '#FFD200',
      }
    },
  },
  plugins: [],
}