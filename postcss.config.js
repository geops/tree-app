const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.js'],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
