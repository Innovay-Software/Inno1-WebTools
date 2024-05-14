import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#0d6efd',
        'secondary': '#6c757d',
        'success': '#198754',
        'info': '#5272FF',
        'warning': '#ffc107',
        'error': '#dc3545',
        'light': '#f8f9fa',
        'dark': '#212529',
      }
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(black|white|primary|secondary|info|success|warning|error|light|dark|gray|transparent)/
  }]
};
export default config;
