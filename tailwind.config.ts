import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    
    extend: {
      boxShadow: {
        "custom-shadow":
          "0px 3px 3px 0px #7FAA8440",
          "search-shadow": "1px 1px 5px 0px #7FAA844D, -1px -1px 5px 0px #78AB7E4D" 
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      sm: "320px",

      md: "768px",

      lg: "1280px",
    },
    container: {
      center: true,
      padding: {
        sm: "20px",
        md: "20px",
        lg: "165px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
