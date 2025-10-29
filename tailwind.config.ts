import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{mdx,md}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-contrast": "rgb(var(--color-primary-contrast) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-contrast": "rgb(var(--color-accent-contrast) / <alpha-value>)",
        mint: "rgb(var(--color-mint-100) / <alpha-value>)",
        "mint-soft": "rgb(var(--color-mint-200) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        slate: {
          700: "rgb(var(--color-slate-700) / <alpha-value>)",
          900: "rgb(var(--color-slate-900) / <alpha-value>)"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-playfair)", ...fontFamily.serif]
      },
      borderRadius: {
        "2xl": "var(--radius-lg)",
        "3xl": "var(--radius-xl)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        focus: "var(--shadow-focus)"
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.22,1,0.36,1)"
      },
      transitionDuration: {
        snappy: "180ms"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate")
  ]
};

export default config;
