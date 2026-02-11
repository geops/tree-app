
----------------------------------------------
-- altitudinal_zones_1995

CREATE OR REPLACE VIEW altitudinal_zones_1995_export AS
WITH altitudinal_zones_cantonal AS
  (SELECT foo.geom, foo.code, foo.code_style
       FROM (
              SELECT
              ST_Union(geom) AS geom,
              meta.code,
              meta.code as code_style
              FROM (SELECT st_makevalid(geom) as geom, (regexp_matches(hstufe, '(\w*)'))[1] code FROM forest_types_zh) zh
                LEFT JOIN altitudinal_zone_meta meta ON zh.code = meta.zh
                WHERE meta.code IS NOT NULL
                GROUP BY meta.code
              UNION
              SELECT
              ST_Union(geom) AS geom,
              meta.code,
              meta.code as code_style
              FROM (SELECT st_makevalid(geom) as geom, (regexp_matches(hstufe, '(\w*)'))[1] code FROM forest_types_zh_2) zh_2
                LEFT JOIN altitudinal_zone_meta meta ON zh_2.code = meta.zh
                WHERE meta.code IS NOT NULL
                GROUP BY meta.code
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  hohenstufe::text as code,
                  hohenstufe::text as code_style
              FROM forest_types_ne
                WHERE hohenstufe IS NOT NULL
                GROUP BY hohenstufe)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  hs::text as code,
                  hs::text as code_style
              FROM forest_types_lu
                WHERE hs IS NOT NULL
                GROUP BY hs)
              UNION
              (SELECT ST_Union(geom) AS geom,
                  CASE meta_ue.code is null
                    WHEN TRUE THEN meta.code
                    ELSE meta.code || '(' || meta_ue.code || ')'
                  END AS code,
                  meta.code as code_style
              FROM (SELECT * FROM forest_types_ju) ju
                LEFT JOIN altitudinal_zone_meta meta ON ju.hs1 = meta.zh
                LEFT JOIN altitudinal_zone_meta meta_ue ON ju.hsue = meta_ue.zh
                WHERE meta.code IS NOT NULL
                GROUP BY meta.code, meta_ue.code)
              UNION
              (SELECT 
                  ST_Union(st_makevalid(geom)) AS geom,
                  hs::text as code,
                  hs::text as code_style
              FROM altitudinal_zones_vd
                WHERE hs IS NOT NULL
                GROUP BY hs)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  hs::text as code,
                  hs::text as code_style
              FROM forest_types_bl
                WHERE hs IS NOT NULL
                GROUP BY hs)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue is null
                    WHEN TRUE THEN hs::text
                    ELSE hs::text || '(' || hsue::text || ')'
                  END AS code,
                  hs::text as code_style
              FROM forest_types_sg
                WHERE hs IS NOT NULL
                GROUP BY hs, hsue)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE naisue is null 
                    WHEN TRUE THEN hs::text 
                    ELSE hs::text || '(' || hs::text || ')'
                  END as code,
                  hs::text as code_style
              FROM forest_types_sh
                WHERE hs IS NOT NULL
                GROUP BY hs, naisue)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue_code is null
                    WHEN TRUE THEN hs_code::text
                    ELSE hs_code::text || '(' || hsue_code::text || ')'
                  END AS code,
                  hs_code::text as code_style
              FROM forest_types_so
                WHERE hs_code IS NOT NULL
                GROUP BY hs_code, hsue_code)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue_code is null
                    WHEN TRUE THEN hs_code::text
                    ELSE hs_code::text || '(' || hsue_code::text || ')'
                  END AS code,
                  hs_code::text as code_style
              FROM forest_types_gl
                WHERE hs_code IS NOT NULL and geom is not null
                GROUP BY hs_code, hsue_code)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue_code is null
                    WHEN TRUE THEN hs_code::text
                    ELSE hs_code::text || '(' || hsue_code::text || ')'
                  END AS code,
                  hs_code::text as code_style
              FROM forest_types_ar
                WHERE hs_code IS NOT NULL and geom is not null
                GROUP BY hs_code, hsue_code)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue_code is null
                    WHEN TRUE THEN hs_code::text
                    ELSE hs_code::text || '(' || hsue_code::text || ')'
                  END AS code,
                  hs_code::text as code_style
              FROM forest_types_sz
                WHERE hs_code IS NOT NULL and geom is not null
                GROUP BY hs_code, hsue_code)
              UNION
              (SELECT 
                  ST_Union(geom) AS geom,
                  CASE hsue_code is null
                    WHEN TRUE THEN hs_code::text
                    ELSE hs_code::text || '(' || hsue_code::text || ')'
                  END AS code,
                  hs_code::text as code_style
              FROM forest_types_fr
                WHERE hs_code IS NOT NULL and geom is not null
                GROUP BY hs_code, hsue_code)
       )foo )

SELECT (code::TEXT || subcode::TEXT)::text AS code, (code::TEXT || subcode::TEXT)::text AS code_style,
       ST_Transform(ST_Difference(geom, (SELECT ST_Union(geom) FROM altitudinal_zones_cantonal)), 3857) AS geometry
FROM altitudinal_zones_1995
UNION
SELECT azc.code::text,
       azc.code_style::text,
       ST_Transform(azc.geom, 3857) AS geometry
FROM altitudinal_zones_cantonal azc;


----------------------------------------------
-- altitudinal_zones_2085_dry

CREATE OR REPLACE VIEW altitudinal_zones_2085_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::text AS code, (code::TEXT || subcode::TEXT)::text AS code_style, 
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_dry;


----------------------------------------------
-- altitudinal_zones_2085_less_dry

CREATE OR REPLACE VIEW altitudinal_zones_2085_less_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::text AS code, (code::TEXT || subcode::TEXT)::text AS code_style, 
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_less_dry;


----------------------------------------------
-- forest_ecoregions

CREATE OR REPLACE VIEW forest_ecoregions_export AS
SELECT subcode as code,
       ST_Transform(ST_Union(ST_MakeValid(geom)),3857) as geometry
FROM forest_ecoregions
GROUP BY subcode;

----------------------------------------------
-- silver_fir_areas

CREATE OR REPLACE VIEW silver_fir_areas_export AS
SELECT code_ta as code,
       ST_Transform(geom, 3857) as geometry
FROM silver_fir_areas;

----------------------------------------------
-- forest_types

CREATE OR REPLACE VIEW forest_types_export AS
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_tg
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT CASE nais2 is null
          WHEN TRUE THEN nais1
          ELSE nais1 || '(' || nais2 || ')'
       END as code,
       ST_Transform(geom, 3857) as geometry,
       CASE nais2 is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || nais2 || ')'
       END as code_vd,
       CASE nais2 is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || nais2 || ')'
       END as code_so,
       null as info_vd
FROM forest_types_lu
WHERE nais1 IS NOT NULL and geom is not null
UNION
SELECT typ_nais AS code,
       ST_Transform(geom, 3857) as geometry,
       typ_nais as code_vd,
       typ_nais as code_so,
       null as info_vd
FROM forest_types_fl
WHERE typ_nais IS NOT NULL and geom is not null
UNION
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_zh
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_zh_2
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT code_nais AS code,
       ST_Transform(geom, 3857) as geometry,
       code_nais as code_vd,
       code_nais as code_so,
       null as info_vd
FROM forest_types_ne
WHERE code_nais IS NOT NULL and geom is not null
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_fr
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT CASE naisue is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || naisue || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry,
       CASE naisue is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || naisue || ')'
       END as code_vd,
       CASE naisue is null
           WHEN TRUE THEN nais1
           ELSE nais1 || '(' || naisue || ')'
       END as code_so,
       null as info_vd
FROM forest_types_ju
WHERE nais1 IS NOT NULL and geom is not null
UNION
SELECT nais_2022 AS code,
       ST_Transform(geom, 3857) as geometry,
       nais_2022 as code_vd,
       nais_2022 as code_so,
       null as info_vd
FROM forest_types_bl
WHERE nais_2022 IS NOT NULL and geom is not null
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry,
       vd as code_vd,
       nais AS code_so,
       popup as info_vd
FROM forest_types_vd
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT CASE taue is null
           WHEN TRUE THEN ta
           ELSE ta || '(' || taue || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry,
       CASE taue is null
           WHEN TRUE THEN ta
           ELSE ta || '(' || taue || ')'
       END AS code_vd,
       CASE taue is null
           WHEN TRUE THEN ta
           ELSE ta || '(' || taue || ')'
       END AS code_so,
       null as info_vd
FROM forest_types_sg
WHERE ta IS NOT NULL and geom is not null
UNION
SELECT CASE naisue is null
           WHEN TRUE THEN nais
           ELSE nais || '(' || naisue || ')'
       END AS code,
       ST_Transform(geom, 3857) as geometry,
       CASE naisue is null
           WHEN TRUE THEN nais
           ELSE nais || '(' || naisue || ')'
       END AS code_vd,
       CASE naisue is null
           WHEN TRUE THEN nais
           ELSE nais || '(' || naisue || ')'
       END AS code_so,
       null as info_vd
FROM forest_types_sh
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT stan_nais AS code,
       ST_Transform(geom, 3857) as geometry,
       stan_nais as code_vd,
       grunnheit as code_so,
       null as info_vd
FROM forest_types_so
WHERE stan_nais IS NOT NULL and geom is not null
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_gl
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_ar
WHERE nais IS NOT NULL and geom is not null
UNION
SELECT nais AS code,
       ST_Transform(geom, 3857) as geometry,
       nais as code_vd,
       nais as code_so,
       null as info_vd
FROM forest_types_sz
WHERE nais IS NOT NULL and geom is not null;


---------------- GENERALIZE + UNION -----------------

create table forest_types_tg_gen as (
	select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_tg ft
);
alter table forest_types_tg_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_tg_gen where st_area(geom) < 2000;

create table forest_types_lu_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_lu ft
);
alter table forest_types_lu_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_lu_gen where st_area(geom) < 2000;

create table forest_types_ju_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_ju ft
);
alter table forest_types_ju_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_ju_gen where st_area(geom) < 2000;

create table forest_types_fl_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_fl ft
);
alter table forest_types_fl_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_fl_gen where st_area(geom) < 2000;

create table forest_types_zh_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_zh ft
);
alter table forest_types_zh_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_zh_gen where st_area(geom) < 2000;

create table forest_types_zh_2_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_zh_2 ft
);
alter table forest_types_zh_2_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_zh_2_gen where st_area(geom) < 2000;

create table forest_types_ne_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_ne ft
);
alter table forest_types_ne_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_ne_gen where st_area(geom) < 2000;

create table forest_types_fr_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_fr ft
);
alter table forest_types_fr_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_fr_gen where st_area(geom) < 2000;

create table forest_types_bl_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_bl ft
);
alter table forest_types_bl_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_bl_gen where st_area(geom) < 2000;

create table forest_types_vd_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_vd ft
);
alter table forest_types_vd_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_vd_gen where st_area(geom) < 2000;

create table forest_types_sz_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_sz ft
);
alter table forest_types_sz_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_sz_gen where st_area(geom) < 2000;

create table forest_types_sg_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_sg ft
);
alter table forest_types_sg_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_sg_gen where st_area(geom) < 2000;

create table forest_types_sh_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_sh ft
);
alter table forest_types_sh_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_sh_gen where st_area(geom) < 2000;

create table forest_types_so_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_so ft
);
alter table forest_types_so_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_so_gen where st_area(geom) < 2000;

create table forest_types_gl_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_gl ft
);
alter table forest_types_gl_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_gl_gen where st_area(geom) < 2000;

create table forest_types_ar_gen as (
  select (st_dump(ST_SimplifyPreserveTopology(st_buffer(st_union(st_buffer(ft.geom, 50)), -50), 30))).geom as geom from forest_types_ar ft
);
alter table forest_types_ar_gen alter column geom type geometry(Multipolygon, 2056);
delete from forest_types_ar_gen where st_area(geom) < 2000;

CREATE OR REPLACE VIEW forest_types_union_export AS
SELECT ST_Transform(ST_Union(geom), 3857) AS geom
FROM (
  SELECT (ST_Dump(ST_MakeValid(geom))).geom AS geom FROM forest_types_tg_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_fl_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_fr_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_bl_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_vd_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_sz_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_sg_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_sh_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_so_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_gl_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_ar_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_bl_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_ju_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_lu_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_ne_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_zh_gen
  UNION ALL
  SELECT (ST_Dump(ST_MakeValid(geom))).geom FROM forest_types_zh_2_gen
) AS all_geoms
WHERE GeometryType(geom) IN ('POLYGON', 'MULTIPOLYGON');

