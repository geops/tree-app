source ~/.nvm/nvm.sh
nvm use 16  # generate-mapbox-gl-fonts needs node 16

yarn --ignore-engines run generate-mapbox-gl-fonts
mkdir -p data/spatial/tiles/fonts
cp -r _output/Roboto\ Regular data/spatial/tree-app-tiles/tiles/fonts/Roboto\ Regular
rm -r _output