/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3490dc', 
        'secondary': '#f0f0f0', 
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'], 
        'serif': ['Merriweather', 'serif'], 
      },
    },
  },
  plugins: [],
}