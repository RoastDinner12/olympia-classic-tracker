/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olympia: {
          gold: '#FFD700',
          'gold-light': '#FFE57F',
          'gold-dark': '#C5A000',
          dark: '#0A0A0C',
          card: '#121318',
          border: '#232530',
          accent: '#E63946',
          cyan: '#00F0FF',
          emerald: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Impact', 'Teko', 'Cabinet Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
