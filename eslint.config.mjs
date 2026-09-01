import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint';
 
const eslintConfig = defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { 
    rules: {
    "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        }],
    },
  },
  globalIgnores([
    'out/**',
    'dist/**',
  ]),
])
 
export default eslintConfig
