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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
