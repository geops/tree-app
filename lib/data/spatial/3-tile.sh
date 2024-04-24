_tile () {
    local TARGET=$1
    echo "Tiling ${TARGET} ..."
    tippecanoe --detect-shared-borders --no-feature-limit --no-tile-size-limit --include=code --include=code_style --include=code_vd --include=info_vd --include=code_so --minimum-zoom=0 --maximum-zoom=12 -s EPSG:3857 --force -o "/data/spatial/tiles/${TARGET}.mbtiles" /data/spatial/export/${TARGET}.geojson
}

_tile "altitudinal_zones_1995"
_tile "altitudinal_zones_2085_dry"
_tile "altitudinal_zones_2085_less_dry"
_tile "cantonal_boundaries"
_tile "forest_ecoregions"
_tile "forest_types"
_tile "silver_fir_areas"

echo "Joining tiles ..."
cd /data/spatial/tiles
tile-join --force --maximum-zoom=12 --no-tile-size-limit -e "tree" altitudinal_zones_1995.mbtiles altitudinal_zones_2085_dry.mbtiles altitudinal_zones_2085_less_dry.mbtiles cantonal_boundaries.mbtiles forest_ecoregions.mbtiles forest_types.mbtiles silver_fir_areas.mbtiles
rm altitudinal_zones_1995.mbtiles altitudinal_zones_2085_dry.mbtiles altitudinal_zones_2085_less_dry.mbtiles cantonal_boundaries.mbtiles forest_ecoregions.mbtiles forest_types.mbtiles silver_fir_areas.mbtiles
find tree -name '*.pbf' > tiles.txt