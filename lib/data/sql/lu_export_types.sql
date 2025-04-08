-- Luzern
drop table if exists lu_tillering;
create table lu_tillering as
with
  lu_tillering_data as (
    select
      sto_nr,
      kategorie,
      coalesce(
        string_to_array(replace(Fi, '*', ''), '-'),
        array[null, null]
      ) Fi,
      coalesce(
        string_to_array(replace(Ta, '*', ''), '-'),
        array[null, null]
      ) Ta,
      coalesce(
        string_to_array(replace(WFö, '*', ''), '-'),
        array[null, null]
      ) WFö,
      coalesce(
        string_to_array(replace(BFö, '*', ''), '-'),
        array[null, null]
      ) BFö,
      coalesce(
        string_to_array(replace(Ei, '*', ''), '-'),
        array[null, null]
      ) Ei,
      coalesce(
        string_to_array(replace(Lä, '*', ''), '-'),
        array[null, null]
      ) Lä,
      coalesce(
        string_to_array(replace(Dg, '*', ''), '-'),
        array[null, null]
      ) Dg,
      coalesce(
        string_to_array(replace(Bu, '*', ''), '-'),
        array[null, null]
      ) Bu,
      coalesce(
        string_to_array(replace(Es, '*', ''), '-'),
        array[null, null]
      ) Es,
      coalesce(
        string_to_array(replace(BAh, '*', ''), '-'),
        array[null, null]
      ) BAh,
      coalesce(
        string_to_array(replace(SAh, '*', ''), '-'),
        array[null, null]
      ) SAh,
      coalesce(
        string_to_array(replace(SEi, '*', ''), '-'),
        array[null, null]
      ) SEi,
      coalesce(
        string_to_array(replace(TEi, '*', ''), '-'),
        array[null, null]
      ) TEi,
      coalesce(
        string_to_array(replace(WLi, '*', ''), '-'),
        array[null, null]
      ) WLi,
      coalesce(
        string_to_array(replace(SLi, '*', ''), '-'),
        array[null, null]
      ) SLi,
      coalesce(
        string_to_array(replace(Ki, '*', ''), '-'),
        array[null, null]
      ) Ki,
      coalesce(
        string_to_array(replace(BUl, '*', ''), '-'),
        array[null, null]
      ) BUl,
      coalesce(
        string_to_array(replace(FUl, '*', ''), '-'),
        array[null, null]
      ) FUl,
      coalesce(
        string_to_array(replace(SEr, '*', ''), '-'),
        array[null, null]
      ) SEr,
      coalesce(
        string_to_array(replace(GEr, '*', ''), '-'),
        array[null, null]
      ) GEr,
      coalesce(
        string_to_array(replace(AEr, '*', ''), '-'),
        array[null, null]
      ) AEr,
      coalesce(
        string_to_array(replace(HBi, '*', ''), '-'),
        array[null, null]
      ) HBi,
      coalesce(
        string_to_array(replace(TKi, '*', ''), '-'),
        array[null, null]
      ) TKi,
      coalesce(
        string_to_array(replace(VBe, '*', ''), '-'),
        array[null, null]
      ) VBe,
      coalesce(
        string_to_array(replace(MBe, '*', ''), '-'),
        array[null, null]
      ) MBe,
      coalesce(
        string_to_array(replace(Wei, '*', ''), '-'),
        array[null, null]
      ) Wei,
      Lbh_min::int,
      Lbh_opt::int,
      Ta_min,
      Ta_opt
    from
      lu_bestockung
  ),
  lu_tillering_natural_forest_data as (
    select
      sto_nr,
      array_to_json(
        array[
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Fi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ta) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(WFö) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BFö) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ei) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Lä) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Dg) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Bu) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Es) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BAh) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SAh) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SEi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(TEi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(WLi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SLi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ki) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BUl) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(FUl) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(GEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(AEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(HBi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(TKi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(VBe) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(MBe) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Wei) as elem
            )
          )
        ]
      ) as forest_types,
      Lbh_min,
      Lbh_opt,
      Ta_min,
      Ta_opt
    from
      lu_tillering_data
    where
      kategorie = 'NW'
  ),
  lu_tillering_farm_forest_data as (
    select
      sto_nr,
      array_to_json(
        array[
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Fi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ta) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(WFö) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BFö) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ei) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Lä) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Dg) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Bu) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Es) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BAh) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SAh) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SEi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(TEi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(WLi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SLi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Ki) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(BUl) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(FUl) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(SEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(GEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(AEr) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(HBi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(TKi) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(VBe) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(MBe) as elem
            )
          ),
          array_to_json(
            array(
              select
                cast(elem as integer)
              from
                unnest(Wei) as elem
            )
          )
        ]
      ) as forest_types
    from
      lu_tillering_data
    where
      kategorie = 'WW'
  )
select
  nfd.sto_nr as code,
  nfd.forest_types as naturalForestTypes,
  ffd.forest_types as farmForestTypes,
  array_to_json(array[Lbh_min, Lbh_opt]) as hardwood,
  array_to_json(array[Ta_min, Ta_opt]) as firwood
from
  lu_tillering_natural_forest_data as nfd
  left join lu_tillering_farm_forest_data as ffd on nfd.sto_nr = ffd.sto_nr;

drop table if exists lu_soil;
create table lu_soil as
select
  sto_nr as code,
  array_to_json(
    array(
      select
        cast(elem as integer)
      from
        unnest(array[l, f, h, ahh, ah, basen, feuchte]) as elem
    )
  ) as data,
  besonderheiten as characteristics,
  bemerkung as note
from
  lu_boden;

drop table if exists lu_vegetationindicator;
create table lu_vegetationindicator as
select
  sto_nr as code,
  array_to_json(
    array(
      select
        cast(elem as integer)
      from
        unnest(
          array[a, b, c, e, f, g, h, i, j, k, l, m, n, o, p]
        ) as elem
    )
  ) as data,
  bemerkung as note
from
  lu_artengruppen;

drop table if exists lu_pioneer;
create table lu_pioneer as
with
  lu_pioneer_data as (
    select
      sto_nr,
      coalesce(
        string_to_array(replace(vorwaldbaumarten, ' ', ''), ','),
        array['-']
      ) pioneer
    from
      lu_standorttypen
  )
select
  sto_nr as code,
  array_to_json(pioneer) as data
from
  lu_pioneer_data;


drop table if exists export.lu_foresttype;
create table export.lu_foresttype as
select
  sto_nr as code,
  sto_deu as de,
  sto_lat as la,
  eignung as aptitude,
  wb_verj_ent as forestryRejuvDev,
  wb_pfl as forestryCare,
  beschreibung as description,
  hoehenverbreitung as heightDispersion,
  vegetation,
  vegetation_indicator.data as vegetationIndicator,
  pioneer_tree_types.data as pioneerTreeTypes,
  regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g') as associationGroupCode,
  lu_soil.data as soil,
  jsonb_build_array(
    lu_tillering.naturalForestTypes,
    lu_tillering.farmForestTypes
  ) as tillering,
  lu_tillering.hardwood as tilleringHardwood,
  lu_tillering.firwood as tilleringFirwood,
  jsonb_build_array(
    NNO_12,
    NNO_25,
    NNO_37,
    NNO_50,
    NNO_62,
    NNO_75,
    NNO_87,
    NNO_100,
    NOO_12,
    NOO_25,
    NOO_37,
    NOO_50,
    NOO_62,
    NOO_75,
    NOO_87,
    NOO_100,
    OSO_12,
    OSO_25,
    OSO_37,
    OSO_50,
    OSO_62,
    OSO_75,
    OSO_87,
    OSO_100,
    SSO_12,
    SSO_25,
    SSO_37,
    SSO_50,
    SSO_62,
    SSO_75,
    SSO_87,
    SSO_100,
    SSW_12,
    SSW_25,
    SSW_37,
    SSW_50,
    SSW_62,
    SSW_75,
    SSW_87,
    SSW_100,
    WSW_12,
    WSW_25,
    WSW_37,
    WSW_50,
    WSW_62,
    WSW_75,
    WSW_87,
    WSW_100,
    WNW_12,
    WNW_25,
    WNW_37,
    WNW_50,
    WNW_62,
    WNW_75,
    WNW_87,
    WNW_100,
    NNW_12,
    NNW_25,
    NNW_37,
    NNW_50,
    NNW_62,
    NNW_75,
    NNW_87,
    NNW_100
  ) as expoAndAspect,
  verdrisk::int as compactRisk,
  prioritaet as priority
from
  lu_standorttypen
  left join lu_expo_hanglage using (STO_Nr)
  left join lu_tillering on lu_standorttypen.sto_nr = lu_tillering.code
  left join lu_soil on lu_standorttypen.sto_nr = lu_soil.code
  left join lu_vegetationindicator vegetation_indicator on lu_standorttypen.sto_nr = vegetation_indicator.code
  left join lu_pioneer pioneer_tree_types on lu_standorttypen.sto_nr = pioneer_tree_types.code
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif(
      (regexp_match(lu_standorttypen.sto_nr, '^\d+')) [1],
      ''
    )::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  lu_standorttypen.sto_nr;


drop table if exists export.lu_associationgroup;
create table export.lu_associationgroup as
select
  regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g') as code,
  gesgr_deu as de,
  gesgruppe_lat as la,
  beschreibung as description,
  standort as location,
  boden as soil,
  eignung_bedeutung as aptitudeMeaning,
  hoehenverbreitung as heightDispersion
from
  lu_gesellschaftsgruppen
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif(
      (
        regexp_match(
          regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g'),
          '^\d+'
        )
      ) [1],
      ''
    )::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g');


drop table if exists export.lu_speciesgroup;
create table export.lu_speciesgroup as
select
  sto_nr as code,
  a,
  b,
  c,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  bemerkung as note,
  regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g') as associationGroupCode
from
  lu_artengruppen
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif((regexp_match(sto_nr, '^\d+')) [1], '')::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  sto_nr;