/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    colors:{
      'primary': "#BFD8FF",
      'secondary': "#8EBAFE",
      'third': "#DFECFF",
      'fourth': "#58588B",
      'font': "#404040",
      'white': "#FFFFFF",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}