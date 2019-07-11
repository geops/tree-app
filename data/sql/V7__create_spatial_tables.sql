CREATE TABLE "vegetationshoehenstufen_1995" (gid serial, "hs_de" varchar(200),
                                                                 "hs_fr" varchar(200),
                                                                         "hs_it" varchar(200),
                                                                                 "hs_en" varchar(200),
                                                                                         "code" int8, "subcode" int8);


ALTER TABLE "vegetationshoehenstufen_1995" ADD PRIMARY KEY (gid);


SELECT AddGeometryColumn('','vegetationshoehenstufen_1995','geom','2056','MULTIPOLYGON',2);

CREATE VIEW altitudinal_zones_1995_export AS 
SELECT target as key, ST_Union(ST_MakeValid(geom)) as geometry
FROM vegetationshoehenstufen_1995
JOIN heightlevel_meta ON code = any(vegetationshoehenstufen_codes)
GROUP BY target;