CREATE TABLE lu_standorttypen (LUTYP_NAME_DEU TEXT, LUTYP_NAME_LAT TEXT);

COPY lu_standorttypen
FROM '/data/profiles/lu/lu_standorttypen.csv'
DELIMITER ';' CSV HEADER;