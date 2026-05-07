import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        diary: {
          background: "#f8f5f1",
          card: "#ffffff",
          primary: "#5c3d2e",
          primaryHover: "#4b3124",
          secondary: "#ede0d4",
          accent: "#c08b5c",
          muted: "#6b7280",
        },
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },

      boxShadow: {
        diary: "0 10px 30px rgba(0,0,0,0.08)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;