const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1200px",
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      }
    },
  },
  variants: {
    typography: ['dark'],
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
