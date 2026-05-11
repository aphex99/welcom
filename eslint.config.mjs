import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],

        languageOptions: {
            parser: tsparser,
            sourceType: "module",
        },

        plugins: {
            "@typescript-eslint": tseslint,
            "simple-import-sort": simpleImportSort,
        },

        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,

            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^react", "^motion", "^@?\\w"],
                        ["^@/shared"],
                        ["^@/entities"],
                        ["^@/features"],
                        ["^@/widgets"],
                        ["^@/pages"],
                        ["^\\u0000"],
                        ["^\\."],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",

            "@typescript-eslint/no-unused-vars": "warn",
            "no-console": "warn",
        },

        ignores: ["/node_modules"],
    },
];
