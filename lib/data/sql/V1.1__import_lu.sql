CREATE TABLE lu_standorttypen (STO_Nr TEXT, STO_DEU TEXT, STO_LAT TEXT, EIGNUNG TEXT, WB_VERJ_ENT TEXT, WB_PFL TEXT, BESCHREIBUNG TEXT, HOEHENVERBREITUNG TEXT, VEGETATION TEXT, VORWALDBAUMARTEN TEXT, GESGR_Nr TEXT, VERDRISK TEXT, PRIORITAET TEXT);
COPY lu_standorttypen
FROM '/data/profiles/lu/standorttypen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE lu_gesellschaftsgruppen (GESGR_Nr TEXT, GESGR_DEU TEXT, GESGRUPPE_LAT TEXT, BESCHREIBUNG TEXT, STANDORT TEXT, BODEN TEXT, EIGNUNG_BEDEUTUNG TEXT, HOEHENVERBREITUNG TEXT);
COPY lu_gesellschaftsgruppen
FROM '/data/profiles/lu/gesellschaftsgruppen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE lu_artengruppen (STO_Nr TEXT, A TEXT, B TEXT, C TEXT, E TEXT, F TEXT, G TEXT, H TEXT, I TEXT, J TEXT, K TEXT, L TEXT, M TEXT, N TEXT, O TEXT, P TEXT, BEMERKUNG TEXT, GESGR_Nr TEXT);
COPY lu_artengruppen
FROM '/data/profiles/lu/artengruppen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE lu_boden (STO_Nr TEXT, L TEXT, F TEXT, H TEXT, Ahh TEXT, Ah TEXT, BASEN TEXT, FEUCHTE TEXT, BESONDERHEITEN TEXT, BEMERKUNG TEXT, GESGR_Nr TEXT);
COPY lu_boden
FROM '/data/profiles/lu/boden.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE lu_expo_hanglage (STO_Nr TEXT, NNO_12 INT, NNO_25 INT, NNO_37 INT, NNO_50 INT, NNO_62 INT, NNO_75 INT, NNO_87 INT, NNO_100 INT, NOO_12 INT, NOO_25 INT, NOO_37 INT, NOO_50 INT, NOO_62 INT, NOO_75 INT, NOO_87 INT, NOO_100 INT, OSO_12 INT, OSO_25 INT, OSO_37 INT, OSO_50 INT, OSO_62 INT, OSO_75 INT, OSO_87 INT, OSO_100 INT, SSO_12 INT, SSO_25 INT, SSO_37 INT, SSO_50 INT, SSO_62 INT, SSO_75 INT, SSO_87 INT, SSO_100 INT, SSW_12 INT, SSW_25 INT, SSW_37 INT, SSW_50 INT, SSW_62 INT, SSW_75 INT, SSW_87 INT, SSW_100 INT, WSW_12 INT, WSW_25 INT, WSW_37 INT, WSW_50 INT, WSW_62 INT, WSW_75 INT, WSW_87 INT, WSW_100 INT, WNW_12 INT, WNW_25 INT, WNW_37 INT, WNW_50 INT, WNW_62 INT, WNW_75 INT, WNW_87 INT, WNW_100 INT, NNW_12 INT, NNW_25 INT, NNW_37 INT, NNW_50 INT, NNW_62 INT, NNW_75 INT, NNW_87 INT, NNW_100 INT); 
COPY lu_expo_hanglage
FROM '/data/profiles/lu/exposition_hanglage.csv'
DELIMITER ';' CSV HEADER;