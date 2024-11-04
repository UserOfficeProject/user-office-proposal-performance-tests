import eslint from '@eslint/js';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPromise from 'eslint-plugin-promise';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { files: ['**/*.{ts,js}'] },
  { languageOptions: { globals: globals.es5 } },
  pluginJs.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier
);
