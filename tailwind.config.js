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
      },
      backgroundImage: (theme) => ({
        'custom-dark': `linear-gradient(to bottom, rgba(23, 23, 23, 0) 40%, rgba(23, 23, 23, 1) 60%), url('/images/background-dark.jpg')`,
        'custom-light': `linear-gradient(to bottom, rgba(245, 245, 245, 0) 40%, rgba(245, 245, 245, 1) 60%), url('/images/background-light.jpg')`,
      }),
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
      opacity: ['dark', 'responsive'],
    },
  },
  plugins: [],
}
