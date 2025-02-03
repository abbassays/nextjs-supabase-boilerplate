import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
  // allConfig: {},
});

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ),
  ...compat.env({
    browser: true,
    es2021: true,
    node: true,
  }),
  ...compat.plugins(
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
  ),
  ...compat.config({
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',

      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      //#region  //*=========== Unused Import ===========
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      //#endregion  //*======== Unused Import ===========

      //#region  //*=========== Import Sort ===========
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^.+\\.s?css$', '^@/styles'],
            ['^@/hooks'],
            ['^@/handlers', '^@/schemas', '^@/actions'],
            ['^@/components'],
            ['^@/lib', '^@/utils'],
            ['^@/'],
            // relative paths up until 3 level
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            // other that didnt fit in
            ['^'],
          ],
        },
      ],
      //#endregion  //*======== Import Sort ===========
    },
    globals: {
      React: true,
      JSX: true,
    },
  }),
];

export default eslintConfig;
