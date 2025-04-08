-- This file creates tables and view for the manual location export. They are note used in the standard build process and application 

CREATE TABLE locations_manual (id SERIAL PRIMARY KEY,
                                          CLNR TEXT, x TEXT, y TEXT, IP5AREPROZ TEXT, IP50PROZ TEXT, custom_forest_type_code TEXT, custom_transition_forest_type_code TEXT);


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


CREATE OR REPLACE FUNCTION export_export() RETURNS integer AS $$
DECLARE x integer;
BEGIN
     REFRESH MATERIALIZED VIEW altitudinal_zones_1995_export_mat;
     REFRESH MATERIALIZED VIEW altitudinal_zones_2085_dry_export_mat;
     REFRESH MATERIALIZED VIEW altitudinal_zones_2085_less_dry_export_mat;

     TRUNCATE TABLE locations_manual;

     COPY locations (CLNR, x, y, IP5AREPROZ, IP50PROZ, custom_forest_type_code, custom_transition_forest_type_code)
     FROM '/data/locations/input.csv'
     DELIMITER ';' CSV HEADER;

     COPY
     (WITH l AS
          (SELECT id, st_transform(st_geomfromtext('POINT('||x||' '||y||' )', 2056), 3857) AS geom
               FROM locations_manual) SELECT locations_manual.*,
                                   ft.forest_type_code,
                                   tft.forest_type_code AS transition_forest_type_code,
                                   azt.code_style AS altitudinal_zones_1995_code,
                                   azm.code_style AS altitudinal_zones_2085_less_dry_code,
                                   aze.code_style AS altitudinal_zones_2085_dry_code,
                                   fe.code AS forest_ecoregion_code,
                                   sfa.code AS silver_fir_area_code
          FROM l
          LEFT JOIN locations_manual ON l.id = locations_manual.id
          LEFT JOIN locations_custom_forest_type ft ON ft.custom_forest_type_code = locations_manual.custom_forest_type_code
          LEFT JOIN locations_custom_forest_type tft ON tft.custom_forest_type_code = locations_manual.custom_transition_forest_type_code
          LEFT JOIN forest_ecoregions_export fe ON ST_Intersects(l.geom, fe.geometry)
          LEFT JOIN silver_fir_areas_export sfa ON ST_Intersects(l.geom, sfa.geometry)
          LEFT JOIN altitudinal_zones_1995_export_mat azt ON ST_Intersects(l.geom, azt.geometry)
          LEFT JOIN altitudinal_zones_2085_dry_export_mat aze ON ST_Intersects(l.geom, aze.geometry)
          LEFT JOIN altitudinal_zones_2085_less_dry_export_mat azm ON ST_Intersects(l.geom, azm.geometry)
          ) TO '/data/locations/export.csv'
     DELIMITER ';' CSV HEADER;

     GET DIAGNOSTICS x = ROW_COUNT;
  RETURN x;
END;
$$ LANGUAGE plpgsql;