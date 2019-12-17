const airbnbBase = require('@neutrinojs/airbnb-base');
const jest = require('@neutrinojs/jest');
const library = require('@neutrinojs/library');

const eslint = {
  baseConfig: {
    env: { jest: true },
    extends: ['prettier'],
    plugins: ['prettier'],
  },
};

module.exports = {
  use: [airbnbBase({ eslint }), library({ name: '@geops/tree-lib' }), jest()],
};
