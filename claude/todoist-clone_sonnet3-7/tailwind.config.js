/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1E1F25",
          card: "#2D2E36",
          text: "#E4E6EB",
          muted: "#9CA3AF",
          border: "#3F3F46",
          accent: "#E34935",
        },
      },
    },
  },
  plugins: [],
};
