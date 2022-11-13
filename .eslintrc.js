module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "prettier",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "global-require": 0,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "vue/multi-word-component-names": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": 0,
    "no-param-reassign": 0,
    "vue/html-self-closing": 0,
    "max-len": 0,
  },
};
/* 'plugin:import/errors', */
