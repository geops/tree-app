create table so_standorttypen_export (
  codeNaisFuture TEXT,
  codeSoFuture TEXT,
  hasPdf boolean,
  altitudinalZoneFuture TEXT,
  codesNaisPresent text[],
  codesSoPresent text[],
  de TEXT
);

insert into
  so_standorttypen_export
select
  "2085_NaiS" as codeNaisFuture,
  "2085_SO" as codeSoFuture,
  (
    case
      when "kantonaler_Steckbrief_vorhanden" = 'ja' then true
      else false
    end
  ) as hasPdf,
  TRIM(
    ' '
    from
      "2085_Höhenstufe"
  ) as altitudinalZoneFuture,
  string_to_array(REPLACE("1975_NaiS", ' ', ''), ',')::text[] as codesNaisPresent,
  string_to_array(REPLACE("1975_SO", ' ', ''), ',')::text[] as codesSoPresent,
  STO_DEU as de
from
  so_standorttypen;

drop table if exists export.so_foresttype;

create table export.so_foresttype as
select
  de,
  codeSoFuture as code,
  codeNaisFuture,
  codeSoFuture,
  hasPdf,
  altitudinalZoneFuture,
  array_to_json(codesNaisPresent) as codesNaisPresent,
  array_to_json(codesSoPresent) as codesSoPresent
from
  so_standorttypen_export
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif(
      (
        regexp_match(so_standorttypen_export.codeSoFuture, '^\d+')
      ) [1],
      ''
    )::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  so_standorttypen_export.codeSoFuture;