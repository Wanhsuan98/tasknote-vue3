/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        surface: '#0f172a',
        foreground: '#e2e8f0',
        'muted-foreground': '#94a3b8',
      },
    },
  },
  plugins: [],
}
