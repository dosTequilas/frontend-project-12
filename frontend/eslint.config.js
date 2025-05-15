import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { includeIgnoreFile } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import { fileURLToPath } from 'url'
import { defineConfig, globalIgnores } from "eslint/config";


const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
const eslintIgnorePath = fileURLToPath(
  new URL('.eslintignore', import.meta.url),
)

export default defineConfig([
  globalIgnores([
		"dist/*",
		"build/*",
		"node_modules/*",
	]),
  includeIgnoreFile(gitIgnorePath),
  includeIgnoreFile(eslintIgnorePath),
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': [0],
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
    },
  },
])
