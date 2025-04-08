drop table if exists bl_vegetationindicator;

create table bl_vegetationindicator as
select
  sto_nr as code,
  array_to_json(
    array(
      select
        cast(elem as integer)
      from
        unnest(
          array[
            A,
            B1,
            B2,
            C1,
            C2,
            D1,
            D2,
            D3,
            E1,
            E2,
            F,
            G,
            H,
            I,
            J,
            K,
            L,
            M,
            N1,
            N2,
            N3,
            O1,
            O2,
            O3,
            O4,
            O5,
            O6,
            O7,
            O8,
            P1,
            P2,
            P3,
            P4,
            Q1,
            Q2,
            Q3,
            R,
            S,
            T,
            U1,
            U2,
            U3,
            V1,
            V2,
            W,
            X1,
            X2,
            Y1,
            Y2,
            Z1,
            Z2,
            Z3
          ]
        ) as elem
    )
  ) as data
from
  bl_artengruppen;


drop table if exists bl_treetype;

create table bl_treetype as
select
  sto_nr as code,
  Laubholzanteil_prozent as hardwood,
  array_to_json(
    array(
      select
        cast(elem as text)
      from
        unnest(
          array[
            Bu,
            TEi,
            SEi,
            BAh,
            SAh,
            BUl,
            Es,
            SEr,
            TKi,
            FAh,
            HBu,
            Ki,
            WLi,
            SLi,
            EBe,
            MBe,
            VBe,
            Nu,
            FUl,
            FEi,
            FlUl,
            SbAh,
            HBi,
            Ro,
            REi,
            "as",
            Ta,
            Fi,
            Fö,
            Lä,
            Eib,
            BFö,
            SFö,
            Dou
          ]
        ) as elem
    )
  ) as data
from
  bl_baumartenwahl;


drop table if exists export.bl_foresttype;

create table export.bl_foresttype as
select
  sto_nr as code,
  sto_deu as de,
  sto_lat as la,
  eigenschaften as properties,
  bestockungsziele as tillering,
  wb_verj_ent as forestryRejuvDev,
  wb_pfl as forestryCare,
  beschrieb_naturwald as descriptionNaturalForest,
  hoehenverbreitung as heightDispersion,
  bl_standorttypen.standort as location,
  geologie as geology,
  vegetation as vegetation,
  vegetation_indicator.data as vegetationIndicator,
  treetypes.hardwood as tilleringHardwood,
  treetypes.data as tilleringTreeTypes,
  jsonb_build_array(NNO_12, NNO_25, NNO_37, NNO_50, NNO_62, NNO_75, NNO_87, NNO_100, NOO_12, NOO_25, NOO_37, NOO_50, NOO_62, NOO_75, NOO_87, NOO_100, OSO_12, OSO_25, OSO_37, OSO_50, OSO_62, OSO_75, OSO_87, OSO_100, SSO_12, SSO_25, SSO_37, SSO_50, SSO_62, SSO_75, SSO_87, SSO_100, SSW_12, SSW_25, SSW_37, SSW_50, SSW_62, SSW_75, SSW_87, SSW_100, WSW_12, WSW_25, WSW_37, WSW_50, WSW_62, WSW_75, WSW_87, WSW_100, WNW_12, WNW_25, WNW_37, WNW_50, WNW_62, WNW_75, WNW_87, WNW_100, NNW_12, NNW_25, NNW_37, NNW_50, NNW_62, NNW_75, NNW_87, NNW_100) as expoAndAspect,
  to_jsonb(string_to_array(regexp_replace(uebergaenge_zu, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')) as transitions
from
  bl_standorttypen
  left join bl_expo_hanglage using (STO_Nr)
  left join bl_vegetationindicator vegetation_indicator on bl_standorttypen.sto_nr = vegetation_indicator.code
  left join bl_treetype treetypes on bl_standorttypen.sto_nr = treetypes.code
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif(
      (regexp_match(bl_standorttypen.sto_nr, '^\d+')) [1],
      ''
    )::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  bl_standorttypen.sto_nr;


drop table if exists export.bl_associationgroup;
create table export.bl_associationgroup as
select
  gesgr_cat as category,
  gesgr_deu as de,
  waldbild as forestAppearance,
  standort as description,
  nutzung_pflege as useAndCare,
  vegetationsstufe as heightDispersion,
  flaechenanteil_bl as areaBl,
  flaechenanteil_bs as areaBs,
  flaeche_blbs_prozent as areaBlBsPercent,
  to_jsonb(string_to_array(regexp_replace(standorte, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')) as locations
from
  bl_gesellschaftsgruppen