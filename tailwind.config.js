/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#00ADB5',
        "second-background": "#2b2d30",
        "background": "#0e1216",
        "text": "#c8c9ca",
        "border": "#e5e7eb",
        "input-background": "#1c1f26"
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' })],

}

