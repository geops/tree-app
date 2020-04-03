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
                                                                                                               "code_fi" int4);


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
                                                                                         "code_ta" int4);


ALTER TABLE "silver_fir_areas" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','silver_fir_areas','geom','2056','MULTIPOLYGON',2);


CREATE VIEW silver_fir_areas_export AS
SELECT code_ta as code,
       ST_Transform(geom, 3857) as geometry
FROM silver_fir_areas;

----------------------------------------------
-- nawalges_v1_py

CREATE TABLE "nawalges_v1_py" (gid serial, "farbe" int4,
                                           "g1" int4,
                                           "g2" int4,
                                           "g3" int4,
                                           "g4" int4,
                                           "g5" int4,
                                           "typ" int4,
                                           "nass" int4,
                                           "code" int4,
                                           "plottxt" varchar(50),
                                                     "g1_txt" varchar(7),
                                                              "g2_txt" varchar(7),
                                                                       "g3_txt" varchar(7),
                                                                                "g4_txt" varchar(7),
                                                                                         "g5_txt" varchar(7),
                                                                                                  "verdrisk" int4,
                                                                                                  "mg_nat" int4,
                                                                                                  "shape_area" numeric, "shape_len" numeric);


ALTER TABLE "nawalges_v1_py" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','nawalges_v1_py','geom','2056','MULTIPOLYGON',2);


CREATE TABLE "nawalges_v1_py_mod" (gid serial, "farbe" int4,
                                               "g1" int4,
                                               "g2" int4,
                                               "g3" int4,
                                               "g4" int4,
                                               "g5" int4,
                                               "typ" int4,
                                               "nass" int4,
                                               "code" int4,
                                               "plottxt" varchar(50),
                                                         "g1_txt" varchar(7),
                                                                  "g2_txt" varchar(7),
                                                                           "g3_txt" varchar(7),
                                                                                    "g4_txt" varchar(7),
                                                                                             "g5_txt" varchar(7),
                                                                                                      "verdrisk" int4,
                                                                                                      "mg_nat" int4,
                                                                                                      "shape_area" numeric, "shape_len" numeric, "id" int4);


ALTER TABLE "nawalges_v1_py_mod" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','nawalges_v1_py_mod','geom','2056','MULTIPOLYGON',2);


CREATE VIEW forest_types_export AS
SELECT nais as code,
       ST_Transform(geom, 3857) as geometry
FROM nawalges_v1_py_mod
LEFT JOIN mapping_luzern ON nawalges_v1_py_mod.g1_txt = mapping_luzern.luzern
WHERE nais IS NOT NULL
        AND nais !~ '\(';

