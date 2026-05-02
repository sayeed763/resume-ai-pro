/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8a96e',
          light: '#dfc694',
          dark: '#a68a52',
        },
        dark: {
          DEFAULT: '#171717',
          surface: '#262626',
          border: '#2F2F2F',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c8a96e 0%, #a68a52 100%)',
      }
    },
  },
  plugins: [],
}
