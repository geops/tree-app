COPY
  (WITH foresttype AS
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM foresttype_meta),
        treetype AS
     (SELECT json_agg(jsonb_build_object('key', target::text::int, 'de', de)) AS
      values
      FROM treetype_meta),
        regions AS
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM region_meta),
        heightlevel AS
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de,'id',id)) AS
      values
      FROM heightlevel_meta),
        additional AS
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM additional_meta),
        tannenareal as
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM tannen_meta),
        relief as
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM relief_meta),
        slope AS
     (SELECT json_agg(jsonb_build_object('key', target, 'de', de)) AS
      values
      FROM slope_meta) SELECT jsonb_build_object('forestType', foresttype.
                                                 values,'treeType', treetype.
                                                 values,'forestEcoregion', regions.
                                                 values,'heightLevel',heightlevel.
                                                 values,'additional',additional.
                                                 values,'tannenareal',tannenareal.
                                                 values,'relief',relief.
                                                 values,'slope',slope.
                                                 values)
   FROM foresttype,
        treetype,
        regions,
        heightlevel,
        additional,
        tannenareal,
        relief,
        slope) TO '/data/types.json';