import type { Config } from "tailwindcss";

import { heroui } from "@heroui/react";
import animate from "tailwindcss-animate";

import themes from "./themes.json";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [animate, heroui(themes)],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      animation: {
        shine: "shine var(--duration) infinite linear",
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        "line-shadow": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "100% -100%" },
        },
      },
    },
  },
};

export default config;
