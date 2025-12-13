import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        didact: ["Didact Gothic", "sans-serif"],
      },
      colors: {
        
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default tailwindConfig;
