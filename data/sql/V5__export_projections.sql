CREATE TABLE projections_export (id serial, forest_ecoregion text, altitudinal_zones text, foresttype foresttype,
                                                                                           targets foresttype,
                                                                                           additional additional,
                                                                                           silver_fir_area text, relief relief,
                                                                                                                 slope text);


CREATE FUNCTION export_projections() RETURNS integer AS $$
DECLARE x integer;
BEGIN
 TRUNCATE projections_export;

INSERT INTO projections_export (forest_ecoregion, altitudinal_zones, foresttype, targets, additional, silver_fir_area, relief, slope) -- 3.) Match CSV values to enum values.
WITH slopes AS
    (SELECT slope,
            array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope
     FROM projections_import)
SELECT region AS forest_ecoregion,
       alt_zone_meta.code AS altitudinal_zone,
       CASE regexp_replace(foresttype, ' collin', '')::name = any(enum_range(null::foresttype)::name[])
           WHEN TRUE THEN regexp_replace(foresttype, ' collin', '')::foresttype
           ELSE null
       END,
       CASE regexp_replace(targets, ' collin', '')::name = any(enum_range(null::foresttype)::name[])
           WHEN TRUE THEN regexp_replace(targets, ' collin', '')::foresttype
           ELSE null
       END,
       CASE add_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE add_meta.target
       END AS additional,
       CASE tannenareal is null
           WHEN TRUE THEN 'unknown'
           ELSE sil_fir_meta.code_ta
       END AS silver_fir_area,
       CASE relief_meta.target is null
           WHEN TRUE THEN 'unknown'
           ELSE relief_meta.target
       END AS relief,
       CASE slopes.slope is null
           WHEN TRUE THEN 'unknown'
           ELSE slopes.parsed_slope
       END AS slope
FROM
    (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(standortsregion,regions), '2(,|\s)', '2a, 2b,'), 'R5', '5a, 5b,'),',\s?'),
                                (SELECT string_agg(subcode, '|'::text)
                                 FROM forest_ecoregions)))[1] AS region,
            *
     FROM
         (SELECT lower(coalesce(trim(lower(reliktareal)),trim(lower(nebenareal)),trim(lower(tannenareal)),'unknown')),
                 (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(trim(lower(tannenareal)),'unknown'), 'haupt- und nebenareal', 'hauptareal,nebenareal'),'haupt- oder nebenareal', 'hauptareal,nebenareal'),',\s?') ,
                                     (SELECT string_agg(lower(areal_de)::text, '|'::text) || '|unknown'
                                      FROM silver_fir_areas)))[1] AS tan_splited,
                 *
          FROM projections_import)subquery1) i
LEFT JOIN altitudinal_zone_meta alt_zone_meta ON alt_zone_meta.projection::text = lower(i.heightlevel)
LEFT JOIN additional_meta add_meta ON lower(add_meta.source) = lower(i.condition)
LEFT JOIN silver_fir_area_meta sil_fir_meta ON lower(sil_fir_meta.projection) = i.tan_splited
LEFT JOIN relief_meta ON relief_meta.source = i.relief
LEFT JOIN slopes ON slopes.slope = i.slope;

----------------------------------------------
-- export projections_export to json

COPY
    (WITH relief AS
         (SELECT foresttype,
                 forest_ecoregion,
                 altitudinal_zones,
                 slope,
                 additional,
                 silver_fir_area,
                 jsonb_object_agg(relief, targets::text) AS json
          FROM projections_export
          WHERE targets IS NOT NULL
          GROUP BY foresttype,
                   forest_ecoregion,
                   altitudinal_zones,
                   slope,
                   additional,
                   silver_fir_area),
          silver_fir_area AS
         (SELECT foresttype,
                 forest_ecoregion,
                 altitudinal_zones,
                 slope,
                 additional,
                 jsonb_object_agg(silver_fir_area, relief.json) AS json
          FROM projections_export
          LEFT JOIN relief USING (foresttype,
                                  forest_ecoregion,
                                  altitudinal_zones,
                                  slope,
                                  additional,
                                  silver_fir_area)
          WHERE relief.json IS NOT NULL
          GROUP BY foresttype,
                   forest_ecoregion,
                   altitudinal_zones,
                   slope,
                   additional),
          additional AS
         (SELECT foresttype,
                 forest_ecoregion,
                 altitudinal_zones,
                 slope,
                 jsonb_object_agg(additional,silver_fir_area.json) AS json
          FROM projections_export
          LEFT JOIN silver_fir_area USING (foresttype,
                                           forest_ecoregion,
                                           altitudinal_zones,
                                           slope,
                                           additional)
          WHERE silver_fir_area.json IS NOT NULL
          GROUP BY foresttype,
                   forest_ecoregion,
                   altitudinal_zones,
                   slope),
          slope AS
         (SELECT foresttype,
                 forest_ecoregion,
                 altitudinal_zones,
                 jsonb_object_agg(slope, additional.json) AS json
          FROM projections_export
          LEFT JOIN additional USING (foresttype,
                                      forest_ecoregion,
                                      altitudinal_zones,
                                      slope)
          WHERE additional.json IS NOT NULL
          GROUP BY foresttype,
                   forest_ecoregion,
                   altitudinal_zones),
          altitudinal_zoness AS
         (SELECT foresttype,
                 forest_ecoregion,
                 jsonb_object_agg(altitudinal_zones, slope.json) AS json
          FROM projections_export
          LEFT JOIN slope USING (foresttype,
                                 forest_ecoregion,
                                 altitudinal_zones)
          WHERE slope.json IS NOT NULL
          GROUP BY foresttype,
                   forest_ecoregion),
          forest_ecoregions AS
         (SELECT foresttype,
                 jsonb_object_agg(forest_ecoregion, altitudinal_zoness.json) AS json
          FROM projections_export
          LEFT JOIN altitudinal_zoness USING (foresttype,
                                              forest_ecoregion)
          WHERE altitudinal_zoness.json IS NOT NULL
          GROUP BY foresttype) SELECT jsonb_object_agg(coalesce(foresttype::text, 'not found'), forest_ecoregions.json)
     FROM projections_export
     LEFT JOIN forest_ecoregions USING (foresttype)
     WHERE forest_ecoregions.json IS NOT NULL) To '/data/projections.json';

------------------------------
----- types


COPY
  (WITH foresttype AS
     (SELECT json_agg(jsonb_build_object('code', target, 'de', de)) AS
      values
      FROM foresttype_meta),
        treetype AS
     (SELECT json_agg(jsonb_build_object('code', target::text::int, 'de', de)) AS
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
      FROM relief_meta),
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