module.exports = {
  plugins: {
    'postcss-mixins': { mixinsFiles: [] },
    'postcss-preset-env': {
      importFrom: [
        './static/assets/css/colorScheme.css',
        './static/assets/css/defaults.css',
        './static/assets/css/main.css',
      ],
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
        },
        'custom-media-queries': true,
      },
    },
  },
};
