module.exports = {
  'src/**/*.js': [
    'yarn lint --fix',
    "prettier --write 'src/**/*.js'",
    'git add',
    'yarn test --bail --findRelatedTests --watchAll=false',
  ],
};
