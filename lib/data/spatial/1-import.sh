_import () {
    local URL=$1
    local TARGET=$2 # cantonal_boundaries
    local ZIPFILE=$3 # SHAPEFILE_LV95_LN02
    local SHPFILE=$4 # swissBOUNDARIES3D_1_3_TLM_KANTONSGEBIET
    if [ ! -f "/data/spatial/${TARGET}/${TARGET}.shp" ]; then
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
        echo "Importing ${TARGET} ..."
        shp2pgsql -D -a -s 2056 "/data/spatial/${TARGET}/${TARGET}.shp" | psql -d tree -U postgres
    else
        echo "$TARGET already imported! Do nothing ..."
    fi
}

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_1995/data.zip" "altitudinal_zones_1995" "Vegetationshoehenstufen_1995" "Vegetationshhenstufen_1995"

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_2085_trocken/data.zip" "altitudinal_zones_2085_dry" "Vegetationshoehenstufen_2085_trocken" "Vegetationshhenstufen_2085_trocken"

_import "https://data.geo.admin.ch/ch.bafu.wald-vegetationshoehenstufen_2085_weniger_trocken/data.zip" "altitudinal_zones_2085_less_dry" "Vegetationshoehenstufen_2085_maessig_trocken" "Vegetationshhenstufen_2085_mssig_trocken"

_import "https://data.geo.admin.ch/ch.bafu.wald-standortsregionen/data.zip" "forest_ecoregions" "Waldstandortsregionen" "Waldstandortsregionen"

_import "https://data.geo.admin.ch/ch.bafu.wald-tannenareale/data.zip" "silver_fir_areas" "Tannenareale" "Tannenareale"

_import "https://data.geo.admin.ch/ch.swisstopo.swissboundaries3d-kanton-flaeche.fill/shp/2056/ch.swisstopo.swissboundaries3d-kanton-flaeche.fill.zip" "cantonal_boundaries" "SHAPEFILE_LV95_LN02" "swissBOUNDARIES3D_1_3_TLM_KANTONSGEBIET"

_import "Download manually" "forest_types_tg" "forest_types_tg" "forest_types_tg"

_import "Download manually" "forest_types_lu" "forest_types_lu" "forest_types_lu"

_import "Download manually" "forest_types_fl" "forest_types_fl" "forest_types_fl"

_import "Download manually" "forest_types_zh" "forest_types_zh" "forest_types_zh"
