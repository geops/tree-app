const neutrino = require('neutrino');

const config = neutrino().eslintrc();

config.env.jest = true;
config.extends.push('prettier');
config.plugins.push('prettier');

module.exports = config;
