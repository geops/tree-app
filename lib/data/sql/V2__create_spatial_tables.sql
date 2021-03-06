----------------------------------------------
-- altitudinal_zones_1995

CREATE TABLE "altitudinal_zones_1995" (gid serial, "hs_de" varchar(200),
                                                           "hs_fr" varchar(200),
                                                                   "hs_it" varchar(200),
                                                                           "hs_en" varchar(200),
                                                                                   "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_1995" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_1995','geom','2056','MULTIPOLYGON',2);


CREATE VIEW altitudinal_zones_1995_export AS
SELECT (code::TEXT || subcode::TEXT)::INT AS code,
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_1995;

----------------------------------------------
-- altitudinal_zones_2085_dry

CREATE TABLE "altitudinal_zones_2085_dry" (gid serial, "hs_de" varchar(200),
                                                               "hs_fr" varchar(200),
                                                                       "hs_it" varchar(200),
                                                                               "hs_en" varchar(200),
                                                                                       "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_2085_dry" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_2085_dry','geom','2056','MULTIPOLYGON',2);


CREATE VIEW altitudinal_zones_2085_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::INT AS code,
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_dry;

----------------------------------------------
-- altitudinal_zones_2085_less_dry

CREATE TABLE "altitudinal_zones_2085_less_dry" (gid serial, "hs_de" varchar(200),
                                                                    "hs_fr" varchar(200),
                                                                            "hs_it" varchar(200),
                                                                                    "hs_en" varchar(200),
                                                                                            "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_2085_less_dry" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_2085_less_dry','geom','2056','MULTIPOLYGON',2);


CREATE VIEW altitudinal_zones_2085_less_dry_export AS
SELECT (code::TEXT || subcode::TEXT)::INT AS code,
       ST_Transform(geom, 3857) AS geometry
FROM altitudinal_zones_2085_less_dry;

----------------------------------------------
-- cantonal_boundaries

CREATE TABLE "cantonal_boundaries" (gid serial, "uuid" varchar(38),
                                                       "datum_aend" date, "datum_erst" date, "erstell_j" int4,
                                                                                             "erstell_m" varchar(20),
                                                                                                         "revision_j" int4,
                                                                                                         "revision_m" varchar(20),
                                                                                                                      "grund_aend" varchar(20),
                                                                                                                                   "herkunft" varchar(20),
                                                                                                                                              "herkunft_j" int4,
                                                                                                                                              "herkunft_m" varchar(20),
                                                                                                                                                           "objektart" varchar(20),
                                                                                                                                                                       "revision_q" varchar(100),
                                                                                                                                                                                    "icc" varchar(20),
                                                                                                                                                                                          "kantonsnum" int4,
                                                                                                                                                                                          "see_flaech" numeric, "kantonsfla" numeric, "kt_teil" varchar(20),
                                                                                                                                                                                                                                                "name" varchar(254),
                                                                                                                                                                                                                                                       "einwohnerz" int4);


ALTER TABLE "cantonal_boundaries" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','cantonal_boundaries','geom','2056','MULTIPOLYGON',4);


CREATE VIEW cantonal_boundaries_export AS
SELECT ST_Transform(geom, 3857) as geometry
FROM cantonal_boundaries;

----------------------------------------------
-- forest_ecoregions

CREATE TABLE "forest_ecoregions" (gid serial, "region_de" varchar(50),
                                                          "region_fr" varchar(50),
                                                                      "region_it" varchar(100),
                                                                                  "region_en" varchar(100),
                                                                                              "code" varchar(50),
                                                                                                     "subcode" varchar(50),
                                                                                                               "code_bu" int4,
                                                                                                               "code_fi" int4,
                                                                                                               "shape_leng" numeric, "shape_area" numeric);


ALTER TABLE "forest_ecoregions" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_ecoregions','geom','2056','MULTIPOLYGON',2);


CREATE VIEW forest_ecoregions_export AS
SELECT subcode as code,
       ST_Transform(ST_Union(ST_MakeValid(geom)),3857) as geometry
FROM forest_ecoregions
GROUP BY subcode;

----------------------------------------------
-- silver_fir_areas

CREATE TABLE "silver_fir_areas" (gid serial, "areal_de" varchar(50),
                                                        "areal_fr" varchar(50),
                                                                   "areal_it" varchar(50),
                                                                              "areal_en" varchar(50),
                                                                                         "code_ta" int4,
                                                                                         "shape_leng" numeric, "shape_area" numeric);


ALTER TABLE "silver_fir_areas" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','silver_fir_areas','geom','2056','MULTIPOLYGON',2);


CREATE VIEW silver_fir_areas_export AS
SELECT code_ta as code,
       ST_Transform(geom, 3857) as geometry
FROM silver_fir_areas;

----------------------------------------------
-- Forest types TG

CREATE TABLE "forest_types_tg" (gid serial, "fid" numeric, "tgneu" varchar(50),
                                                                   "nais" varchar(50));


ALTER TABLE "forest_types_tg" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_tg','geom','2056','MULTIPOLYGON',2);

----------------------------------------------
-- Forest types LU 

CREATE TABLE "forest_types_lu" (gid serial, "objectid_1" int8, "farbe" numeric, "wag1" numeric, "wag2" varchar(254),
                                                                                                       "wag3" varchar(254),
                                                                                                              "wag4" varchar(254),
                                                                                                                     "wag5" varchar(254),
                                                                                                                            "plottxt" varchar(254),
                                                                                                                                      "wag1_txt" varchar(254),
                                                                                                                                                 "wag2_txt" varchar(254),
                                                                                                                                                            "wag3_txt" varchar(254),
                                                                                                                                                                       "wag4_txt" varchar(254),
                                                                                                                                                                                  "wag5_txt" varchar(254),
                                                                                                                                                                                             "nais1_txt" varchar(254),
                                                                                                                                                                                                         "nais2_txt" varchar(254),
                                                                                                                                                                                                                     "typ" numeric, "shape_leng" numeric, "shape_area" numeric);


ALTER TABLE "forest_types_lu" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_lu','geom','2056','MULTIPOLYGON',2);

----------------------------------------------
-- Forest types FL

CREATE TABLE "forest_types_fl" (gid serial,
"objekt" varchar(32),
"text" varchar(64),
"bonitaet" varchar(32),
"rep" varchar(32),
"dxf_text" varchar(32),
"color" varchar(32),
"dxf_neu" varchar(50),
"text_neu" varchar(254),
"typ_nais" varchar(254),
"text_nais" varchar(100));


ALTER TABLE "forest_types_fl" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_fl','geom','2056','MULTIPOLYGON',2);

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
WHERE typ_nais IS NOT NULL;