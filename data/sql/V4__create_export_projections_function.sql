CREATE FUNCTION export_projections() RETURNS integer AS $$
DECLARE x integer;
BEGIN
  TRUNCATE projections_export;
  INSERT INTO projections_export (region, heightlevel, foresttype, targets, slope)
    -- 3.) Match CSV values to enum values.
    WITH slopes AS (SELECT slope, array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope FROM projections_import)
       SELECT
      region,
      hm.target AS heightlevel,
      CASE foresttype::name = any(enum_range(null::foresttype)::name[])
        WHEN TRUE THEN foresttype::foresttype
        ELSE null
      END,
      CASE targets::name = any(enum_range(null::foresttype)::name[])
        WHEN TRUE THEN targets::foresttype
        ELSE null
      END,
      CASE slopes.slope is null
        WHEN TRUE THEN 'unknown'
        ELSE slopes.parsed_slope
      END AS slope
    FROM (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(regions, '2(,|\s)', '2a, 2b,'), ',\s?'), (
        WITH regions AS (SELECT unnest(enum_range(NULL::region))::text)
        SELECT string_agg(regions.unnest, '|'::text) FROM regions
      )))[1]::region AS region, * FROM projections_import) i
    LEFT JOIN heightlevel_meta hm ON hm.source = i.heightlevel
    LEFT JOIN slopes ON slopes.slope = i.slope;

COPY
    (WITH foresttype AS
         (SELECT region,
                 heightlevel,
                 slope,
                 jsonb_object_agg(coalesce(foresttype::text, 'not found'), coalesce(targets::text, 'not found')) AS json
          FROM projections_export
          GROUP BY (region,
                   heightlevel,
                   slope)),
          slope AS
         (SELECT region,
                 heightlevel,
                 jsonb_object_agg(slope, foresttype.json) AS json
          FROM projections_export
          LEFT JOIN foresttype USING (region, heightlevel, slope)
          GROUP BY region,
                   heightlevel),
          heightlevels AS
         (SELECT region,
                 jsonb_object_agg(heightlevel, slope.json) AS json
          FROM projections_export
          LEFT JOIN slope USING (region,
                                 heightlevel)
          GROUP BY region) SELECT jsonb_object_agg(region, heightlevels.json)
     FROM projections_export
     LEFT JOIN heightlevels USING (region)) TO '/data/projections.json';

-- 5.) Dynamically generate json file for enum validation in the library
COPY (
WITH
foresttype AS (
SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS values FROM foresttype_meta
),
regions AS (
SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS values FROM region_meta
),
heightlevel AS (
SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS values FROM heightlevel_meta
)
SELECT jsonb_build_object('forestType', foresttype.values,'forestEcoregion', regions.values,'heightLevel',heightlevel.values)
FROM foresttype, regions, heightlevel
) TO '/data/valid_enum.json';


  GET DIAGNOSTICS x = ROW_COUNT;
  RETURN x;
END;
$$ LANGUAGE plpgsql;

