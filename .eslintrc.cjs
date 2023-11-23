const path = require("path");

module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    commonjs: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".ts", ".json"],
      },
      alias: {
        map: [
          ["src", path.resolve(__dirname, "./src")],
          ["@", path.resolve(__dirname, "./src")],
        ],
        extensions: [".ts", ".json"],
      },
    },
  },
  extends: [
    "prettier",
    "airbnb-base",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["node_modules", "dist", ".eslintrc.cjs"],
  plugins: ["prettier", "@typescript-eslint", "import"],
  root: true,
  rules: {
    camelcase: 0,
    "object-curly-newline": 0,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "linebreak-style": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
      },
    ],
  },
};
