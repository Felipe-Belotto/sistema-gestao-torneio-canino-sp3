import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02132f",
        secundary: "#ffca54",
      },
      textColor: {
        primary: "#FFFFFF",
        secundary: "#ffca54",
      },
      backgroundColor: {
        primary: "#02132f",
        secundary: "#ffca54",
        tertiary: "#354258",
        foreground: "#e6e7ea",
      },
      borderRadius: {
        xl: "32px",
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
