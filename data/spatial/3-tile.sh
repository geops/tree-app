_tile () {
    local TARGET=$1
    echo "Tiling ${TARGET} ..."
    tippecanoe --no-feature-limit --no-tile-size-limit --include=code --minimum-zoom=0 --maximum-zoom=10 -s EPSG:3857 --force -o "/data/spatial/tiles/${TARGET}.mbtiles" /data/spatial/export/${TARGET}.geojson
}

_tile "altitudinal_zones_1995"
_tile "altitudinal_zones_2085_dry"
_tile "altitudinal_zones_2085_less_dry"
_tile "forest_ecoregions"
_tile "silver_fir_areas"

echo "Joining tiles ..."
cd /data/spatial/tiles
tile-join --force --maximum-zoom=10 --no-tile-size-limit -e "tree" altitudinal_zones_1995.mbtiles altitudinal_zones_2085_dry.mbtiles altitudinal_zones_2085_less_dry.mbtiles forest_ecoregions.mbtiles silver_fir_areas.mbtiles
