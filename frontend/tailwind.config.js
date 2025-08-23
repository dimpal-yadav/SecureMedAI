/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          800: '#1E40AF',
        },
      },
      keyframes: {
        slideUp: {
      '0%': { transform: 'translateY(50px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
  animation: {
        slideUp: 'slideUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
