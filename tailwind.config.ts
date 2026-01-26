import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        alabaster: "rgb(var(--color-alabaster) / <alpha-value>)",
        brass: "rgb(var(--color-brass) / <alpha-value>)",
        smoke: "rgb(var(--color-smoke) / <alpha-value>)",
        ember: "rgb(var(--color-ember) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        luxe: "0.08em"
      }
    }
  },
  plugins: []
};

export default config;
