
----------------------------------------------
-- altitudinal_zones_1995

CREATE OR REPLACE VIEW altitudinal_zones_1995_export AS
WITH altitudinal_zones_zh AS
  (SELECT 
    ST_Union(geom) AS geom,
    meta.code
  FROM (SELECT *, (regexp_matches(hstufe, '(\w*)'))[1] code FROM forest_types_zh) zh
  LEFT JOIN altitudinal_zone_meta meta ON zh.code = meta.zh
  WHERE meta.code IS NOT NULL
  GROUP BY meta.code)
SELECT (code::TEXT || subcode::TEXT) AS code,
       ST_Transform(ST_Difference(geom, (SELECT ST_Union(geom) FROM altitudinal_zones_zh)), 3857) AS geometry
FROM altitudinal_zones_1995
UNION
SELECT zh.code,
       ST_Transform(zh.geom, 3857) AS geometry
FROM altitudinal_zones_zh zh;


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
SELECT CASE nais2_txt is null
           WHEN TRUE THEN nais1_txt
           ELSE nais1_txt || '(' || nais2_txt || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry
FROM forest_types_lu
WHERE nais1_txt IS NOT NULL
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
WHERE code_nais IS NOT NULL;