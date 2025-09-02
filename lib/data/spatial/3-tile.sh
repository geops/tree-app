_tile () {
    local TARGET=$1
    local LAYER_NAME=$2
    local MAX_ZOOM=${3:-14}  # Default to 14 if not provided
    local MIN_ZOOM=${4:-0}   # Default to 0 if not provided
    echo "Tiling ${TARGET} ..."
    tippecanoe --no-tile-size-limit --detect-shared-borders --no-feature-limit --include=code --include=code_style --include=code_vd --include=info_vd --include=code_so --minimum-zoom=${MIN_ZOOM} --maximum-zoom=${MAX_ZOOM} -s EPSG:3857 --layer ${LAYER_NAME} --force -o "/data/spatial/tiles/${TARGET}.mbtiles" /data/spatial/export/${TARGET}.geojson
}

start=`date +%s`
_tile "altitudinal_zones_1995" "altitudinal_zones_1995"
_tile "altitudinal_zones_2085_dry" "altitudinal_zones_2085_dry"
_tile "altitudinal_zones_2085_less_dry" "altitudinal_zones_2085_less_dry"
_tile "cantonal_boundaries" "cantonal_boundaries"
_tile "forest_ecoregions" "forest_ecoregions"
_tile "forest_types" "forest_types" 14 11
_tile "forest_types_union" "forest_types" 10 0
_tile "silver_fir_areas" "silver_fir_areas"

echo "Joining tiles ..."
cd /data/spatial/tree-app-tiles/tiles
tile-join --force --maximum-zoom=12 --no-tile-size-limit -e "tree" altitudinal_zones_1995.mbtiles altitudinal_zones_2085_dry.mbtiles altitudinal_zones_2085_less_dry.mbtiles cantonal_boundaries.mbtiles forest_ecoregions.mbtiles forest_types.mbtiles forest_types_union.mbtiles silver_fir_areas.mbtiles
rm altitudinal_zones_1995.mbtiles altitudinal_zones_2085_dry.mbtiles altitudinal_zones_2085_less_dry.mbtiles cantonal_boundaries.mbtiles forest_ecoregions.mbtiles forest_types.mbtiles silver_fir_areas.mbtiles forest_types_union.mbtiles
find tree -name '*.pbf' > tiles.txt
end=`date +%s`
minutes=$(( (end - start) / 60 ))
seconds=$(( (end - start) % 60 ))
echo "Tile build completed in ${minutes} minutes and ${seconds} seconds."

