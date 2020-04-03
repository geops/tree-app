----------------------------------------------
-- additional

CREATE TYPE additional AS ENUM ('NrmlSl','ExtB','Nrml','withAv','CmpS','Shdy_Cl_Bb','Shdy_Cl','Wrm_Rdt','=10F','Cl','<1F','NoAvln','WthAvln', 'D_Eb_Cl','>5F','<5F','DpSl_Shdy','Dp','Rvn','Rbl','Shlw','<10F','>10F','unknown');


CREATE TABLE additional_meta (source TEXT, de TEXT,en TEXT,target additional);


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Boden normal',
        'Boden normal',
        'Normal Soil',
        'NrmlSl');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Extrem blockig',
        'Extrem blockig',
        'Extremely blocky',
        'ExtB');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Normal',
        'Normal',
        'Normal',
        'Nrml');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('bei Lawinenzug',
        'bei Lawinenzug',
        'for avalanches',
        'withAv');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Boden verdichtet',
        'Boden verdichtet',
        'Compacted Soil',
        'CmpS');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('schattig, kühl, grosse Blöcke',
        'schattig, kühl, grosse Blöcke',
        'Shady, Cool, Big blocks',
        'Shdy_Cl_Bb');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Schattig, Kühl',
        'Schattig, Kühl',
        'Shady, Cool',
        'Shdy_Cl');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Warm und Strahlungsreich',
        'Warm und Strahlungsreich',
        'Warm and radiant',
        'Wrm_Rdt');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('falls mind alle 10 Jahre überschwemmt',
        'falls mind alle 10 Jahre überschwemmt',
        'Flooded every 10 years',
        '=10F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Kühl',
        'Kühl',
        'Cool',
        'Cl');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('falls alljährlich überschwemmt',
        'falls alljährlich überschwemmt',
        'Flooded every year',
        '<1F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Keine Lawinenbeeinflussung',
        'Keine Lawinenbeeinflussung',
        'No avalanche influence',
        'NoAvln');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('mit Lawinenbeeinflussung',
        'mit Lawinenbeeinflussung',
        'With avalanche control',
        'WthAvln');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('trocken, extrem blockig, kühl',
        'trocken, extrem blockig, kühl',
        'Dry, Extremely blocky, Cool',
        'D_Eb_Cl');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('alle 6 Jahre oder seltener überschwemmt',
        'alle 6 Jahre oder seltener überschwemmt',
        'Flooded every six years or less',
        '>5F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('bis alle 5 Jahre überschwemmt',
        'bis alle 5 Jahre überschwemmt',
        'Flooded every five years',
        '<5F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('tiefgründiger Boden, schattig',
        'tiefgründiger Boden, schattig',
        'Deep soil, Shady',
        'DpSl_Shdy');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('tiefgründig',
        'tiefgründig',
        'Deep',
        'Dp');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('Schlucht',
        'Schlucht',
        'Ravine',
        'Rvn');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('mit viel Schutt',
        'mit viel Schutt',
        'With lots of rubble',
        'Rbl');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('flachgründig',
        'flachgründig',
        'Shallow',
        'Shlw');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('weniger als alle 10 Jahre überschwemmt',
        'weniger als alle 10 Jahre überschwemmt',
        'Flooded less than every 10 years',
        '<10F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('mind. alle 10 Jahre überschwemmt',
        'mind. alle 10 Jahre überschwemmt',
        'Flooded at least every 10 years',
        '>10F');


INSERT INTO additional_meta (source,de,en,target)
VALUES ('',
        'nicht relevant',
        'not relevant',
        'unknown');

----------------------------------------------
-- altitudinal zones

CREATE TABLE altitudinal_zone_meta (projection TEXT, nais TEXT, code TEXT, id SERIAL);


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('collin -mediterran',
        '01C',
        '0');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('hyperinsubrisch',
        'HY',
        '10');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('collin',
        'C',
        '20');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('collin mit Buche',
        'CB',
        '30');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('submontan',
        'SM',
        '40');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('untermontan',
        'UM',
        '50');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('obermontan',
        'OM',
        '60');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('ober- und untermontan',
        'UMOM',
        '70');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('hochmontan',
        'HM',
        '81');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('hochmontan Nebenareal der Tanne',
        null,
        '82');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('hochmontan Reliktareal der Tanne',
        null,
        '83');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('subalpin',
        'SA',
        '90');


INSERT INTO altitudinal_zone_meta (projection, nais, code)
VALUES ('obersubalpin',
        'OSA',
        '100');

----------------------------------------------
-- foresttype

CREATE TABLE foresttype_meta (code TEXT PRIMARY KEY,
                                                de TEXT, tree_layer_height_min INT, tree_layer_height_max INT, conifer_tree_height_max INT, deciduous_tree_height_max INT,
                              sort FLOAT, carbonate_fine BOOLEAN, carbonate_rock BOOLEAN, geomorphology_rock_band BOOLEAN, geomorphology_blocky_rocky_strong BOOLEAN, geomorphology_blocky_rocky_little BOOLEAN, geomorphology_limestone_pavement BOOLEAN, geomorphology_rocks_moderately_moved BOOLEAN, geomorphology_rocks_strongly_moved BOOLEAN, geomorphology_rocks_stabilised BOOLEAN, relief_type_central_slope BOOLEAN, relief_type_hollow BOOLEAN, relief_type_dome BOOLEAN, relief_type_plateau BOOLEAN, relief_type_steep BOOLEAN);


INSERT INTO foresttype_meta (code, de, tree_layer_height_min, tree_layer_height_max, conifer_tree_height_max, deciduous_tree_height_max,
                             sort, carbonate_fine, carbonate_rock, geomorphology_rock_band, geomorphology_blocky_rocky_strong, geomorphology_blocky_rocky_little, geomorphology_limestone_pavement, geomorphology_rocks_moderately_moved, geomorphology_rocks_strongly_moved, geomorphology_rocks_stabilised, relief_type_central_slope, relief_type_hollow, relief_type_dome, relief_type_plateau, relief_type_steep)
SELECT trim(BOTH
            FROM naistyp_c) AS code,
       trim(BOTH
            FROM naistyp_wges) AS de,
       typ.naistyp_hdom_min::int AS tree_layer_height_min,
       typ.naistyp_hdom_max::int AS tree_layer_height_max,
       typ.naistyp_hmax_nad::int AS conifer_tree_height_max,
       typ.naistyp_hmax_lau::int AS deciduous_tree_height_max,
       trim(BOTH
            FROM mstr.naistyp_sort)::float AS
sort,
       CASE typ.ntyp_kg_fein IN ('1',
                                 '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS carbonate_fine,
       CASE typ.ntyp_kg_gestein IN ('1',
                                    '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS carbonate_rock,
       CASE typ.ntyp_fels IN ('1',
                              '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_rock_band,
       CASE typ.ntyp_bl_fels_st IN ('1',
                                    '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_blocky_rocky_strong,
       CASE typ.ntyp_bl_fels_we IN ('1',
                                    '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_blocky_rocky_little,
       CASE typ.ntyp_bl_karren IN ('1',
                                   '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_limestone_pavement,
       CASE typ.ntyp_bl_schutt_m IN ('1',
                                     '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_rocks_moderately_moved,
       CASE typ.ntyp_bl_schutt_s IN ('1',
                                     '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_rocks_strongly_moved,
       CASE typ.ntyp_bl_schutt_x IN ('1',
                                     '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS geomorphology_rocks_stabilised,
       CASE typ.ntyp_rt_mittelh IN ('1',
                                    '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS relief_type_central_slope,
       CASE typ.ntyp_rt_mulde IN ('1',
                                  '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS relief_type_hollow,
       CASE typ.ntyp_rt_kuppe IN ('1',
                                  '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS relief_type_dome,
       CASE typ.ntyp_rt_plateau IN ('1',
                                    '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS relief_type_plateau,
       CASE typ.ntyp_rt_steilh IN ('1',
                                   '2')
           WHEN TRUE THEN TRUE
           ELSE FALSE
       END AS relief_type_steep
FROM nat_naistyp_mstr mstr
LEFT JOIN nat_naistyp typ USING (naistyp_c)
UNION
SELECT trim(BOTH
            FROM naistyp) AS code,
       NULL AS de,
       NULL AS tree_layer_height_min,
       NULL AS tree_layer_height_max,
       NULL AS conifer_tree_height_max,
       NULL AS deciduous_tree_height_max,
       trim(BOTH
            FROM naistyp_sort)::float AS
sort,
       NULL AS carbonate_fine,
       NULL AS carbonate_rock,
       NULL AS geomorphology_rock_band,
       NULL AS geomorphology_blocky_rocky_strong,
       NULL AS geomorphology_blocky_rocky_little,
       NULL AS geomorphology_limestone_pavement,
       NULL AS geomorphology_rocks_moderately_moved,
       NULL AS geomorphology_rocks_strongly_moved,
       NULL AS geomorphology_rocks_stabilised,
       NULL AS relief_type_central_slope,
       NULL AS relief_type_hollow,
       NULL AS relief_type_dome,
       NULL AS relief_type_plateau,
       NULL AS relief_type_steep
FROM nat_baum_collin
GROUP BY naistyp,
         naistyp_sort;


CREATE TABLE foresttype_altitudinal_zone_forest_ecoregion (foresttype_code TEXT REFERENCES foresttype_meta,
                                                                                           altitudinal_zone_code TEXT, forest_ecoregion_code TEXT);


INSERT INTO foresttype_altitudinal_zone_forest_ecoregion (foresttype_code, altitudinal_zone_code, forest_ecoregion_code)
SELECT DISTINCT trim(both
                     from nat_naistyp.naistyp_c) AS forest_type_code,
                azm.code AS altitudinal_zone,
                split_part(split_part(feld_name, '_', 3), '-', 2) AS forest_ecoregion
FROM nat_lage
LEFT JOIN altitudinal_zone_meta azm ON azm.nais = split_part(split_part(feld_name, '_', 3), '-', 1)
LEFT JOIN nat_naistyp on trim(both '0.'
                              from nat_lage.naistyp_sort) = nat_naistyp.naistyp_sort
WHERE feld_name ILIKE 'HS_%'
        AND nat_naistyp.naistyp_c is not null
        AND feld_wert in ('1',
                          '2')
        AND split_part(split_part(feld_name, '_', 3), '-', 2) != '';


CREATE TYPE foresttype_group_type AS ENUM ('main', 'special', 'volatile', 'riverside', 'pioneer');


CREATE TABLE foresttype_group ("group" foresttype_group_type,
                               code TEXT);


INSERT INTO foresttype_group("group", code)
SELECT 'main'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_hawa IN ('1',
                           '2')
UNION
SELECT 'special'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_sowa IN ('1',
                           '2')
UNION
SELECT 'volatile'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_wefe IN ('1',
                           '2')
UNION
SELECT 'riverside'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_aue IN ('1',
                          '2')
UNION
SELECT 'pioneer'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_pio IN ('1',
                          '2');

----------------------------------------------
-- indicator

CREATE TABLE indicator_meta (code INTEGER PRIMARY KEY,
                                                  de TEXT);


CREATE TABLE indicator_foresttype (indicator_code INTEGER REFERENCES indicator_meta,
                                                                     foresttype_code TEXT REFERENCES foresttype_meta);


CREATE TABLE indicator_altitudinal_zone (indicator_code INTEGER REFERENCES indicator_meta,
                                                                           altitudinal_zone_code TEXT);


CREATE TABLE indicator_forest_ecoregion (indicator_code INTEGER REFERENCES indicator_meta,
                                                                           forest_ecoregion_code TEXT);


INSERT INTO indicator_meta (code, de)
SELECT sisf_nr::int AS code,
       COALESCE(art_nam_deu, art_nam_lat) AS de
FROM nat_arten_mstr
WHERE art_erk_zeik = '1';


INSERT INTO indicator_foresttype (indicator_code, foresttype_code)
SELECT mstr.sisf_nr::int AS indicator_code,
       trim(BOTH
            FROM art.naistyp_c) AS foresttype_code
FROM nat_arten_mstr mstr
JOIN nat_naistyp_art art ON art.sisf_nr = mstr.sisf_nr
WHERE mstr.art_erk_zeik = '1'
        AND art.vorh IN ('1',
                         '2',
                         '3')
        AND trim(BOTH
                 FROM naistyp_c) IN
                (SELECT code
                 FROM foresttype_meta);


INSERT INTO indicator_forest_ecoregion (indicator_code, forest_ecoregion_code)
SELECT sisf_nr::int AS code,
       '1' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_1 = '1'
UNION
SELECT sisf_nr::int AS code,
       '2a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_2a = '1'
UNION
SELECT sisf_nr::int AS code,
       '2b' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_2b = '1'
UNION
SELECT sisf_nr::int AS code,
       '3' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_3 = '1'
UNION
SELECT sisf_nr::int AS code,
       '4' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_4 = '1'
UNION
SELECT sisf_nr::int AS code,
       '5a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5a = '1'
UNION
SELECT sisf_nr::int AS code,
       '5a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5aa = '1'
UNION
SELECT sisf_nr::int AS code,
       '5b' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5b = '1'
UNION
SELECT sisf_nr::int AS code,
       'J' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_j = '1'
UNION
SELECT sisf_nr::int AS code,
       'M' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_m = '1';


INSERT INTO indicator_altitudinal_zone (indicator_code, altitudinal_zone_code)
SELECT sisf_nr::int AS code,
       '20' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_collin = '1'
UNION -- TODO: switch to 80 once hochmontan branch has been merged!

SELECT sisf_nr::int AS code,
       '81' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_hochmont = '1'
UNION
SELECT sisf_nr::int AS code,
       '60' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_obermont = '1'
UNION
SELECT sisf_nr::int AS code,
       '100' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_obsubalp = '1'
UNION
SELECT sisf_nr::int AS code,
       '90' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_subalpin = '1'
UNION
SELECT sisf_nr::int AS code,
       '40' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_submontan = '1'
UNION
SELECT sisf_nr::int AS code,
       '50' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_untermont = '1';

----------------------------------------------
-- recommendationtype

CREATE TYPE recommendationtype AS ENUM ('0', '1', '2', '3');

----------------------------------------------
-- relief

CREATE TYPE relief AS ENUM ('h_and_m','normal','w_and_s','kup','unknown');


CREATE TABLE relief_meta (source TEXT, de TEXT,target relief);


INSERT INTO relief_meta (source,de,target)
VALUES ('Hang- oder Muldenlage',
        'Hang- und Muldenlage',
        'h_and_m');


INSERT INTO relief_meta (source,de,target)
VALUES ('Hang- und Muldenlage',
        'Hang- und Muldenlage',
        'h_and_m');


INSERT INTO relief_meta (source,de,target)
VALUES ('normal',
        'normal',
        'normal');


INSERT INTO relief_meta (source,de,target)
VALUES ('Kuppenlage',
        'Kuppenlage',
        'kup');


INSERT INTO relief_meta (source,de,target)
VALUES ('',
        'nicht relevant',
        'unknown');

----------------------------------------------
-- slope

CREATE TABLE slope_meta (target TEXT, de TEXT);


INSERT INTO slope_meta (target, de)
VALUES ('<20',
        '<20%');


INSERT INTO slope_meta (target, de)
VALUES ('>20',
        '>20%');


INSERT INTO slope_meta (target, de)
VALUES ('<60',
        '<60%');


INSERT INTO slope_meta (target, de)
VALUES ('<70',
        '<70%');


INSERT INTO slope_meta (target, de)
VALUES ('>60',
        '>60%');


INSERT INTO slope_meta (target, de)
VALUES ('>70',
        '>70%');


INSERT INTO slope_meta (target, de)
VALUES ('unknown',
        'nicht relevant');

----------------------------------------------
-- silver fir areaS

CREATE TABLE silver_fir_area_meta (projection TEXT, code_ta TEXT);


INSERT INTO silver_fir_area_meta (projection, code_ta)
VALUES ('Hauptareal',
        '1');


INSERT INTO silver_fir_area_meta (projection, code_ta)
VALUES ('Nebenareal',
        '2');


INSERT INTO silver_fir_area_meta (projection, code_ta)
VALUES ('Reliktareal',
        '3');


INSERT INTO silver_fir_area_meta (projection, code_ta)
VALUES ('nicht relevant',
        'unknown');

----------------------------------------------
-- treetype

CREATE TYPE treetype AS ENUM ('100','300','600','700','800','6900','9500','25200','25300','25400','60400','60500','96900','97200','97750','97800','113350','137700','165000','172200','174200','174300','213300','217500','217510','220400','224200','227200','231500','238050','252900','287100','293550','302800','304900','305500','305800','305900','306000','306100','308600','317100','317300','317500','328400','329700','330200','330600','335300','335600','335800','335900','336000','336100','336200','345600','346500','362800','363700','363900','364000','364200','364300','365800','402200','402300','402500','402600','402700','402750','413600','421400','421500','422450','432800','432900','433000');


CREATE TABLE treetype_meta (target treetype PRIMARY KEY,
                                                    de TEXT, endangered BOOLEAN, nonresident BOOLEAN);


INSERT INTO treetype_meta (target, de, endangered, nonresident)
SELECT foo.treetype,
       nais.art_nam_deu,
       info.krankheitsgefaehrdet::boolean,
       info.gebietsfremd::boolean
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
LEFT JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
LEFT JOIN baumarteninformationen info ON info.code::int = foo.treetype::text::int;


CREATE TABLE treetype_foresttype (treetype_code treetype REFERENCES treetype_meta,
                                                                    foresttype_code TEXT REFERENCES foresttype_meta);


INSERT INTO treetype_foresttype (treetype_code, foresttype_code)
SELECT foo.treetype AS treetype_code,
       trim(BOTH
            FROM art.naistyp_c) AS foresttype_code
FROM
        (SELECT unnest(enum_range(NULL::treetype)) AS treetype) foo
JOIN nat_naistyp_art art ON art.sisf_nr::int::text = foo.treetype::text
WHERE art.vorh IN ('1',
                   '2',
                   '3')
        AND trim(BOTH
                 FROM naistyp_c) IN
                (SELECT code
                 FROM foresttype_meta);


CREATE TABLE treetype_altitudinal_zone (treetype_code treetype REFERENCES treetype_meta,
                                                                          altitudinal_zone_code TEXT);


CREATE TABLE treetype_forest_ecoregion (treetype_code treetype REFERENCES treetype_meta,
                                                                          forest_ecoregion_code TEXT);


INSERT INTO treetype_forest_ecoregion (treetype_code, forest_ecoregion_code)
SELECT foo.treetype AS treetype_code,
       '1' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_1 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '2a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_2a = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '2b' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_2b = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '3' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_3 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '4' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_4 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5a = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5aa = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5b' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5b = '1'
UNION
SELECT foo.treetype AS treetype_code,
       'J' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_j = '1'
UNION
SELECT foo.treetype AS treetype_code,
       'M' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_m = '1';


INSERT INTO treetype_altitudinal_zone (treetype_code, altitudinal_zone_code)
SELECT foo.treetype AS treetype_code,
       '20' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_collin = '1'
UNION -- TODO: switch to 80 once hochmontan branch has been merged!

SELECT foo.treetype AS treetype_code,
       '81' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_hochmont = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '60' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_obermont = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '100' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_obsubalp = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '90' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_subalpin = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '40' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_submontan = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '50' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_untermont = '1';

