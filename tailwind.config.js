/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navBackground: 'var(--nav-background)',
        primary: {
          DEFAULT: 'var(--primary-color)',
          text: 'var(--primary-text)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          text: 'var(--secondary-text)',
        },
        content: {
          base: 'var(--content-base)',
          highlight: 'var(--content-highlight)',
          secondary1: 'var(--content-secondary-1)',
          secondary2: 'var(--content-secondary-2)',
          secondary3: 'var(--content-secondary-3)',
          accent1: 'var(--content-accent-1)',
          accent2: 'var(--content-accent-2)',
          accent3: 'var(--content-accent-3)',
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
