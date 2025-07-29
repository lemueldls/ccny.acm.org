import { defineConfig, globalIgnores } from "eslint/config";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = defineConfig([
  ...compat.config({
    extends: [
      "next",
      "prettier",
      "next/core-web-vitals",
      // "next/typescript",
    ],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  }),
  globalIgnores([".vercel/", "convex/_generated/"]),
]);

export default eslintConfig;
