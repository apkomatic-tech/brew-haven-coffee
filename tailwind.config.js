module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#5E7FFF',
        primarydark: '#526ed9',
        primaryOpaque: '#9db1fd',
        secondary: '#FFDE5E',
        secondaryOpaque: '#F7E7AA',
        mainBgColor: '#fffaec'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
