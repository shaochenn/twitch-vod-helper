import globals from 'globals'
import pluginJs from '@eslint/js'
import standard from 'eslint-config-standard'
import pluginImport from 'eslint-plugin-import'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // 1. 指定處理所有的 .js 檔案
    files: ['**/*.js'],
    // 2. 注入環境變數，讓 ESLint 認識 document 和 window
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended, // 使用 ESLint 預設建議
  {
    // 3. 核心：手動套用 Standard 規則
    plugins: {
      import: pluginImport,
      n: pluginN,
      promise: pluginPromise
    },
    rules: {
      ...standard.rules
      // 如果你想微調規則，可以寫在這裡，例如：
      // "semi": ["error", "never"]
    }
  }
]
