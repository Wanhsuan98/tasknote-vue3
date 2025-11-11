/* eslint-env node */
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from '@vue/eslint-config-typescript'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    extends: [
      js.configs.recommended,
      ...vue.configs['flat/essential'],
      ...ts(),
      prettier,
    ],
  },
]
