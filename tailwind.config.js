/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#080b18',
        panel: 'rgba(255, 255, 255, 0.06)',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(92, 127, 255, 0.18)',
      },
    },
  },
  plugins: [],
};
