import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

import animate from "tailwindcss-animate";

import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";

const colors = {
  primary: {
    50: "#f2eaff",
    100: "#d4c4f0",
    200: "#b69fe1",
    300: "#9879d4",
    400: "#7b52c6",
    500: "#6139ad",
    600: "#4c2c87",
    700: "#361f62",
    800: "#20123d",
    900: "#0d041a",
    DEFAULT: "#7D55C7",
  },
  // secondary: {
  //   50: "#ebeeff",
  //   100: "#c9cbec",
  //   200: "#a7a9d9",
  //   300: "#8387c8",
  //   400: "#6064b8",
  //   500: "#474b9e",
  //   600: "#373a7c",
  //   700: "#272959",
  //   800: "#161938",
  //   900: "#070719",
  //   DEFAULT: "#9093CE",
  // },
  secondary: {
    50: "#dcfaff",
    100: "#b5e7fa",
    200: "#8ad6f1",
    300: "#5fc5ea",
    400: "#36b4e3",
    500: "#1c9bc9",
    600: "#0d789e",
    700: "#005672",
    800: "#003547",
    900: "#00131c",
    DEFAULT: "#3DB7E4",
  },
  success: {
    50: "#f4ffdd",
    100: "#e4ffaf",
    200: "#d4ff7f",
    300: "#c3ff4d",
    400: "#b3ff1e",
    500: "#99e607",
    600: "#76b300",
    700: "#548000",
    800: "#324d00",
    900: "#0e1b00",
    DEFAULT: "#7AB800",
  },
  warning: {
    50: "#fff9dd",
    100: "#fbecb3",
    200: "#f7e086",
    300: "#f4d457",
    400: "#f1c72a",
    500: "#d8ae13",
    600: "#a8870b",
    700: "#786105",
    800: "#483a00",
    900: "#1b1300",
    DEFAULT: "#F3CF45",
  },
  danger: {
    50: "#ffe7ec",
    100: "#f2c2c7",
    200: "#e39ca2",
    300: "#d6757e",
    400: "#ca4f59",
    500: "#b03540",
    600: "#8a2931",
    700: "#641c22",
    800: "#3e0f14",
    900: "#1c0204",
    DEFAULT: "#9E3039",
  },
};
const config: Config = {
  content: [
    "./index.html",

    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // NextUI module
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}", // PrimeReact module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        ...colors,

        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            DEFAULT: "#111827", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", {}],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      width: {
        1536: "1536px",
      },
      height: {
        150: "37.5rem",
      },
      margin: {
        30: "7.5rem",
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
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "Cal Sans",
            },
            h2: {
              fontFamily: "Cal Sans",
            },
            h3: {
              fontFamily: "Cal Sans",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": { transform: "translateX(-6px) rotate(-6deg)" },
          "30%": { transform: "translateX(9px) rotate(6deg)" },
          "45%": { transform: "translateX(-9px) rotate(-3.6deg)" },
          "60%": { transform: "translateX(3px) rotate(2.4deg)" },
          "75%": { transform: "translateX(-2px) rotate(-1.2deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.8s both",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  darkMode: "class",
  plugins: [
    typography,
    forms,
    animate,
    nextui({
      themes: { ccny: { extend: "dark", colors } },
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
