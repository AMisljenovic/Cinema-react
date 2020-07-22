module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx", ".ts"] }],
    "indent": ["error", 2, { "SwitchCase": 1, "VariableDeclarator": 1 }],
    "no-tabs": 0,
    "linebreak-style": 0,
    "react/prop-types": 0,
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/jsx-fragments": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/alt-text": 0,
    "max-len": ["error", { "code": 120 }],
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "react/forbid-prop-types": 0,
    "global-require": 0,
    "react/jsx-boolean-value": 0
  },
};
