const colors = require('tailwindcss/colors');

const imagePrefix = 'https://ik.imagekit.io/kvn/https://kvn.pt';

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'custom-dark':
          'linear-gradient(to bottom, rgba(23, 23, 23, .2) 40%, rgba(23, 23, 23, 1) 60%), ' +
          `url('${imagePrefix}/images/background-dark.jpg')`,
        'custom-light':
          'linear-gradient(to bottom, rgba(245, 245, 245, .2) 40%, rgba(245, 245, 245, 1) 60%), ' +
          `url('${imagePrefix}/images/background-light.jpg')`,
      }),
      colors: {
        gray: colors.trueGray,
        red: {
          500: '#C83939',
        },
      },
      inset: {
        '-0.25': '-0.0625rem',
      },
      lineHeight: {
        0: '0',
      },
      screens: {
        print: {
          raw: 'print',
        },
      },
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
};
