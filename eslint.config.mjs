import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
  // 忽略配置
  {
    ignores: ['node_modules/**', 'dist/**', '**/node_modules/**']
  },
  // JS 基础配置
  js.configs.recommended,
  // TypeScript 配置
  ...tseslint.configs.recommended,
  // Vue 配置
  pluginVue.configs.recommended,
  // 全局配置
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        tsconfigRootDir: __dirname
      }
    }
  },
  // Vue 文件使用 TypeScript parser
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        tsconfigRootDir: __dirname
      }
    }
  }
]
