module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#3D6C5B",
        secondary: {
          100: "#1E1F25",
          900: "#131517"
        },
        content_color: "#f5f8fa",
      },
      animation: {
        'rotate-90': 'rotate-90 5s',
      },
    },
  },
  plugins: [],
};