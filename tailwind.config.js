/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      screens: {
        'md-phone': '410px'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["business", "corporate"],
  },
};
