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
VALUES ( 'collin',
         'C'::heightlevel,
         'Collin');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'submontan',
         'SM'::heightlevel,
         'Submontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'untermontan',
         'UM'::heightlevel,
         'Untermontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'obermontan',
         'OM'::heightlevel,
         'Obermontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'hochmontan',
         'HM'::heightlevel,
         'Hochmontan');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'subalpin',
         'SA'::heightlevel,
         'Subalpin');


INSERT INTO heightlevel_meta (source, target, de)
VALUES ( 'obersubalpin',
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

-- 2.) Add new column to export table using enum type.

CREATE TABLE projections_export (id serial, region region,
                                            heightlevel heightlevel,
                                            foresttype foresttype,
                                            targets foresttype,
                                            slope text);