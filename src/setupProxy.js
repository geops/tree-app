/**
 * Set Content-Encoding header to gzip for .pbf files.
 * Otherwise browsers can't handle those files.
 *
 * For details see:
 * https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
 */
module.exports = function proxy(app) {
  app.get('/*', (req, res, next) => {
    if (req.url.endsWith('.pbf')) {
      res.header('Content-Encoding', 'gzip');
    }
    next();
  });
};
