CREATE TABLE so_standorttypen ("2085_NaiS" TEXT, "2085_SO" TEXT, "kantonaler_Steckbrief_vorhanden" TEXT, "2085_Höhenstufe" TEXT, "1975_NaiS" TEXT, "1975_SO" TEXT, STO_DEU TEXT);
COPY so_standorttypen
FROM '/data/profiles/so/standorttypen.csv'
DELIMITER ';' CSV HEADER;