import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { lg: "1220px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#398D8E",
          dark: "#0b3fcc",
          gray: "#F3F3F3",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
