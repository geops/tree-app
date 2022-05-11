# tree-app

This offline-first web application provides tree recommendations for different climate change scenarios.

## Installation

1. Install all dependencies: `yarn install`
2. Optionally customize vector tiles endpoint: copy `.env` to `.env.local` and modify the endpoint variable.
3. Build the app for production: `yarn run build`
4. [Serve](https://create-react-app.dev/docs/deployment/) the `./build` directory using your favorite HTTP server.
5. Make sure to redirect all paths to `index.html` to [support client-side routing](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing).

## More

- [Development](https://github.com/geops/tree-app/tree/master/DEVELOPMENT.md)

## Bugs

Please use the [GitHub issue tracker](https://github.com/geops/tree-app/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.
