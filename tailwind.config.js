module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF5112',
        primarydark: '#FF5112',
        primaryOpaque: '#FF5112',
        secondary: '#13FFDB'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
