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
        "custom-shadow": "0px -1px 4px 0px #11111126",

        "search-shadow": "1px 1px 8px 0px #11111126",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
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
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
    screens: {
      mobile_s: "319px",
      mobile_m: "375px",
      sm: "319px",
      md: "768px",
      lg: "1280px",
    },
    container: {
      center: true,
      padding: {
        mobile_s: "16px",
        mobile_m: "16px",
        sm: "16px",
        md: "16px",
        lg: "16px",
      },
    },
  },
} satisfies Config;

export default config;
