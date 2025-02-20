import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF735F",
        secondary: "#445B64",
        // darkBg: "#1E293B", // Dark mode background
        // darkText: "#E2E8F0", // Dark mode text color
        accent: "#FFC145", // A warm, energetic accent color
        background: "#F8F9FA", // Light background for readability
        text: "#2E2E2E", // Dark text for contrast
      },
    },
  },
  plugins: [],
} satisfies Config;
