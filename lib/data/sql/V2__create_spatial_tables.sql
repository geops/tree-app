----------------------------------------------
-- altitudinal_zones_1995

CREATE TABLE "altitudinal_zones_1995" (gid serial, "hs_de" varchar(200),
                                                           "hs_fr" varchar(200),
                                                                   "hs_it" varchar(200),
                                                                           "hs_en" varchar(200),
                                                                                   "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_1995" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_1995','geom','2056','MULTIPOLYGON',2);

----------------------------------------------
-- altitudinal_zones_2085_dry

CREATE TABLE "altitudinal_zones_2085_dry" (gid serial, "hs_de" varchar(200),
                                                               "hs_fr" varchar(200),
                                                                       "hs_it" varchar(200),
                                                                               "hs_en" varchar(200),
                                                                                       "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_2085_dry" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_2085_dry','geom','2056','MULTIPOLYGON',2);


----------------------------------------------
-- altitudinal_zones_2085_less_dry

CREATE TABLE "altitudinal_zones_2085_less_dry" (gid serial, "hs_de" varchar(200),
                                                                    "hs_fr" varchar(200),
                                                                            "hs_it" varchar(200),
                                                                                    "hs_en" varchar(200),
                                                                                            "code" int8, "subcode" int8);


ALTER TABLE "altitudinal_zones_2085_less_dry" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_2085_less_dry','geom','2056','MULTIPOLYGON',2);


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


----------------------------------------------
-- Forest types ZH

CREATE TABLE "forest_types_zh" (gid serial,
"vecode" float8,
"ek72" varchar(10),
"vename" varchar(80),
"nais" varchar(15),
"hstufe" varchar(15),
"shape_area" numeric,
"shape_len" numeric);


ALTER TABLE "forest_types_zh" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_zh','geom','2056','MULTIPOLYGON',2);


----------------------------------------------
-- Forest types NE


CREATE TABLE "forest_types_ne" (gid serial,
"code_neuch" float8,
"associatio" varchar(254),
"code_nais" varchar(5));

ALTER TABLE "forest_types_ne" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_ne','geom','2056','MULTIPOLYGON',2);

