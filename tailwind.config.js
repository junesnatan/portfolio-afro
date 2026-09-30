/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF7F2',
        surface: '#FFFFFF',
        'surface-warm': '#F4EFE6',
        terracotta: {
          light: '#E07A5F',
          DEFAULT: '#D95D39',
          dark: '#B84522',
        },
        ochre: {
          light: '#F4A261',
          DEFAULT: '#E9C46A',
          dark: '#D48439',
        },
        savanna: {
          light: '#52B788',
          DEFAULT: '#2A9D8F',
          dark: '#1B4965',
        },
        earth: {
          light: '#6B4F3B',
          DEFAULT: '#3D2619',
          dark: '#21150E',
        },
      },
      fontFamily: {
        script: ['Caveat', 'cursive'],
        title: ['Fraunces', 'Georgia', 'serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(61, 38, 25, 0.12)',
        'warm-lg': '0 20px 40px -15px rgba(217, 93, 57, 0.2)',
      },
      animation: {
        'gentle-float': 'gentleFloat 4s ease-in-out infinite',
      },
      keyframes: {
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
