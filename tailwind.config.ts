import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8A226F",
        'light-primary': "#FFEAFA"
      },
      dropShadow: {
        'custom': "4px 8px 24px #FE2C5533"
      }
    },
  },
  plugins: [],
} satisfies Config;
