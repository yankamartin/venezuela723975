/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'v-black':  '#0a0a0a',
        'v-dark':   '#111111',
        'v-gold':   '#C9A227',
        'v-red':    '#CC1B1B',
        'v-blue':   '#1E3A8A',
        'v-ash':    '#8a8a8a',
        'v-dust':   '#3d3d3d',
        'v-white':  '#f0ede8',
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body:    ['Inter', 'Helvetica Neue', 'sans-serif'],
        serif:   ['Crimson Pro', 'Georgia', 'serif'],
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'fadeIn':  'fadeIn 0.6s ease-out forwards',
        'flame':   'flame 2s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(0.98)' },
          '50%':       { opacity: '1',   transform: 'scale(1.02)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        flame: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%':       { transform: 'scaleY(1.1) scaleX(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
