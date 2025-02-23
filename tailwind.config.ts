import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /scale-(100|110|125|150)/ },
    { pattern: /-top-([0-9]+)/ },
    { pattern: /-top-\[\d+px\]/ },
    { pattern: /left-([0-9]+)/ },
    { pattern: /text-(sm|md|lg|xl|2xl|3xl|4xl|5xl)/ },
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Archivo: ["Archivo Black", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
