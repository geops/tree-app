const airbnbBase = require('@neutrinojs/airbnb-base');
const jest = require('@neutrinojs/jest');
const library = require('@neutrinojs/library');

const eslint = {
  baseConfig: {
    env: { jest: true },
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
      'import/no-named-as-default': 0,
      'import/extensions': 0,
      'import/no-named-as-default-member': 0,
    },
  },
};

module.exports = {
  use: [airbnbBase({ eslint }), library({ name: '@geops/tree-lib' }), jest()],
};
