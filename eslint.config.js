import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['src/**/*.ts'] },
  { ignores: ['**/*.js', '!**/eslint.config.js','src/graphql/generated','cluster-cli/build'] },
  { languageOptions: { globals: globals.es2016 } },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
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
  {
    ...importPlugin.flatConfigs.recommended,
    rules: {
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
    },
  },
  eslintConfigPrettier
];
