/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        octosquares: ['"TT Octosquares Trl Cnd"', 'sans-serif'],
        inter: ['"Inter Tight"', 'sans-serif'],
        mono: ['"Inter Tight"', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#F3AF42',
          dark: '#C68C2F',
        },
        dark: '#080808',
      },
    },
  },
  plugins: [],
};
