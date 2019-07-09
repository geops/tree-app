CREATE TABLE projections_export (id serial, region region,
                                            heightlevel heightlevel,
                                            foresttype foresttype,
                                            targets foresttype,
                                            additional additional,
                                            tannenareal tannenareal,
                                            relief relief,
                                            slope text);


INSERT INTO projections_export (region, heightlevel, foresttype, targets, additional, tannenareal, relief, slope) -- 3.) Match CSV values to enum values.
 WITH slopes AS
  (SELECT slope,
          array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope
   FROM projections_import)
SELECT region,
       hm.target AS heightlevel,
       CASE regexp_replace(foresttype, ' collin', '')::name = any(enum_range(null::foresttype)::name[])
           WHEN TRUE THEN regexp_replace(foresttype, ' collin', '')::foresttype
           ELSE null
       END,
       CASE regexp_replace(targets, ' collin', '')::name = any(enum_range(null::foresttype)::name[])
           WHEN TRUE THEN regexp_replace(targets, ' collin', '')::foresttype
           ELSE null
       END,
       CASE am.target is null
           WHEN TRUE THEN 'unknown'
           ELSE am.target
       END AS additional,
       CASE tm.target is null
           WHEN TRUE THEN 'unknown'
           ELSE tm.target
       END AS tannenareal,
       CASE rm.target is null
           WHEN TRUE THEN 'unknown'
           ELSE rm.target
       END AS relief,
       CASE slopes.slope is null
           WHEN TRUE THEN 'unknown'
           ELSE slopes.parsed_slope
       END AS slope
FROM
  (SELECT (regexp_matches(regexp_split_to_table(regexp_replace(coalesce(standortsregion,regions), '2(,|\s)', '2a, 2b,'), ',\s?'),
                            (WITH regions AS
                               (SELECT unnest(enum_range(NULL::region))::text) SELECT string_agg(regions.unnest, '|'::text)
                             FROM regions)))[1]::region AS region,
          *
   FROM projections_import) i
LEFT JOIN heightlevel_meta hm ON hm.source = i.heightlevel
LEFT JOIN additional_meta am ON lower(am.source) = lower(i.condition)
LEFT JOIN tannen_meta tm ON lower(tm.source) = coalesce(trim(lower(i.reliktareal)),trim(lower(i.nebenareal)),trim(lower(i.tannenareal)))
LEFT JOIN relief_meta rm ON rm.source = i.relief
LEFT JOIN slopes ON slopes.slope = i.slope;

COPY
  (WITH relief AS
     (SELECT foresttype,
             region,
             heightlevel,
             slope,
             additional,
             tannenareal,
             jsonb_object_agg(relief, targets::text) AS json
      FROM projections_export
      WHERE targets IS NOT NULL
      GROUP BY foresttype,
               region,
               heightlevel,
               slope,
               additional,
               tannenareal),
        tannenareal AS
     (SELECT foresttype,
             region,
             heightlevel,
             slope,
             additional,
             jsonb_object_agg(tannenareal, relief.json) AS json
      FROM projections_export
      LEFT JOIN relief USING (foresttype,
                              region,
                              heightlevel,
                              slope,
                              additional,
                              tannenareal)
      WHERE relief.json IS NOT NULL
      GROUP BY foresttype,
               region,
               heightlevel,
               slope,
               additional),
        additional AS
     (SELECT foresttype,
             region,
             heightlevel,
             slope,
             jsonb_object_agg(additional,tannenareal.json) AS json
      FROM projections_export
      LEFT JOIN tannenareal USING (foresttype,
                                   region,
                                   heightlevel,
                                   slope,
                                   additional)
      WHERE tannenareal.json IS NOT NULL
      GROUP BY foresttype,
               region,
               heightlevel,
               slope),
        slope AS
     (SELECT foresttype,
             region,
             heightlevel,
             jsonb_object_agg(slope, additional.json) AS json
      FROM projections_export
      LEFT JOIN additional USING (foresttype,
                                  region,
                                  heightlevel,
                                  slope)
      WHERE additional.json IS NOT NULL
      GROUP BY foresttype,
               region,
               heightlevel),
        heightlevels AS
     (SELECT foresttype,
             region,
             jsonb_object_agg(heightlevel, slope.json) AS json
      FROM projections_export
      LEFT JOIN slope USING (foresttype,
                             region,
                             heightlevel)
      WHERE slope.json IS NOT NULL
      GROUP BY foresttype,
               region),
        regions AS
     (SELECT foresttype,
             jsonb_object_agg(region, heightlevels.json) AS json
      FROM projections_export
      LEFT JOIN heightlevels USING (foresttype,
                                    region)
      WHERE heightlevels.json IS NOT NULL
      GROUP BY foresttype) SELECT jsonb_object_agg(coalesce(foresttype::text, 'not found'), regions.json)
   FROM projections_export
   LEFT JOIN regions USING (foresttype)
   WHERE regions.json IS NOT NULL ) To '/data/projections.json';