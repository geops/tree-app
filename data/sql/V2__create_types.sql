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

CREATE TYPE foresttype AS ENUM ('1','10a','10w','11','12*','12*h','12S','12a','12e','12w','13*','13a','13e','13eh','13h','14','14*','15','16','16*','17','18','18*','18M','18v','18w','19','19P','19a','19f','19m','1h','2','20','20E','21','21*','21L','22','22*','22A','22C','23','23*','23H','24','24*','25','25*','25A','25F','25O','25Q','25a','25as','25au','25b','25e','25f','26','26h','26w','27','27*','27O','27h','28','29','29A','29C','29h','3','3*','4*','30','31','32*','32C','32S','32V','33V','33a','33b','33m','34*','34a','34b','35','35A','35M','35Q','35S','36','37','38','38*','38S','39','39*','3L','4L','3LV','3s','4','40*','40P','40PBl','40PBlt','40Pt','41','41*','42B','42C','42Q','42V','42r','42t','43','43*','43S','44','45','46','46*','46*Re','46M','46MRe','46Re','46t','47','47*','47*Lä','47D','47DRe','47H','47M','47MRe','47Re','48','49','49*','49*Ta','50','50*','50*Re','50P','50Re','51','51C','51Re','52','52Re','52T','53','53*','53*Ta','53*s','53A','53ATa','53Lä','53Ta','54','54A','55','55*','55*Lä','55*Ta','56','57Bl','57BlTa','57C','57CLä','57CTa','57M','57S','57STa','57V','57VLä','57VM','57VTa','58','58Bl','58C','58L','58LLä','58Lä','59','59*','59A','59C','59E','59H','59J','59L','59LLä','59Lä','59R','59S','59V','59VLä','6','60','60*','60*Lä','60*Ta','60A','60ALä','60ATa','60E','60ETa','60Lä','60Ta','61','62','65','65*','66','66PM','67','67*','68','68*','69','7*','70','71','72','72Lä','7S','7a','7b','8*','8S','8a','8b','8d','91','92a','92z','93','9a','9w');


CREATE TABLE foresttype_meta (target foresttype,
                              de TEXT);


INSERT INTO foresttype_meta (target, de)
SELECT foo.foresttype,
       mstr.naistyp_wges
FROM
        (SELECT unnest(enum_range(null::foresttype)) AS foresttype) foo
LEFT JOIN
        (SELECT naistyp_wges,
                regexp_split_to_table(naistyp_c, '\/') AS naistyp_c
         FROM nat_naistyp_mstr) mstr ON trim(lower(mstr.naistyp_c)) = lower(foo.foresttype::text);

----------------------------------------------
-- heightlevel

CREATE TYPE heightlevel AS ENUM ('C', 'SM', 'UM', 'OM', 'HM', 'SA', 'OSA','OUM','C_B','HY','C_M');


CREATE TABLE heightlevel_meta (source TEXT, target heightlevel,
                                            de TEXT);


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('collin',
        'C'::heightlevel,
        'Collin');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('submontan',
        'SM'::heightlevel,
        'Submontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('untermontan',
        'UM'::heightlevel,
        'Untermontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('obermontan',
        'OM'::heightlevel,
        'Obermontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('hochmontan',
        'HM'::heightlevel,
        'Hochmontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('subalpin',
        'SA'::heightlevel,
        'Subalpin');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('obersubalpin',
        'OSA'::heightlevel,
        'Obersubalpin');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('collin mit Buche',
        'C_B'::heightlevel,
        'collin mit Buche');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('hyperinsubrisch',
        'HY'::heightlevel,
        'hyperinsubrisch');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('collin -mediterran',
        'C_M'::heightlevel,
        'collin-mediterran');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ('ober- und untermontan',
        'OUM'::heightlevel,
        'unter-/obermontan');

----------------------------------------------
-- recommendationtype

CREATE TYPE recommendationtype AS ENUM ('0', '1', '2', '3');

----------------------------------------------
-- region

CREATE TYPE region AS ENUM ('J', 'M', '1', '2a', '2b', '3', '4', '5');


CREATE TABLE region_meta (target region,
                          de TEXT);


INSERT INTO region_meta (target, de)
VALUES ('J'::region,
        'Jura');


INSERT INTO region_meta (target, de)
VALUES ('M'::region,
        'Mittelland');


INSERT INTO region_meta (target, de)
VALUES ('1'::region,
        'Nördliche Randalpen');


INSERT INTO region_meta (target, de)
VALUES ('2a'::region,
        'Nördliche Zwischenalpen mit Buchen');


INSERT INTO region_meta (target, de)
VALUES ('2b'::region,
        'Nördliche Zwischenalpen ohne Buchen');


INSERT INTO region_meta (target, de)
VALUES ('3'::region,
        'Kontinentale Hochalpen');


INSERT INTO region_meta (target, de)
VALUES ('4'::region,
        'Südliche Zwischenalpen');


INSERT INTO region_meta (target, de)
VALUES ('5'::region,
        'Südliche Randalpen');

----------------------------------------------
-- relief

CREATE TYPE relief AS ENUM ('h_and_m','normal','w_and_s','kup','unknown');


CREATE TABLE relief_meta (source TEXT, de TEXT,target relief);


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
-- tannenareal

CREATE TYPE tannenareal AS ENUM ('h_or_n','r','h_and_n','n','unknown');


CREATE TABLE tannen_meta (source TEXT, de TEXT,target tannenareal);


INSERT INTO tannen_meta (source,de,target)
VALUES ('Haupt- und Nebenareal',
        'Haupt- und Nebenareal',
        'h_and_n');


INSERT INTO tannen_meta (source,de,target)
VALUES ('Reliktareal',
        'Reliktareal',
        'r');


INSERT INTO tannen_meta (source,de,target)
VALUES ('Haupt- oder Nebenareal',
        'Haupt- oder Nebenareal',
        'h_or_n');


INSERT INTO tannen_meta (source,de,target)
VALUES ('Nebenareal',
        'Nebenareal',
        'n');


INSERT INTO tannen_meta (source,de,target)
VALUES ('',
        'nicht relevant',
        'unknown');

----------------------------------------------
-- treetype

CREATE TYPE treetype AS ENUM ('100','300','600','700','800','6900','9500','25200','25300','25400','60400','60500','96900','97200','97800','107150','113350','113399','137700','165000','172200','174200','174300','213300','217500','220400','224200','224300','227200','231500','238050','252900','275100','287100','302800','304900','305500','305800','305900','306000','306100','308600','317100','317300','317500','328400','329500','329700','330200','330600','335300','335600','335800','335900','336000','336100','336200','336250','345600','346500','362800','363700','363900','364000','364200','364300','365800','402200','402300','402500','402600','402700','402750','413600','421400','421500','422450','432800','432900','433000');


CREATE TABLE treetype_meta (target treetype,
                            de TEXT);


INSERT INTO treetype_meta (target, de)
SELECT foo.treetype,
       nais.art_nam_deu
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
LEFT JOIN nat_arten_baum nais ON nais.art_sisf_nr = foo.treetype::text;

