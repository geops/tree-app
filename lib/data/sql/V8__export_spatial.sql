
----------------------------------------------
-- altitudinal_zones_1995

CREATE OR REPLACE VIEW altitudinal_zones_1995_export AS
WITH altitudinal_zones_cantonal AS
  (SELECT foo.geom, foo.code 
       FROM (
              SELECT
              ST_Union(geom) AS geom,
              meta.code
              FROM (SELECT *, (regexp_matches(hstufe, '(\w*)'))[1] code FROM forest_types_zh) zh
                LEFT JOIN altitudinal_zone_meta meta ON zh.code = meta.zh
                WHERE meta.code IS NOT NULL
                GROUP BY meta.code
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  hohenstufe::text as code
              FROM forest_types_ne
                WHERE hohenstufe IS NOT NULL
                GROUP BY hohenstufe)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  hs::text as code
              FROM forest_types_lu
                WHERE hs IS NOT NULL
                GROUP BY hs)
              UNION
              (SELECT
              ST_Union(geom) AS geom,
              meta.code
              FROM (SELECT * FROM forest_types_ju) ju
                LEFT JOIN altitudinal_zone_meta meta ON ju.hs1 = meta.zh
                WHERE meta.code IS NOT NULL
                GROUP BY meta.code)
       )foo )

SELECT (code::TEXT || subcode::TEXT)::integer AS code,
       ST_Transform(ST_Difference(geom, (SELECT ST_Union(geom) FROM altitudinal_zones_cantonal)), 3857) AS geometry
FROM altitudinal_zones_1995
UNION
SELECT azc.code::integer,
       ST_Transform(azc.geom, 3857) AS geometry
FROM altitudinal_zones_cantonal azc;


----------------------------------------------
-- altitudinal_zones_2085_dry

CREATE VIEW altitudinal_zones_2085_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::INT AS code,
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_dry;


----------------------------------------------
-- altitudinal_zones_2085_less_dry

CREATE VIEW altitudinal_zones_2085_less_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::INT AS code,
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_less_dry;


----------------------------------------------
-- forest_ecoregions

CREATE VIEW forest_ecoregions_export AS
SELECT subcode as code,
       ST_Transform(ST_Union(ST_MakeValid(geom)),3857) as geometry
FROM forest_ecoregions
GROUP BY subcode;

----------------------------------------------
-- silver_fir_areas

CREATE VIEW silver_fir_areas_export AS
SELECT code_ta as code,
       ST_Transform(geom, 3857) as geometry
FROM silver_fir_areas;

----------------------------------------------
-- forest_types

CREATE VIEW forest_types_export AS
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_tg
WHERE nais IS NOT NULL
UNION
SELECT CASE nais2 is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || nais2 || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_lu
WHERE nais1 IS NOT NULL
UNION
SELECT typ_nais AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_fl
WHERE typ_nais IS NOT NULL
UNION
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_zh
WHERE nais IS NOT NULL
UNION
SELECT code_nais AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_ne
WHERE code_nais IS NOT NULL
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_fr
WHERE nais IS NOT NULL
UNION
SELECT CASE naisue is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || naisue || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_ju
WHERE nais1 IS NOT NULL;