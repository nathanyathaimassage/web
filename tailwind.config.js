/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5E3C',
        secondary: '#D4A96A',
        dark: '#333333',
        light: '#FDF6EE',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-thai)', 'Inter', 'Noto Sans Thai', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
