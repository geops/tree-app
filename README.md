# tree-app

This offline-first web application provides tree recommendations for different climate change scenarios.

## Installation & usage

1. Install all dependencies: `yarn install`
2. Place an input.csv with headers (CLNR;x;y;IP5AREPROZ;IP50PROZ;custom_forest_type_code;custom_transition_forest_type_code) file into the lib/locations folder
3. Run yarn `data:transform`. This creates a export.csv in the the lib/locations folder
4. Run the node script `yarn data:export:csv ../data/locations/export.csv` from its root directory
5. An exportTreeRecommendations.csv file is generated in the export package root directory

