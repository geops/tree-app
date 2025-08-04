# tree-lib

This library provides tree recommendations for different climate change scenarios.

## Data

Data for tree type projections is provided as a [CSV file](./data/projections.csv) and needs to be converted into JSON to be usable by the library.

1. Install NodeJS, pnpm and Docker Compose.
2. Install dependencies: `pnpm install`
4. Stop postgres if it is already running: `sudo service postgresql stop`
5. Run transformation: `pnpm run data:transform`

### NaiS

NaiS data is provided as CSV files and imported into the PostgreSQL database for further processing. New data needs to be converted to UTF-8 encoding with the following command: `iconv -f ISO-8859-1 -t UTF-8 [source].csv > [target].csv`

## Vector Tiles

Spatial data is downloaded from different sources and imported into the database. To add or update spatial data have a look into `data/spatial`. For the app we generate one vector tileset using the following commands:

1. Restart database: `pnpm run data:stop`, then `pnpm run data:start`. This generates the sqlite database with most of the non-spatial data and tables.
2. Remove all geojson files from data/spatial/export folder: `find data/spatial/export -type f -name "*.geojson" -delete`
3. Export spatial data to GeoJSON files (might take a long time): `pnpm run data:spatial:export`
4. Transform GeoJSON files to single vector tileset: `pnpm run data:spatial:tile`
5. Generate font glyphs for Mapbox GL: `pnpm run data:spatial:fonts` (you might have to use an earlier node version for this)
6. Deploy tiles local by running `pnpm run data:spatial:deploy:local` and change REACT_APP_VECTOR_TILES_ENDPOINT to localhost in `.env` (reload new endppoint with `pnpm dev`)
7. Change version number in [src/service-worker.js](https://github.com/geops/tree-app/blob/master/src/service-worker.js#L16) to clear the tile cache and deploy repository changes
8. Before deployment, check the vercel project ID in the `.vercel` folder in [tiles](https://github.com/geops/tree-app/tree/master/lib/data/spatial/tiles). This folder is generated during the first deployemnt and prompts the definition of the vercel project. Depending on the current project ID and the target instance (`tree-app` or `tg.tree-app`), the folder needs to be deleted so the initial prompt is triggered again (e.g. if Thurgau tiles `tiles-tg` need to be deployed but the last deployment was made for '`tiles-staging`', the folder needs to be recreated)
9. Deploy tiles to a webserver or to Vercel (currently maintained by geOps) running `pnpm run data:spatial:deploy` followed by `vercel alias set [deployment-url] [custom-domain]` (custom domain either `tiles.tree-app.ch`, `tiles-staging.tree-app.ch`, `tiles-tg.tree-app.ch`). The geops vercel team needs to be active locally (use https://vercel.com/docs/cli/switch) for this step.

## Excluding specific canton data

Forest type data from any of the canton datasets can be excluded by commenting out the corresponding line in the [import file](https://github.com/geops/tree-app/blob/master/lib/data/spatial/1-import.sh#L55) and rebuilding the tiles.

## Adding new SHAPE files

New data (e.g. for a new canton) is provided in the [Seafile-Sharepoint](https://data.int.geops.com/lib/7eb78755-e8bf-46fc-ba1d-3c4d104a6cad/file/045_BaTool/Standortskarten) and may need to be adjusted in QGIS. Once ready the folder containing the the SHAPE files needs to be extracted into [lib/sata/spatial](https://github.com/geops/tree-app/tree/master/lib/data/spatial) folder (the import script does this automatically, but to avoid issues with read/write access we recommentd to extract and import manually). Then add the folder name in the [.gitignore](https://github.com/geops/tree-app/blob/master/lib/.gitignore) file.

## Adding/Updating static PDFs (tree types, Solothurn forest types, etc.)
Some Tree-App content is provided via PDFs, which are uploaded to vercel and handled in tree-app by the service worker for offline mode. When the PDFs need to be updated follow these steps:
- Ensure there is a `.vercel` folder in the folder you want to upload (update), containing a `.project.json` with `{"projectId":"[project ID here]","orgId":"[geops organisation ID here]"}` as content (specifies the vercel project)
  - For the Solothurn forest types in [/lib/data/profiles/so](https://github.com/geops/tree-app/tree/master/lib/data/profiles/so), the project is https://vercel.com/geops/tree-app-data-so.
  - For the tree types in [/lib/data/treetypes](https://github.com/geops/tree-app/tree/master/lib/data/treetypes), the project is https://vercel.com/geops/tree-app-data-treetypes.
  - Add future PDF hosting vercel projects here...
- A proxy project https://vercel.com/geops/tree-app-data redirects the requests to the project deployments to use the same domain https://data.tree-app.ch/. When adding a new project with new PDFs, ensure to add the new project to the proxy project as well in [/lib/data/public/vercel.json](https://github.com/geops/tree-app/tree/master/lib/data/public/vercel.json).
  - For the Solothurn forest types, the final endpoint is `https://data.tree-app.ch/profiles/so/forest-types`.
  - For the tree types, the final endpoint is `https://data.tree-app.ch/treetypes`.
- Create a new `list.txt` (or get the previous file from the PDF endpoint at https://data.tree-app.ch/{path-to-data}/list.txt), containing the EXACT names of the PDFs to be uploaded. The file should contain one PDF name per line, without any additional information or special characters.
- Place the new PDFs in a new folder along with the `list.txt` file. The folder on the same level as the vercel.json file will also be deployed in this structure (e.g. `/lib/data/profiles/so/forest-types` --> `{deployment url}/forest-types/{name}.pdf|list.txt`).
- Deploy the new PDFs to vercel using the deploy commands: 
  - `pnpm data:so:deploy` for Solothurn forest type PDFs.
  - `pnpm data:treetypes:deploy` for tree type PDFs.
- You can test the new PDFs by using the resulting deployment url in `.env` locally
- Update service-worker [sw.js](https://github.com/geops/tree-app/blob/master/src/sw.js)
  - If you add a new project hosting PDFs, you need to add the cache, version, cache fetch etc. in the code
  - If you update an existing project, you need to change the version number in the service worker to ensure the new PDFs are downloaded (e.g. `currentSoPdfVersion`)
- Create a branch on gh and merge to ensure the service-worker downloads the new version of PDFs


## Bugs

Please use the [GitHub issue tracker](https://github.com/geops/tree-app/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.

## Development

- Run `pnpm run test:watch` to continuously test in development.
- Use [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for commit messages.