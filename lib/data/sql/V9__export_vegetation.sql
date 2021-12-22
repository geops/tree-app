COPY
    (WITH herb1 AS
         (SELECT foresttype_code,
                 json_agg(herbtype_code::text::int
                          ORDER BY herbtype_code) herbtypes
          FROM herbtype_foresttype
          WHERE frequency = 1
          GROUP BY foresttype_code),
          herb2 AS
         (SELECT foresttype_code,
                 json_agg(herbtype_code::text::int
                          ORDER BY herbtype_code) herbtypes
          FROM herbtype_foresttype
          WHERE frequency = 2
          GROUP BY foresttype_code),
          bush1 AS
         (SELECT foresttype_code,
                 json_agg(bushtype_code::text::int
                          ORDER BY bushtype_code) bushtypes
          FROM bushtype_foresttype
          WHERE frequency = 1
          GROUP BY foresttype_code),
          bush2 AS
         (SELECT foresttype_code,
                 json_agg(bushtype_code::text::int
                          ORDER BY bushtype_code) bushtypes
          FROM bushtype_foresttype
          WHERE frequency = 2
          GROUP BY foresttype_code),
          moss1 AS
         (SELECT foresttype_code,
                 json_agg(mosstype_code::text::int
                          ORDER BY mosstype_code) mosstypes
          FROM mosstype_foresttype
          WHERE frequency = 1
          GROUP BY foresttype_code),
          moss2 AS
         (SELECT foresttype_code,
                 json_agg(mosstype_code::text::int
                          ORDER BY mosstype_code) mosstypes
          FROM mosstype_foresttype
          WHERE frequency = 2
          GROUP BY foresttype_code) SELECT json_object_agg(meta.code,json_build_object('herb', json_build_array(coalesce(herb1.herbtypes,'[]'::json),coalesce(herb2.herbtypes,'[]'::json)),'bush', json_build_array(coalesce(bush1.bushtypes,'[]'::json),coalesce(bush2.bushtypes,'[]'::json)),'moss', json_build_array(coalesce(moss1.mosstypes,'[]'::json),coalesce(moss2.mosstypes,'[]'::json)))) AS vegetation
     FROM foresttype_meta meta
     LEFT JOIN herb1 ON meta.code = herb1.foresttype_code
     LEFT JOIN herb2 ON meta.code = herb2.foresttype_code
     LEFT JOIN bush1 ON meta.code = bush1.foresttype_code
     LEFT JOIN bush2 ON meta.code = bush2.foresttype_code
     LEFT JOIN moss1 ON meta.code = moss1.foresttype_code
     LEFT JOIN moss2 ON meta.code = moss2.foresttype_code) TO '/data/vegetation.json';