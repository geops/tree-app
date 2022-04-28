CREATE TABLE export_recommendations_csv (x FLOAT, y FLOAT, sto_nr TEXT);

COPY export_recommendations_csv
FROM '/data/export/input.csv'
DELIMITER ';' CSV HEADER;

SELECT AddGeometryColumn ('','export_recommendations_csv','geom', 2056,'POINT',2);

UPDATE export_recommendations_csv SET geom=st_geomfromtext('POINT('||export_recommendations_csv.x||' '||export_recommendations_csv.y||' )', 2056);

ALTER TABLE export_recommendations_csv
ADD COLUMN hoestuf_heute TEXT,
ADD COLUMN hoestuf_maeskw TEXT,
ADD COLUMN hoestuf_starkkw TEXT;

SELECT export.x, export.y, export.sto_nr, alt.code
FROM altitudinal_zones_1995_export alt, export_recommendations_csv export
WHERE ST_Contains(alt.geometry, export.geom);