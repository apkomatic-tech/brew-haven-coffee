module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0C69FF',
        primarydark: '#0055DE',
        primaryOpaque: '#9db1fd',
        secondary: '#FFD050',
        secondaryOpaque: '#FFF1CB',
        mainBgColor: '#FFFAEE'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
