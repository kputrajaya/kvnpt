const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: () => ({
        'custom-dark':
          'linear-gradient(to bottom, rgba(23, 23, 23, .2) 40%, rgba(23, 23, 23, 1) 60%), ' +
          `url('https://ik.imagekit.io/kvn/bg_dark_kZ3_8nAqw.jpg')`,
        'custom-light':
          'linear-gradient(to bottom, rgba(245, 245, 245, .2) 40%, rgba(245, 245, 245, 1) 60%), ' +
          `url('https://ik.imagekit.io/kvn/bg_light_u6a3rn9yA.jpg')`,
      }),
      colors: {
        gray: colors.neutral,
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
  plugins: [],
};
