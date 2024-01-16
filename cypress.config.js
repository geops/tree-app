/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '81oge9',
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
  },
});
