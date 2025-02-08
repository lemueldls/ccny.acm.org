import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

import typography from "@tailwindcss/typography";
// import forms from "@tailwindcss/forms";

import animate from "tailwindcss-animate";

import { heroui } from "@heroui/react";
import plugin from "tailwindcss/plugin";

const colors = {
  primary: {
    "50": "#efeaf8",
    "100": "#d8ccee",
    "200": "#c1aee4",
    "300": "#ab91db",
    "400": "#9473d1",
    "500": "#7d55c7",
    "600": "#6746a4",
    "700": "#513781",
    "800": "#3b285f",
    "900": "#261a3c",
    // foreground: "#fff",
    DEFAULT: "#7d55c7",
  },
  secondary: {
    "50": "#e7f6fc",
    "100": "#c5e9f7",
    "200": "#a3ddf2",
    "300": "#81d0ed",
    "400": "#5fc4e9",
    "500": "#3db7e4",
    "600": "#3297bc",
    "700": "#287794",
    "800": "#1d576c",
    "900": "#123744",
    // foreground: "#000",
    DEFAULT: "#3db7e4",
  },
  success: {
    "50": "#eef6df",
    "100": "#d7eab3",
    "200": "#c0dd86",
    "300": "#a9d159",
    "400": "#91c42d",
    "500": "#7ab800",
    "600": "#659800",
    "700": "#4f7800",
    "800": "#3a5700",
    "900": "#253700",
    // foreground: "#000",
    DEFAULT: "#7ab800",
  },
  warning: {
    "50": "#fef9e8",
    "100": "#fbf1c7",
    "200": "#f9e8a7",
    "300": "#f7e086",
    "400": "#f5d766",
    "500": "#f3cf45",
    "600": "#c8ab39",
    "700": "#9e872d",
    "800": "#736221",
    "900": "#493e15",
    // foreground: "#000",
    DEFAULT: "#f3cf45",
  },
  danger: {
    "50": "#f3e5e6",
    "100": "#e2c1c4",
    "200": "#d19da1",
    "300": "#c0787e",
    "400": "#af545c",
    "500": "#9e3039",
    "600": "#82282f",
    "700": "#671f25",
    "800": "#4b171b",
    "900": "#2f0e11",
    // foreground: "#fff",
    DEFAULT: "#9e3039",
  },
  focus: "#9093CE",
};

const config: Config = {
  content: [
    "./index.html",

    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // NextUI module
    // "./node_modules/primereact/**/*.{js,ts,jsx,tsx}", // PrimeReact module
    // "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        default: ["var(--font-inter)", ...fontFamily.sans],
        cal: ["var(--font-cal)", ...fontFamily.sans],
        title: ["var(--font-title)", ...fontFamily.sans],
        lora: ["var(--font-lora)", ...fontFamily.serif],
        work: ["var(--font-work-sans)", ...fontFamily.sans],
        lato: ["var(--font-lato)", ...fontFamily.sans],
        majorMonoDisplay: [
          "var(--font-major-mono-display)",
          ...fontFamily.mono,
        ],
        ppNeueMachinaInktrack: [
          "var(--font-pp-neue-machina-inktrack)",
          ...fontFamily.sans,
        ],
        ppNeueMachinaPlain: [
          "var(--font-pp-neue-machina-plain)",
          ...fontFamily.sans,
        ],
        mono: ["Consolas", ...fontFamily.mono],
      },
      animation: {
        shine: "shine var(--duration) infinite linear",
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
      },
    },
  },
  // safelist: [
  //   {
  //     pattern:
  //       /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  //   {
  //     pattern:
  //       /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  //   {
  //     pattern:
  //       /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  // ],
  darkMode: ["class"],
  plugins: [
    typography,
    // forms,
    animate,
    heroui({
      themes: {
        dark: { extend: "dark", colors },
        light: { extend: "light", colors },
      },
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};

export default config;
