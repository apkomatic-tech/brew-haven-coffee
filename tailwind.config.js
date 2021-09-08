module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#7209B7',
        primarydark: '#5F0998',
        primaryOpaque: 'rgba(113, 9, 183, 0.13)',
        secondary: '#F4FA9C'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
