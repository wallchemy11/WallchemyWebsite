import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0a09",
        alabaster: "#f2ede4",
        brass: "#c9a66b",
        smoke: "#8c877f",
        ember: "#a5744f"
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
