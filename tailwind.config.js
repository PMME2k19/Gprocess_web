module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accent':'#2E3361',
        'btn-secundary': '#F0F0F0'
      },
      gridTemplateColumns: {
        '16': 'repeat(2, minmax(0, 16rem))',
        '17': 'repeat(2, minmax(0, max-content))'
      }
    },
  },
  plugins: [],
}
