/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0E1013",
        surface: "#161920",
        surface2: "#1D2129",
        line: "#272C36",
        muted: "#8B93A1",
        signal: "#39FF9D",
        signalDim: "#1B4D38",
        warn: "#FFB020",
        danger: "#FF5C5C",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
