/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public /index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      stone: '#f5f5f4',
      white: '#ffffff',
      red: '#dc2626',
      zinic800: '#27272a',
      
      // Buttons 
      violet400: '#a78bfa',
      violet900: '#4c1d95',
      purple900: '#581c87',

      orange400: '#fb923c',
      green: '#22c55e',
      purple: '#7e22ce',
      yellow: '#eab308'
    },
    extend: {},
  },

  plugins: [],
}