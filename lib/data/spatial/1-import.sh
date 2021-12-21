_import () {
    local URL=$1
    local TARGET=$2 # cantonal_boundaries
    local ZIPFILE=$3 # SHAPEFILE_LV95_LN02
    local SHPFILE=$4 # swissBOUNDARIES3D_1_3_TLM_KANTONSGEBIET

    if [ "$URL" == "Download manually" ] && [ ! -f "/data/spatial/${TARGET}/${TARGET}.shp" ]; then
        echo "Manual unzipped download for ${TARGET} is missing! Do nothing ..."
        return
    fi

    if [ ! -f "/data/spatial/${TARGET}/${TARGET}.shp" ] && [ ! -f "/data/spatial/${TARGET}/${ZIPFILE}.gpkg" ]; then
        echo "Downloading ${TARGET} ..."
        cd /data/spatial
        wget --no-check-certificate "${URL}" -O "${TARGET}.zip"
        7z x -aoa -o"${TARGET}" "${TARGET}.zip"
        cd ${TARGET}
        if [ -f "/data/spatial/${TARGET}/${ZIPFILE}/${SHPFILE}.shp" ]; then
            mv ${ZIPFILE}/${SHPFILE}.* .
        else
            7z x -aoa -o"." "${ZIPFILE}.zip"
            rm "${ZIPFILE}.zip"
        fi
        rename "s/${SHPFILE}/${TARGET}/" ${SHPFILE}.*
    else
        echo "$TARGET already downloaded! Will be reused ..."
    fi

    local COUNT=$(psql -d tree -U postgres -At -c "SELECT COUNT(*) FROM ${TARGET}")
    if [ "$COUNT" == "0" ]; then
        if [ -f "/data/spatial/${TARGET}/${ZIPFILE}.gpkg" ]; then
            echo "Importing GeoPackage ${ZIPFILE}.gpkg ..."
            ogr2ogr -f PostgreSQL "PG:dbname=tree user=postgres" -nln ${TARGET} /data/spatial/${TARGET}/${ZIPFILE}.gpkg
        else
            echo "Importing Shapefile ${TARGET}.shp ..."
            shp2pgsql -D -a -s 2056 "/data/spatial/${TARGET}/${TARGET}.shp" | psql -d tree -U postgres
        fi
    else
        echo "$TARGET already imported! Do nothing ..."
    fi
}

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_1975/data.zip" "altitudinal_zones_1995" "vegetationshoehenstufen_1975"

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_2085_trocken/data.zip" "altitudinal_zones_2085_dry" "vegetationshoehenstufen_2085_trocken"

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_2085_weniger_trocken/data.zip" "altitudinal_zones_2085_less_dry" "vegetationshoehenstufen_2085_weniger_trocken"

_import "https://data.geo.admin.ch/ch.bafu.wald-standortsregionen/data.zip" "forest_ecoregions" "Waldstandortsregionen" "Waldstandortsregionen"

_import "https://data.geo.admin.ch/ch.bafu.wald-tannenareale/data.zip" "silver_fir_areas" "Tannenareale" "Tannenareale"

_import "https://data.geo.admin.ch/ch.swisstopo.swissboundaries3d-kanton-flaeche.fill/shp/2056/ch.swisstopo.swissboundaries3d-kanton-flaeche.fill.zip" "cantonal_boundaries" "SHAPEFILE_LV95_LN02" "swissBOUNDARIES3D_1_3_TLM_KANTONSGEBIET"

_import "Download manually" "forest_types_fl" "forest_types_fl" "forest_types_fl"

_import "Download manually" "forest_types_lu" "forest_types_lu" "forest_types_lu"

_import "Download manually" "forest_types_ne" "forest_types_ne" "forest_types_ne"

_import "Download manually" "forest_types_tg" "forest_types_tg" "forest_types_tg"

_import "Download manually" "forest_types_zh" "forest_types_zh" "forest_types_zh"

_import "Download manually" "forest_types_fr" "forest_types_fr" "forest_types_fr"
