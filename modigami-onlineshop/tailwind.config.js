module.exports = {
  content: ["./**/*.{html, js}", "./**/**/*.{html, js}"],
  theme: {
    extend: {},
    screens: {
      'xs': '446px',
      'sm': '550px',
      'md': '678px',
      'lg': '768px',
      'xl': '992px',
      '2xl': '1200px'
    }
  },
  plugins: [require('daisyui')],
}
