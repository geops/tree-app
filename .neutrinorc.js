const airbnbBase = require('@neutrinojs/airbnb-base');
const jest = require('@neutrinojs/jest');
const library = require('@neutrinojs/library');

module.exports = {
  use: [airbnbBase(), library({ name: '@geops/tree-lib' }), jest()],
};
