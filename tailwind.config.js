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
        backgroundColor: '#111',
        borderRadius: '8px',
        boxShadow: 'none',
        color: 'white',
        fontSize: '14px',
        margin: '16px',
        padding: '8px',
      },
    },
    extend: {
      colors: {
        'tt-blue': '#5086B5',
      },
      fontFamily: {
        noto: '"Noto Sans", sans-serif',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
}
