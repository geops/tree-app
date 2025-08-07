_export () {
    local TARGET=$1
    #if [ ! -f "/data/spatial/export/${TARGET}.geojson" ]; then
        echo "Exporting ${TARGET} ..."
        ogr2ogr -f GeoJSON /data/spatial/export/${TARGET}.geojson PG:'host=localhost dbname=tree user=postgres' -sql "select * from ${TARGET}_export"
    #else
    #    echo "$TARGET already exported! Do nothing ..."
    #fi
}

start=`date +%s`
_export "altitudinal_zones_1995"
_export "altitudinal_zones_2085_dry"
_export "altitudinal_zones_2085_less_dry"
_export "cantonal_boundaries"
_export "forest_ecoregions"
_export "forest_types"
_export "forest_types_union"
_export "silver_fir_areas"

end=`date +%s`
minutes=$(( (end - start) / 60 ))
seconds=$(( (end - start) % 60 ))
echo "GeoJson export completed in ${minutes} minutes and ${seconds} seconds."