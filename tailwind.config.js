/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '4-50px': 'repeat(4,50px)'
      },
      gridTemplateColumns: {
        // custom
        '2-1/3': '100px minmax(200px,700px)',
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        transparent: 'transparent',
        'white': '#fff',
        'gray': {
          'davys': '#4a4a4a',
          'dim': '#707070',
          'silver': '#cecece',
          'smoke': '#f2f2f2',
          'light': '#eeeeee',
        },
        'red': {
          'upsdell': '#b22929',
          'peri': '#c82e2e',
          'geraldine': '#ea6969',
          'light-coral': '#e68181',
          'vanilla-ice': '#f0d1d1'
        },
        'blue': {
          'pacific': '#10A4B9',
          'middleBlue': '#6bb9c4',
          'corsican':'#18344c',
          'green': '#10A4B9',
          'bCerulean': '#2294d2',
          'prussian': '#002d42',
          'whale':'#002d42',
          'steel': '#4c7e9f',
          'columbia': '#b7cede',
          'alice': '#e0e7ec',
          'antiFlash': '#eff3f5',
        },

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
