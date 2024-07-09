# tree-lib

This library provides tree recommendations for different climate change scenarios.

## Data

Data for tree type projections is provided as a [CSV file](./data/projections.csv) and needs to be converted into JSON to be usable by the library.

1. Install NodeJS, Yarn and Docker Compose.
2. Install dependencies: `yarn install`
3. Make sure Docker can overwrite JSON files (ie. on Linux `chmod 777 data/*.json`)
4. Stop postgres if it is already running: `sudo service postgresql stop`
5. Run transformation: `yarn run data:transform`

### NaiS

NaiS data is provided as CSV files and imported into the PostgreSQL database for further processing. New data needs to be converted to UTF-8 encoding with the following command: `iconv -f ISO-8859-1 -t UTF-8 [source].csv > [target].csv`

## Vector Tiles

Spatial data is downloaded from different sources and imported into the database. To add or update spatial data have a look into `data/spatial`. For the app we generate one vector tileset using the following commands:

1. Restart database: `yarn run data:stop`, then `yarn run data:start`
2. Export spatial data to GeoJSON files (might take a long time): `yarn run data:spatial:export`
3. Transform GeoJSON files to single vector tileset: `yarn run data:spatial:tile`
4. Generate font glyphs for Mapbox GL: `yarn run data:spatial:fonts`
5. Deploy tiles local by running `yarn run data:spatial:deploy:local` and change REACT_APP_VECTOR_TILES_ENDPOINT to localhost in `.env` (reload new endppoint with `yarn start`)
6. Change version number in [src/service-worker.js](https://github.com/geops/tree-app/blob/master/src/service-worker.js#L16) to clear the tile cache and deploy repository changes
7. Before deployment, check the vercel project ID in the `.vercel` folder in [tiles](https://github.com/geops/tree-app/tree/master/lib/data/spatial/tiles). This folder is generated during the first deployemnt and prompts the definition of the vercel project. Depending on the current project ID and the target instance (`tree-app` or `tg.tree-app`), the folder needs to be deleted so the initial prompt is triggered again (e.g. if Thurgau tiles `tiles-tg` need to be deployed but the last deployment was made for '`tiles-staging`', the folder needs to be recreated)
8. Deploy tiles to a webserver or to Vercel (currently maintained by geOps) running `yarn run data:spatial:deploy` followed by `vercel alias set [deployment-url] [custom-domain]` (custom domain either `tiles.tree-app.ch`, `tiles-staging.tree-app.ch`, `tiles-tg.tree-app.ch`). The geops vercel team needs to be active locally (use https://vercel.com/docs/cli/switch) for this step.

## Excluding specific canton data

Forest type data from any of the canton datasets can be excluded by commenting out the corresponding line in the [import file](https://github.com/geops/tree-app/blob/master/lib/data/spatial/1-import.sh#L55) and rebuilding the tiles.

## Adding new SHAPE files

New data (e.g. for a new canton) is provided in the [Seafile-Sharepoint](https://data.int.geops.com/lib/7eb78755-e8bf-46fc-ba1d-3c4d104a6cad/file/045_BaTool/Standortskarten) and may need to be adjusted in QGIS. Once ready the folder containing the the SHAPE files needs to be extracted into [lib/sata/spatial](https://github.com/geops/tree-app/tree/master/lib/data/spatial) folder (the import script does this automatically, but to avoid issues with read/write access we recommentd to extract and import manually). Then add the folder name in the [.gitignore](https://github.com/geops/tree-app/blob/master/lib/.gitignore) file.

## Bugs

Please use the [GitHub issue tracker](https://github.com/geops/tree-app/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.

## Development

- Run `yarn run test:watch` to continuously test in development.
- Use [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for commit messages.
