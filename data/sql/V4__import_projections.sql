CREATE TABLE projections_import (regions TEXT, heightLevel TEXT, forestType TEXT,slope TEXT,condition TEXT,targets TEXT,tannenareal TEXT,standortsregion TEXT,reliktareal TEXT,nebenareal TEXT, relief TEXT,targetHeight TEXT);

COPY projections_import
FROM '/data/projections.csv'
DELIMITER ';' CSV HEADER;