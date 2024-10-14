import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

import typography from "@tailwindcss/typography";
// import forms from "@tailwindcss/forms";

import animate from "tailwindcss-animate";

import { nextui } from "@nextui-org/react";
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

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // NextUI module
    // "./node_modules/primereact/**/*.{js,ts,jsx,tsx}", // PrimeReact module
    // "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        ...colors,

        // // light mode
        // tremor: {
        //   brand: {
        //     faint: "#eff6ff", // blue-50
        //     muted: "#bfdbfe", // blue-200
        //     subtle: "#60a5fa", // blue-400
        //     DEFAULT: "#3b82f6", // blue-500
        //     emphasis: "#1d4ed8", // blue-700
        //     inverted: "#ffffff", // white
        //   },
        //   background: {
        //     muted: "#f9fafb", // gray-50
        //     subtle: "#f3f4f6", // gray-100
        //     DEFAULT: "#ffffff", // white
        //     emphasis: "#374151", // gray-700
        //   },
        //   border: {
        //     DEFAULT: "#e5e7eb", // gray-200
        //   },
        //   ring: {
        //     DEFAULT: "#e5e7eb", // gray-200
        //   },
        //   content: {
        //     subtle: "#9ca3af", // gray-400
        //     DEFAULT: "#6b7280", // gray-500
        //     emphasis: "#374151", // gray-700
        //     strong: "#111827", // gray-900
        //     inverted: "#ffffff", // white
        //   },
        // },
        // // dark mode
        // "dark-tremor": {
        //   brand: {
        //     faint: "#0B1229", // custom
        //     muted: "#172554", // blue-950
        //     subtle: "#1e40af", // blue-800
        //     DEFAULT: "#3b82f6", // blue-500
        //     emphasis: "#60a5fa", // blue-400
        //     inverted: "#030712", // gray-950
        //   },
        //   background: {
        //     muted: "#131A2B", // custom
        //     subtle: "#1f2937", // gray-800
        //     DEFAULT: "#111827", // gray-900
        //     emphasis: "#d1d5db", // gray-300
        //   },
        //   border: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   ring: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   content: {
        //     subtle: "#4b5563", // gray-600
        //     DEFAULT: "#6b7280", // gray-600
        //     emphasis: "#e5e7eb", // gray-200
        //     strong: "#f9fafb", // gray-50
        //     inverted: "#000000", // black
        //   },
        // },
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      // boxShadow: {
      //   // light
      //   "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      //   "tremor-card":
      //     "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      //   "tremor-dropdown":
      //     "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      //   // dark
      //   "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      //   "dark-tremor-card":
      //     "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      //   "dark-tremor-dropdown":
      //     "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      // },
      // borderRadius: {
      //   "tremor-small": "0.375rem",
      //   "tremor-default": "0.5rem",
      //   "tremor-full": "9999px",
      // },
      // fontSize: {
      //   "tremor-label": ["0.75rem", {}],
      //   "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
      //   "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
      //   "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      // },
      // width: {
      //   1536: "1536px",
      // },
      // height: {
      //   150: "37.5rem",
      // },
      // margin: {
      //   30: "7.5rem",
      // },
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
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       h1: {
      //         fontFamily: "Cal Sans",
      //       },
      //       h2: {
      //         fontFamily: "Cal Sans",
      //       },
      //       h3: {
      //         fontFamily: "Cal Sans",
      //       },
      //       "blockquote p:first-of-type::before": { content: "none" },
      //       "blockquote p:first-of-type::after": { content: "none" },
      //     },
      //   },
      // },
      // keyframes: {
      //   wiggle: {
      //     "0%, 100%": {
      //       transform: "translateX(0%)",
      //       transformOrigin: "50% 50%",
      //     },
      //     "15%": { transform: "translateX(-6px) rotate(-6deg)" },
      //     "30%": { transform: "translateX(9px) rotate(6deg)" },
      //     "45%": { transform: "translateX(-9px) rotate(-3.6deg)" },
      //     "60%": { transform: "translateX(3px) rotate(2.4deg)" },
      //     "75%": { transform: "translateX(-2px) rotate(-1.2deg)" },
      //   },
      // },
      // animation: {
      //   wiggle: "wiggle 0.8s both",
      // },
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
  darkMode: "class",
  plugins: [
    typography,
    // forms,
    animate,
    nextui({
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
