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
-- foresttype

CREATE TABLE foresttype_meta (code TEXT, de TEXT,
                              sort FLOAT);


INSERT INTO foresttype_meta (code, de,
                             sort)
SELECT trim(both
            from naistyp_c),
       trim(both
            from naistyp_wges),
       trim(both
            from naistyp_sort)::float
FROM nat_naistyp_mstr
GROUP BY naistyp_c,
         naistyp_wges,
         naistyp_sort
UNION
SELECT trim(both
            from naistyp),
       null,
       trim(both
            from naistyp_sort)::float
FROM nat_baum_collin
GROUP BY naistyp,
         naistyp_sort;

----------------------------------------------
-- altitudinal zones

CREATE TABLE altitudinal_zone_meta (projection TEXT, code TEXT, id SERIAL);


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('collin -mediterran',
        '0');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('hyperinsubrisch',
        '10');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('collin',
        '20');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('collin mit Buche',
        '30');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('submontan',
        '40');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('untermontan',
        '50');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('obermontan',
        '60');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('unter- & obermontan',
        '70');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('hochmontan',
        '80');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('subalpin',
        '90');


INSERT INTO altitudinal_zone_meta (projection,code)
VALUES ('obersubalpin',
        '100');

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


CREATE TABLE treetype_meta (target treetype,
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

