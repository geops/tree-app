CREATE TABLE locations (x INT, y INT, custom_forest_type_code TEXT, custom_transition_forest_type_code TEXT);

COPY locations
FROM '/data/locations/input.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE locations_custom_forest_type (custom_forest_type_code TEXT,forest_type_code TEXT, latin TEXT, german TEXT);

COPY locations_custom_forest_type
FROM '/data/locations/custom_forest_types.csv'
DELIMITER ';' CSV HEADER;


CREATE MATERIALIZED VIEW altitudinal_zones_1995_export_mat AS
SELECT *
FROM altitudinal_zones_1995_export;


CREATE MATERIALIZED VIEW altitudinal_zones_2085_dry_export_mat AS
SELECT *
FROM altitudinal_zones_2085_dry_export;


CREATE MATERIALIZED VIEW altitudinal_zones_2085_less_dry_export_mat AS
SELECT *
FROM altitudinal_zones_2085_less_dry_export;


COPY
    (WITH l AS
         (SELECT *,
                 st_transform(st_geomfromtext('POINT('||x||' '||y||' )', 2056), 3857) AS geom
          FROM locations) SELECT l.x,
                                 l.y,
                                 ft.forest_type_code,
                                 tft.forest_type_code AS transition_forest_type_code,
                                 azt.code AS altitudinal_zones_1995_code,
                                 azm.code AS altitudinal_zones_2085_less_dry_code,
                                 aze.code AS altitudinal_zones_2085_dry_code,
                                 fe.code AS forest_ecoregion_code
     FROM l
     LEFT JOIN locations_custom_forest_type ft ON ft.custom_forest_type_code = l.custom_forest_type_code
     LEFT JOIN locations_custom_forest_type tft ON tft.custom_forest_type_code = l.custom_transition_forest_type_code
     LEFT JOIN forest_ecoregions fe ON ST_Intersects(l.geom, ST_Transform(fe.geom, 3857))
     LEFT JOIN altitudinal_zones_1995_export_mat azt ON ST_Intersects(l.geom, azt.geometry)
     LEFT JOIN altitudinal_zones_2085_dry_export_mat aze ON ST_Intersects(l.geom, aze.geometry)
     LEFT JOIN altitudinal_zones_2085_less_dry_export_mat azm ON ST_Intersects(l.geom, azm.geometry)
     ) TO '/data/locations/export.csv'
DELIMITER ';' CSV HEADER;