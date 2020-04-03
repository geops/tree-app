module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'post-checkout':
      'if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then yarn install --frozen-lockfile; fi',
    'post-merge': 'yarn install --frozen-lockfile',
    'post-rebase': 'yarn install',
  },
};
