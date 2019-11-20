CREATE TABLE projections_import (forest_ecoregions TEXT, altitudinal_zone TEXT, forest_type TEXT, slope TEXT, additional TEXT, target_forest_type TEXT, silver_fir_area TEXT, specific_forest_ecoregions TEXT, relief TEXT, target_altitudinal_zone TEXT);

COPY projections_import
FROM '/data/projections.csv'
DELIMITER ';' CSV HEADER;