const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb',
  ],

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'static', 'webpack.common.js'),
      },
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx', '.js', '.ts', '.tsx'] }],
    'no-plusplus': 'off',
    'no-continue': 'off',
    'jsx-a11y/label-has-for': false,
    'jsx-a11y/label-has-associated-control': false,
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: {
          multiline: true,
          minProperties: 6,
          consistent: true,
        },
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'react/require-default-props': false,
    'react/no-array-index-key': false,
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-indent': 'off',
    'import/extensions': 'off',
    'no-confusing-arrow': 'off',
    'no-unused-vars': 'off'
  },
};
