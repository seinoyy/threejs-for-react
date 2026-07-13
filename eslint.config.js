import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      prettierPluginRecommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: globals.browser,
    },
    // 自定义规则：0关闭 | 1警告 | 2报错
    rules: {
      // ========== React 规则 ==========
      "react/prop-types": 0, // ts已做类型校验，关闭prop-types
      "react/display-name": 0,

      // ========== React Hooks ==========
      "react-hooks/rules-of-hooks": 2,
      "react-hooks/exhaustive-deps": 1,

      // ========== TS 类型相关 ==========
      "@typescript-eslint/no-explicit-any": 1, // 禁止any，仅警告
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // 下划线开头参数不校验未使用
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-function": 1,
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-ignore": false },
      ],

      // ========== 基础JS规则 ==========
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"], // 只允许console.warn/error
        },
      ],
      "no-debugger": 1,
      // ✅ 让 ESLint 完全信任 Prettier
      'prettier/prettier': 'error',
      // ✅ 启用类型安全类规则（非格式类）
      'no-console': 'off',
      'no-debugger': 'off'
    },
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "public/**",
      "assets/**",
      ".git/**",
      ".vscode/**",
      ".idea/**",
      "*.config.js",
    ]
  },
])
