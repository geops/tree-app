CREATE TABLE projections_import (forest_ecoregions TEXT, altitudinal_zone TEXT, forest_type TEXT, slope TEXT, silver_fir_area TEXT, forest_ecoregions_specific TEXT, relief TEXT, additional TEXT, target_altitudinal_zone TEXT, target_forest_type TEXT);

COPY projections_import
FROM '/data/projections.csv'
DELIMITER ';' CSV HEADER;