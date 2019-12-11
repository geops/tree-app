CREATE TABLE projections_export (id SERIAL, forest_ecoregion TEXT, altitudinal_zone TEXT, forest_type TEXT, additional additional,
                                                                                                            silver_fir_area TEXT, relief relief,
                                                                                                                                  slope TEXT, target_altitudinal_zone TEXT, target_forest_type TEXT);


CREATE FUNCTION export_projections() RETURNS integer AS $$
DECLARE x integer;
BEGIN
 TRUNCATE projections_export;

INSERT INTO projections_export (forest_ecoregion, altitudinal_zone, forest_type, additional, silver_fir_area, relief, slope, target_altitudinal_zone, target_forest_type) -- 3.) Match CSV values to enum values.
WITH slopes AS
    (SELECT slope,
            array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope
     FROM projections_import)
SELECT processed_forest_ecoregion AS forest_ecoregion,
       altitudinal_zone_meta.code AS altitudinal_zone,
       CASE
           WHEN trim(both from forest_type) = any(SELECT code FROM foresttype_meta) THEN forest_type
           WHEN trim(both from target_forest_type) = any(SELECT code FROM foresttype_meta) THEN target_forest_type
           ELSE null
       END AS forest_type,
       CASE additional_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE additional_meta.target
       END AS additional,
       CASE silver_fir_area is null
           WHEN TRUE THEN 'unknown'
           ELSE silver_fir_area_meta.code_ta
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
       CASE
           WHEN trim(both from target_forest_type) = any(SELECT code FROM foresttype_meta) THEN target_forest_type
           WHEN trim(both from forest_type) = any(SELECT code FROM foresttype_meta) THEN forest_type
           ELSE null
       END AS target_forest_type
FROM
    (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(forest_ecoregions,specific_forest_ecoregions), '2(,|\s)', '2a, 2b,'), 'R5', '5a, 5b,'),',\s?'),
                                (SELECT string_agg(subcode, '|'::text)
                                 FROM forest_ecoregions)))[1] AS processed_forest_ecoregion,
            *
     FROM
         (SELECT lower(coalesce(trim(silver_fir_area),'unknown')),
                 (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(trim(lower(silver_fir_area)),'unknown'), 'haupt- und nebenareal', 'hauptareal,nebenareal'),'haupt- oder nebenareal', 'hauptareal,nebenareal'),',\s?') ,
                                     (SELECT string_agg(lower(areal_de)::text, '|'::text) || '|unknown'
                                      FROM silver_fir_areas)))[1] AS processed_silver_fir_area,
                 *
          FROM projections_import) import_silver_fir_area) import
LEFT JOIN altitudinal_zone_meta ON lower(altitudinal_zone_meta.projection::text) = lower(import.altitudinal_zone)
LEFT JOIN altitudinal_zone_meta target_altitudinal_zone_meta ON lower(target_altitudinal_zone_meta.projection::text) = lower(import.target_altitudinal_zone)
LEFT JOIN additional_meta ON lower(additional_meta.source) = lower(import.additional)
LEFT JOIN silver_fir_area_meta ON lower(silver_fir_area_meta.projection) = import.processed_silver_fir_area
LEFT JOIN relief_meta ON relief_meta.source = import.relief
LEFT JOIN slopes ON slopes.slope = import.slope;

----------------------------------------------
-- export projections_export to json

COPY
    (WITH relief AS
         (SELECT forest_ecoregion,
                 altitudinal_zone,
                 forest_type,
                 slope,
                 additional,
                 silver_fir_area,
                 jsonb_object_agg(relief::text, target_altitudinal_zone::text||':'||target_forest_type::text) AS json
          FROM projections_export
          WHERE target_forest_type IS NOT NULL
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
     WHERE altitudinal_zone.json IS NOT NULL) To '/data/projections.json';

------------------------------
----- types


COPY
  (WITH foresttype AS
     (SELECT json_agg(jsonb_build_object('code', code, 'de', de) ORDER BY sort) AS
      values
      FROM foresttype_meta),
        treetype AS
     (SELECT json_agg(jsonb_build_object('code', target::text::int, 'de', de, 'endangered', endangered, 'nonresident', nonresident)) AS
      values
      FROM treetype_meta),
        forest_ecoregions AS
     (SELECT json_agg(jsonb_build_object('code', subcode, 'de', region_de)) AS
      values
      FROM forest_ecoregions),
        altitudinal_zone AS
     (SELECT json_agg(jsonb_build_object('code', code, 'de', projection, 'id', id)) AS
      values
      FROM altitudinal_zone_meta),
        additional AS
     (SELECT json_agg(jsonb_build_object('code', target, 'de', de)) AS
      values
      FROM additional_meta),
        silver_fir_areas as
     (SELECT json_agg(jsonb_build_object('code', code_ta, 'de', projection)) AS
      values
      FROM silver_fir_area_meta),
        relief as
     (SELECT json_agg(jsonb_build_object('code', target, 'de', de)) AS
      values
      FROM (SELECT DISTINCT target, de FROM relief_meta) foo),
        slope AS
     (SELECT json_agg(jsonb_build_object('code', target, 'de', de)) AS
      values
      FROM slope_meta) SELECT jsonb_build_object('forestType', foresttype.
                                                 values,'treeType', treetype.
                                                 values,'forestEcoregion', forest_ecoregions.
                                                 values,'altitudinalZone',altitudinal_zone.
                                                 values,'additional',additional.
                                                 values,'silverFirArea',silver_fir_areas.
                                                 values,'relief',relief.
                                                 values,'slope',slope.
                                                 values)
   FROM foresttype,
        treetype,
        forest_ecoregions,
        altitudinal_zone,
        additional,
        silver_fir_areas,
        relief,
        slope) TO '/data/types.json';

     GET DIAGNOSTICS x = ROW_COUNT;
  RETURN x;
END;
$$ LANGUAGE plpgsql;