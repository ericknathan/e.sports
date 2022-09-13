/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
      },
      backgroundImage: {
        'galaxy-image': 'url("/background-galaxy.png")',
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 2%, #43E7AD 34%, #E1D55D 98%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
