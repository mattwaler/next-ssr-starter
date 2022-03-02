// tailwind.config.js
module.exports = {
  content: ['./src/**/*'],
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    debugScreens: {
      position: ['bottom', 'right'],
      style: {
        backgroundColor: '#facc15',
        borderRadius: '2px',
        boxShadow: 'none',
        color: 'black',
        fontSize: '14px',
        padding: '6px',
      },
    },
    extend: {},
  },
}
