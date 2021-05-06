const colors = require('tailwindcss/colors')

const imagePrefix = process.env.HOSTNAME && process.env.IMAGEKIT_ENDPOINT
  ? (process.env.IMAGEKIT_ENDPOINT + process.env.HOSTNAME)
  : ''

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
        red: {
          600:'#CA3939'
        },
      },
      backgroundImage: (theme) => ({
        'custom-dark': `linear-gradient(to bottom, rgba(23, 23, 23, .2) 40%, rgba(23, 23, 23, 1) 60%), url('${imagePrefix}/images/background-dark.jpg')`,
        'custom-light': `linear-gradient(to bottom, rgba(245, 245, 245, .2) 40%, rgba(245, 245, 245, 1) 60%), url('${imagePrefix}/images/background-light.jpg')`,
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
