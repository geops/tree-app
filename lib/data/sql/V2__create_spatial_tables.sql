----------------------------------------------
-- altitudinal_zones_1995

CREATE TABLE "altitudinal_zones_1995" (gid serial, "hs_de" varchar(200),
                                                           "hs_fr" varchar(200),
                                                                   "hs_it" varchar(200),
                                                                           "hs_en" varchar(200),
                                                                                   "code" varchar(10), "subcode" varchar(10));


ALTER TABLE "altitudinal_zones_1995" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_1995','geom','2056','MULTIPOLYGON',2);

----------------------------------------------
-- altitudinal_zones_2085_dry

CREATE TABLE "altitudinal_zones_2085_dry" (gid serial, "hs_de" varchar(200),
                                                               "hs_fr" varchar(200),
                                                                       "hs_it" varchar(200),
                                                                               "hs_en" varchar(200),
                                                                                       "code" varchar(10), "subcode" varchar(10));


ALTER TABLE "altitudinal_zones_2085_dry" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','altitudinal_zones_2085_dry','geom','2056','MULTIPOLYGON',2);


----------------------------------------------
-- altitudinal_zones_2085_less_dry

CREATE TABLE "altitudinal_zones_2085_less_dry" (gid serial, "hs_de" varchar(200),
                                                                    "hs_fr" varchar(200),
                                                                            "hs_it" varchar(200),
                                                                                    "hs_en" varchar(200),
                                                                                            "code" varchar(10), "subcode" varchar(10));


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

CREATE TABLE "forest_types_lu" (gid serial,
"farbe" int4,
"sto1" int4,
"sto2" int4,
"sto3" int4,
"sto4" int4,
"sto5" int4,
"typ" int4,
"plottxt" varchar(50),
"sto1_txt" varchar(7),
"sto2_txt" varchar(7),
"sto3_txt" varchar(7),
"sto4_txt" varchar(7),
"sto5_txt" varchar(7),
"nais1" varchar(7),
"nais2" varchar(7),
"prio" int4,
"hs" int4,
"verdrisk" int4,
"shape_leng" numeric,
"shape_area" numeric);


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
"hohenstufe" integer,
"code_nais" varchar(5));

ALTER TABLE "forest_types_ne" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_ne','geom','2056','MULTIPOLYGON',2);


----------------------------------------------
-- Forest types FR


CREATE TABLE "forest_types_fr" (gid serial,
"objectid" float8,
"legende" varchar(10),
"wg_1" varchar(10),
"ueh_hoch_1" varchar(10),
"ueh_tief_1" varchar(10),
"td_1" varchar(20),
"taux_1" numeric,
"wg_2" varchar(10),
"ueh_hoch_2" varchar(10),
"ueh_tief_2" varchar(10),
"td_2" varchar(20),
"taux_2" numeric,
"wg_3" varchar(10),
"ueh_hoch_3" varchar(10),
"ueh_tief_3" varchar(10),
"td_3" varchar(20),
"taux_3" numeric,
"wgr" varchar(20),
"annee" varchar(2),
"lot" varchar(10),
"etat" float8,
"assoc_tot_" varchar(35),
"pdf" varchar(20),
"pdf_fr" varchar(50),
"pdf_de" varchar(50),
"wg_tot" varchar(50),
"id_legende" int4,
"legende_fr" varchar(150),
"legende_de" varchar(150),
"legende_la" varchar(150),
"fertilite_" float8,
"fertilite1" float8,
"prop_feuil" float8,
"prop_feu_1" float8,
"ass_remarq" varchar(100),
"score_ass_" numeric,
"shape_star" numeric,
"shape_stle" numeric,
"namensuber" varchar(254),
"nais" varchar(10));

ALTER TABLE "forest_types_fr" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','forest_types_fr','geom','2056','MULTIPOLYGON',2);



----------------------------------------------
-- Forest types JU


CREATE TABLE "forest_types_ju" (gid serial,
"objectid" float8,
"nais1" varchar(80),
"naisue" varchar(80),
"hs1" varchar(80),
"hsue" varchar(80));

ALTER TABLE "forest_types_ju" ADD PRIMARY KEY (gid);

SELECT AddGeometryColumn('','forest_types_ju','geom','0','MULTIPOLYGON',2);


----------------------------------------------
-- Forest types VD


CREATE TABLE "forest_types_vd" (gid serial,
"vd" varchar(80),
"nais" varchar(80),
"ev" varchar(80),
"popup" varchar(80)
"hs" float8)
;
ALTER TABLE "forest_types_vd" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('','forest_types_vd','geom','0','MULTIPOLYGON',2);
