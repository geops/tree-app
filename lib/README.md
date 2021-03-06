# tree-lib

This library provides tree recommendations for different climate change scenarios.

## Data

Data for tree type projections is provided as a [CSV file](./data/projections.csv) and needs to be converted into JSON to be usable by the library.

1. Install NodeJS, Yarn and Docker Compose.
2. Install dependencies: `yarn install`
3. Make sure Docker can overwrite JSON files (ie. on Linux `chmod 777 data/*.json`)
4. Run transformation: `yarn run data:transform`

### NaiS

NaiS data is provided as CSV files and imported into the PostgreSQL database for further processing. New data needs to be converted to UTF-8 encoding with the following command: `iconv -f ISO-8859-1 -t UTF-8 [source].csv > [target].csv`

## Vector Tiles

Spatial data is downloaded from different sources and imported into the database. To add or update spatial data have a look into `data/spatial`. For the app we generate one vector tileset using the following commands:

1. Start database: `yarn run data:start`
2. Export spatial data to GeoJSON files (might take a long time): `yarn run data:spatial:export`
3. Transform GeoJSON files to single vector tileset: `yarn run data:spatial:tile`
4. Generate font glyphs for Mapbox GL: `yarn run data:spatial:fonts`
5. Deploy tiles local `yarn run data:spatial:deploy:local` and change REACT_APP_VECTOR_TILES_ENDPOINT to localhost in `.env` (reload new endppoint with `yarn start`)
6. Deploy tiles to a webserver or to Netlify (currently maintained by geOps) production `yarn run data:spatial:deploy` or staging `yarn run data:spatial:deploy:staging`

## Bugs

Please use the [GitHub issue tracker](https://github.com/geops/tree-app/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.

## Development

- Run `yarn run test:watch` to continuously test in development.
- Use [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for commit messages.
