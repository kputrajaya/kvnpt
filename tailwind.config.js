const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        print: {
          raw: 'print',
        },
      },
      colors: {
        gray: colors.trueGray,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
