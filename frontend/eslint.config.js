import js from "@eslint/js";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "dist",
        "build",
        "node_modules",
        "**/*.test.*",
        "**/*.spec.*",
        "**/__tests__/**",
    ]),

    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.es2022,
                console: "readonly",
                FormData: "readonly",
                fetch: "readonly",
                performance: "readonly",
            },
        },
        plugins: {
            react,
            "jsx-a11y": jsxA11y,
            "unused-imports": unusedImports,
        },
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "prefer-arrow-callback": "error",
            "prefer-template": "error",
            camelcase: [
                "error",
                {
                    properties: "never",
                },
            ],

            "max-lines-per-function": ["warn", 150],
            complexity: ["warn", 25],
            "no-console": "warn",
            "no-nested-ternary": "warn",
            "prefer-const": "warn",
            "react/display-name": "warn",

            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-unused-vars": "off",

            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/no-static-element-interactions": "warn",
            "jsx-a11y/aria-role": "warn",
            "jsx-a11y/no-autofocus": "warn",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);