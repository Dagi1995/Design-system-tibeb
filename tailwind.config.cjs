/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,html}", // adjust paths to match your files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
