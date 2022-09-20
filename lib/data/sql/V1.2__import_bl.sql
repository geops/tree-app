CREATE TABLE bl_standorttypen (STO_Nr TEXT, STO_DEU TEXT, STO_LAT TEXT, EIGENSCHAFTEN TEXT, BESTOCKUNGSZIELE TEXT, WB_VERJ_ENT TEXT, WB_PFL TEXT, BESCHRIEB_NATURWALD TEXT, HOEHENVERBREITUNG TEXT, STANDORT TEXT, GEOLOGIE TEXT, VEGETATION TEXT, UEBERGAENGE_ZU TEXT);
COPY bl_standorttypen
FROM '/data/profiles/bl/standorttypen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE bl_gesellschaftsgruppen (GESGR_CAT TEXT, GESGR_DEU TEXT, WALDBILD TEXT, STANDORT TEXT, NUTZUNG_PFLEGE TEXT, VEGETATIONSSTUFE TEXT, FLAECHENANTEIL_BL TEXT, FLAECHENANTEIL_BS TEXT, FLAECHE_BLBS_PROZENT TEXT, STANDORTE TEXT);
COPY bl_gesellschaftsgruppen
FROM '/data/profiles/bl/gesellschaftsgruppen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE bl_expo_hanglage (STO_Nr TEXT, NNO_12 INT, NNO_25 INT, NNO_37 INT, NNO_50 INT, NNO_62 INT, NNO_75 INT, NNO_87 INT, NNO_100 INT, NOO_12 INT, NOO_25 INT, NOO_37 INT, NOO_50 INT, NOO_62 INT, NOO_75 INT, NOO_87 INT, NOO_100 INT, OSO_12 INT, OSO_25 INT, OSO_37 INT, OSO_50 INT, OSO_62 INT, OSO_75 INT, OSO_87 INT, OSO_100 INT, SSO_12 INT, SSO_25 INT, SSO_37 INT, SSO_50 INT, SSO_62 INT, SSO_75 INT, SSO_87 INT, SSO_100 INT, SSW_12 INT, SSW_25 INT, SSW_37 INT, SSW_50 INT, SSW_62 INT, SSW_75 INT, SSW_87 INT, SSW_100 INT, WSW_12 INT, WSW_25 INT, WSW_37 INT, WSW_50 INT, WSW_62 INT, WSW_75 INT, WSW_87 INT, WSW_100 INT, WNW_12 INT, WNW_25 INT, WNW_37 INT, WNW_50 INT, WNW_62 INT, WNW_75 INT, WNW_87 INT, WNW_100 INT, NNW_12 INT, NNW_25 INT, NNW_37 INT, NNW_50 INT, NNW_62 INT, NNW_75 INT, NNW_87 INT, NNW_100 INT); 
COPY bl_expo_hanglage
FROM '/data/profiles/bl/exposition_hanglage.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE bl_artengruppen (STO_Nr TEXT, A TEXT, B1 TEXT, B2 TEXT, C1 TEXT, C2 TEXT, D1 TEXT, D2 TEXT, D3 TEXT, E1 TEXT, E2 TEXT, F TEXT, G TEXT, H TEXT, I  TEXT, J TEXT, K TEXT, L TEXT, M TEXT, N1 TEXT, N2 TEXT, N3 TEXT, O1 TEXT, O2 TEXT, O3 TEXT, O4 TEXT, O5 TEXT, O6 TEXT, O7 TEXT, O8 TEXT, P1 TEXT, P2 TEXT, P3 TEXT, P4 TEXT, Q1 TEXT, Q2 TEXT, Q3 TEXT, R TEXT, S TEXT, T TEXT, U1 TEXT, U2 TEXT, U3 TEXT, V1 TEXT, V2 TEXT, W TEXT, X1 TEXT, X2 TEXT, Y1 TEXT, Y2 TEXT, Z1 TEXT, Z2 TEXT, Z3 TEXT);
COPY bl_artengruppen
FROM '/data/profiles/bl/artengruppen.csv'
DELIMITER ';' CSV HEADER;

CREATE TABLE bl_baumartenwahl (STO_Nr TEXT, Laubholzanteil_prozent TEXT, Bu TEXT, TEi TEXT, SEi TEXT, BAh TEXT, SAh TEXT, BUl TEXT, Es TEXT, SEr TEXT, TKi TEXT, FAh TEXT, HBu TEXT, Ki TEXT, WLi TEXT, SLi TEXT, EBe TEXT, MBe TEXT, VBe TEXT, Nu TEXT, FUl TEXT, FEi TEXT, FlUl TEXT, SbAh TEXT, HBi TEXT, Ro TEXT, REi TEXT, As_ TEXT, Ta TEXT, Fi TEXT, Fö TEXT, Lä TEXT, Eib TEXT, BFö TEXT, SFö TEXT, Dou TEXT);
ALTER TABLE bl_baumartenwahl RENAME COLUMN As_ TO "as"; -- We rename the column because "AS" is a reserved postgresql word and can't be used in CREATE TABLE
COPY bl_baumartenwahl
FROM '/data/profiles/bl/baumartenwahl.csv'
DELIMITER ';' CSV HEADER;