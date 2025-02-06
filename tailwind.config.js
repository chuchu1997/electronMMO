/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#3170BD'
      }
    }
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography'), require('daisyui')]
}
