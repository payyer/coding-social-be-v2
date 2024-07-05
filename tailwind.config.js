/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
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
      spacing: {
        "nav-height": "var(--nav-height)",
        "modal-height": "calc(100vh - var(--nav-height))"
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00ADB5",
          "secondary": '#393E46',
          "white": '#fff',
          "base-100": '#0e1216',
        },
      },
    ],
  },
  plugins: [require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }), require('daisyui'),],

}

