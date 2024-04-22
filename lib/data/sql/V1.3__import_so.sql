CREATE TABLE so_standorttypen (STO_Nr TEXT, STO_DEU TEXT);
COPY so_standorttypen
FROM '/data/profiles/so/standorttypen.csv'
DELIMITER ';' CSV HEADER;