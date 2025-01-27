/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        panelBg: '#3B3B3B', // Couleur du fond du panneau
        panelBorder: '#6B6B6B', // Couleur de bordure grise
        gold1: '#D4AF37',   // Or foncé
        gold2: '#FFD700',   // Or brillant
        gold3: '#FFFACD',   // Or clair
      },
    },
  },
  plugins: [],
}

