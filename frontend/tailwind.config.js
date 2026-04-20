/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0C10",
        darkCard: "rgba(31, 40, 51, 0.7)",
        primaryNeon: "#45A29E",
        secondaryNeon: "#66FCF1",
        accentNeon: "#C5C6C7"
      },
      animation: {
        'float': 'float 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
