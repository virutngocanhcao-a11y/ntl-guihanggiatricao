import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f2255",
          dark: "#0a1a3a",
          light: "#16307a",
        },
        gold: {
          DEFAULT: "#f5b800",
          light: "#ffc700",
        },
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
