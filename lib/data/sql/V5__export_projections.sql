CREATE TABLE projections_export (id SERIAL, forest_ecoregion TEXT, altitudinal_zone TEXT, forest_type TEXT, additional additional,
                                                                                                            silver_fir_area TEXT, relief relief,
                                                                                                                                  slope TEXT, target_altitudinal_zone TEXT, target_forest_type TEXT);


CREATE OR REPLACE FUNCTION export_projections() RETURNS integer AS $$
DECLARE x integer;
BEGIN
 TRUNCATE projections_export;

INSERT INTO projections_export (forest_ecoregion, altitudinal_zone, forest_type, additional, silver_fir_area, relief, slope, target_altitudinal_zone, target_forest_type) -- 3.) Match CSV values to enum values.
WITH slopes AS
    (SELECT slope,
            array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope
     FROM projections_import)
SELECT DISTINCT processed_forest_ecoregion AS forest_ecoregion,
       altitudinal_zone_meta.code AS altitudinal_zone,
       CASE trim(both from forest_type) = any(SELECT code FROM foresttype_meta)
           WHEN TRUE THEN forest_type
           ELSE null
       END AS forest_type,
       CASE additional_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE additional_meta.target
       END AS additional,
       CASE silver_fir_area_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE silver_fir_area_meta.target
       END AS silver_fir_area,
       CASE relief_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE relief_meta.target
       END AS relief,
       CASE slopes.slope is null
           WHEN TRUE THEN 'unknown'
           ELSE slopes.parsed_slope
       END AS slope,
       target_altitudinal_zone_meta.code AS target_altitudinal_zone,
       CASE processed_target_forest_type = any(SELECT code FROM foresttype_meta)
           WHEN TRUE THEN processed_target_forest_type
           ELSE null
       END AS target_forest_type
FROM
    (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(forest_ecoregions,forest_ecoregions_specific), '2(,|\s)', '2a, 2b,'), 'R 5', '5a, 5b,'),',\s?'),
                                (SELECT string_agg(subcode, '|'::text)
                                 FROM forest_ecoregions)))[1] AS processed_forest_ecoregion,
            CASE
                   WHEN target_altitudinal_zone ~ 'Nebenareal' THEN 'nebenareal'
                   WHEN target_altitudinal_zone ~ 'Hauptareal' THEN 'hauptareal'
                   WHEN target_altitudinal_zone ~ 'Reliktareal' THEN 'reliktareal'
                   ELSE processed_silver_fir_area
                 END as processed_silver_fir_area2,
                 CASE
                   WHEN target_altitudinal_zone ~ 'hochmontan' THEN 'hochmontan'
                   ELSE trim(target_altitudinal_zone)
                 END as processed_target_altitudinal_zone,
                 regexp_replace(trim(both from target_forest_type), '  ', ' ') AS processed_target_forest_type,
            *
     FROM
         (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(trim(lower(silver_fir_area)),'nicht relevant'), 'haupt- und nebenareal', 'hauptareal,nebenareal'),'haupt- oder nebenareal', 'hauptareal,nebenareal'),',\s?') ,
                                     (SELECT string_agg(lower(areal_de)::text, '|'::text) || '|nicht relevant'
                                      FROM silver_fir_areas)))[1] AS processed_silver_fir_area,
                 *
          FROM projections_import) import_silver_fir_area) import
LEFT JOIN altitudinal_zone_meta ON lower(altitudinal_zone_meta.source::text) = trim(lower(import.altitudinal_zone))
LEFT JOIN altitudinal_zone_meta target_altitudinal_zone_meta ON lower(target_altitudinal_zone_meta.source::text) = lower(import.processed_target_altitudinal_zone)
LEFT JOIN additional_meta ON lower(additional_meta.source) = lower(import.additional)
LEFT JOIN silver_fir_area_meta ON lower(silver_fir_area_meta.source) = import.processed_silver_fir_area2
LEFT JOIN relief_meta ON relief_meta.source = import.relief
LEFT JOIN slopes ON slopes.slope = import.slope
ORDER BY forest_ecoregion, altitudinal_zone, forest_type, target_altitudinal_zone, target_forest_type;

----------------------------------------------
-- export projections_export to json

COPY (
    WITH
          target_altitudinal_zone AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 slope,
                 additional,
                 silver_fir_area,
                 relief,
                 jsonb_object_agg(target_altitudinal_zone::text, target_forest_type::text) AS json
          FROM projections_export
          WHERE target_forest_type IS NOT NULL AND target_altitudinal_zone IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone,
                   forest_type,
                   slope,
                   additional,
                   silver_fir_area,
                   relief),
          relief AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 slope,
                 additional,
                 silver_fir_area,
                 jsonb_object_agg(relief::text, target_altitudinal_zone.json) AS json
          FROM projections_export
          LEFT JOIN target_altitudinal_zone USING (forest_ecoregion,
                                  altitudinal_zone,
                                  forest_type,
                                  slope,
                                  additional,
                                  silver_fir_area,
                                  relief)
          WHERE target_altitudinal_zone.json IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone,
                   forest_type,
                   slope,
                   additional,
                   silver_fir_area),
          silver_fir_area AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 slope,
                 additional,
                 jsonb_object_agg(silver_fir_area::text, relief.json) AS json
          FROM projections_export
          LEFT JOIN relief USING (forest_ecoregion,
                                  altitudinal_zone,
                                  forest_type,
                                  slope,
                                  additional,
                                  silver_fir_area)
          WHERE relief.json IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone,
                   forest_type,
                   slope,
                   additional),
          additional AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 slope,
                 jsonb_object_agg(additional::text, silver_fir_area.json) AS json
          FROM projections_export
          LEFT JOIN silver_fir_area USING (forest_ecoregion,
                                           altitudinal_zone,
                                           forest_type,
                                           slope,
                                           additional)
          WHERE silver_fir_area.json IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone,
                   forest_type,
                   slope),
          slope AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 jsonb_object_agg(slope::text, additional.json) AS json
          FROM projections_export
          LEFT JOIN additional USING (forest_ecoregion,
                                      altitudinal_zone,
                                      forest_type,
                                      slope)
          WHERE additional.json IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone,
                   forest_type),
          forest_type AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 jsonb_object_agg(forest_type::text, slope.json) AS json
          FROM projections_export
          LEFT JOIN slope USING (forest_ecoregion,
                                 altitudinal_zone,
                                 forest_type)
          WHERE slope.json IS NOT NULL
          GROUP BY forest_ecoregion,
                   altitudinal_zone),
          altitudinal_zone AS
         (SELECT forest_ecoregion,
                 jsonb_object_agg(altitudinal_zone::text, forest_type.json) AS json
          FROM projections_export
          LEFT JOIN forest_type USING (forest_ecoregion,
                                      altitudinal_zone)
          WHERE forest_type.json IS NOT NULL
          GROUP BY forest_ecoregion) SELECT jsonb_object_agg(forest_ecoregion::text, altitudinal_zone.json)
     FROM projections_export
     LEFT JOIN altitudinal_zone USING (forest_ecoregion)
     WHERE altitudinal_zone.json IS NOT NULL
) TO '/data/projections.json';

     GET DIAGNOSTICS x = ROW_COUNT;
  RETURN x;
END;
$$ LANGUAGE plpgsql;

