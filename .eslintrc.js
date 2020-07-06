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
  // rules: {
  //   'react/no-find-dom-node': 'off',
  //   'jsx-quotes': ['error', 'prefer-single'],
  //   'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx', '.js', '.ts', '.tsx'] }],
  //   'no-plusplus': 'off',
  //   'no-continue': 'off',
  //   'no-case-declarations': 'off',
  //   'jsx-a11y/label-has-for': false,
  //   'jsx-a11y/label-has-associated-control': false,
  //   'import/prefer-default-export': 'off',
  //   'no-console': 'off',
  //   'react/no-danger': 'off',
  //   'react/forbid-prop-types': 'off',
  //   'import/no-extraneous-dependencies': 'off',
  //   'no-nested-ternary': 'off',
  //   'no-useless-escape': 'off',
  //   'object-curly-newline': [
  //     'error',
  //     {
  //       ExportDeclaration: {
  //         multiline: true,
  //         minProperties: 6,
  //         consistent: true,
  //       },
  //     },
  //   ],
  //   'no-param-reassign': [
  //     'error',
  //     {
  //       props: false,
  //     },
  //   ],
  //   'jsx-a11y/accessible-emoji': false,
  //   'react/require-default-props': false,
  //   'react/no-array-index-key': false,
  //   'max-len': [
  //     'error',
  //     120,
  //     2,
  //     {
  //       ignoreUrls: true,
  //       ignoreComments: false,
  //     },
  //   ],
  //   'react/prop-types': 'off',
  //   'no-underscore-dangle': 'off',
  //   'camelcase': 'off',
  //   'react/destructuring-assignment': 'off',
  //   'import/extensions': 'off',
  //   'no-unused-vars': 'off'
  // },
};
