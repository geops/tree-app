-- 1.) Create enum type with all possible values.

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


CREATE TYPE foresttype AS ENUM ('41','35A','68*','50','59R','13*','13e','16','25a','26','8*','57VLä','AV','71','24*','60*','59V','40PBlt','13a','32V','8S','19m','29h','20E','26h','46*Re', '57C','50P','18','38S','25A','2','29C','1h','12*','46MRe','10a','59Lä','34*','49*','12*h','4','47*Lä','23H','43S','58Bl', '49*Ta','66','45','61','13h','21*','50*','19P','3s','11','31','25e','43','60ALä','27*','60','47D','62','49','18*','53*','69','60*Lä','54','57VM', '39*','8d','27h','52Re','15','59*','18M','52','60E','18w','58LLä','25*','19f','7a','59L','13eh','10w','29','57S','53*s','40PBl','9a','54A','21', '60A','67*','59C','52T','17','56','51C','47*lä','12S','57M','59H','42r','53Lä','59LLä','22','3','55*','19a','25F','40P','32S','47Re','47M','72','70','18v', '28','39','19','47*','20','23','25','46t','14','59A','7*','6','12a','23*','59VLä','57CLä','38','68','40Pt','47DRe','41*','12w','58','72Lä','16*','35M', '59J','51Re','60*Ta','66PM','30','65*','46*','46','46M','51','59E','53','47MRe','27','53A','58L','3*','4*','55*Ta','32C','67','22C','32*','60Lä','50Re','53Ta', '8b','47','55','33V','7S','58Lä','12e','65','44','58C','50*Re','26w','59','47H','7b','21L','25Q','22A','46Re','1','57BlTa','14*','57Bl','8a','24', '57V','59S','40*','29A','48','35');


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


CREATE TYPE heightlevel AS ENUM ('C', 'SM', 'UM', 'OM', 'HM', 'SA', 'OSA');


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


CREATE TABLE slope_meta (target TEXT, de TEXT);


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

-- 2.) Add new column to export table using enum type.

CREATE TABLE projections_export (id serial, region region,
                                            heightlevel heightlevel,
                                            foresttype foresttype,
                                            targets foresttype,
                                            additional additional,
                                            tannenareal tannenareal,
                                            relief relief,
                                            slope text);


CREATE TYPE treetype AS ENUM ('100','300','600','700','800','6900','9500','25200','25300','25400','60400','60500','96900','97200','97800','107150','113350','113399','137700','165000','172200','174200','174300','213300','217500','220400','224200','224300','227200','231500','238050','252900','275100','287100','302800','304900','305500','305800','305900','306000','306100','308600','317100','317300','317500','328400','329500','329700','330200','330600','335300','335600','335800','335900','336000','336100','336200','336250','345600','346500','362800','363700','363900','364000','364200','364300','365800','402200','402300','402500','402600','402700','402750','413600','421400','421500','422450','432800','432900','433000');


CREATE TABLE treetype_meta (target treetype,
                            de TEXT);


INSERT INTO treetype_meta (target, de)
SELECT foo.treetype,
       nais.art_nam_deu
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
LEFT JOIN nat_arten_baum nais ON nais.art_sisf_nr = foo.treetype::text;


CREATE TYPE recommendationtype AS ENUM ('0', '1', '2', '3');

