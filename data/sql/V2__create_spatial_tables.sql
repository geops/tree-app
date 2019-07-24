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
       geom AS geometry
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
       geom AS geometry
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
       geom AS geometry
FROM altitudinal_zones_2085_less_dry;

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
       ST_Union(ST_MakeValid(geom)) as geometry
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
       geom as geometry
FROM silver_fir_areas;

