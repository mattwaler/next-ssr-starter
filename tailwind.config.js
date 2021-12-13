// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {},
  },
}
