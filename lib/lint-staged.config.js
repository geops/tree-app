module.exports = {
  'src/**/*.js': [
    'yarn lint --fix',
    "prettier --write 'src/**/*.js'",
    'yarn test --bail --findRelatedTests --watchAll=false',
  ],
};
