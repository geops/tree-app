-- NAIS - Common data
drop table if exists export.treetype;

create table export.treetype as
with
  foresttypes_agg as (
    select
      sisf_nr as target,
      array_agg(
        distinct trim(
          both
          from
            naistyp_c
        )
      ) as agg_foresttypes
    from
      nat_naistyp_art
    where
      vorh in ('1', '2', '3')
    group by
      target
  )
select
  tm.target::text as code,
  tm.de,
  tm.fr,
  tm.la,
  tm.endangered,
  tm.nonresident,
  tm.pioneer,
  to_json(foresttypes_agg.agg_foresttypes) as foresttypes
from
  treetype_meta tm
  join foresttypes_agg on tm.target::text = foresttypes_agg.target::int::text
order by
  tm.target asc;

drop table if exists export.forestecoregion;

create table export.forestecoregion as
select
  subcode as code,
  min(region_de) as de,
  min(region_fr) as fr
from
  forest_ecoregions
group by
  subcode
order by
  subcode;

drop table if exists export.bushtype;

create table export.bushtype as
select
  code::text as code,
  de,
  fr,
  la
from
  bushtype_meta
group by
  code
order by
  code;

drop table if exists export.altitudinalzone;

create table export.altitudinalzone as
select
  code,
  de,
  fr,
  id
from
  altitudinal_zone_meta
group by
  code,
  altitudinal_zone_meta.de,
  altitudinal_zone_meta.fr,
  altitudinal_zone_meta.id
order by
  code;

drop table if exists export.additional;

create table export.additional as
select
  target as code,
  de,
  fr
from
  additional_meta
group by
  code,
  additional_meta.de,
  additional_meta.fr
order by
  code;

drop table if exists export.foresttype;

create table export.foresttype as
select
  code,
  de,
  fr,
  la,
  case tree_layer_height_min is null
    when true then null
    else jsonb_build_array(
      conifer_tree_height_max,
      deciduous_tree_height_max,
      tree_layer_height_min,
      tree_layer_height_max
    )
  end as height,
  location_de as location_de,
  location_fr as location_fr,
  natural_forest_de as "naturalForest_de",
  natural_forest_fr as "naturalForest_fr",
  vegetation_de as vegetation_de,
  vegetation_fr as vegetation_fr,
  array_to_json(altitudinal_zone_forest_ecoregion) as "altitudinalZoneForestEcoregion",
  jsonb_build_array(carbonate_fine, carbonate_rock) as carbonate,
  jsonb_build_array(
    water_stream,
    water_small,
    water_spring,
    water_change
  ) as water,
  jsonb_build_array(
    geomorphology_rock_band,
    geomorphology_blocky_rocky_strong,
    geomorphology_blocky_rocky_little,
    geomorphology_limestone_pavement,
    geomorphology_rocks_moderately_moved,
    geomorphology_rocks_strongly_moved,
    geomorphology_rocks_stabilised
  ) as geomorphology,
  jsonb_build_array(
    process_rockfall,
    process_avalanche,
    process_landslide,
    process_erosion
  ) as process,
  jsonb_build_array(
    relief_type_central_slope,
    relief_type_hollow,
    relief_type_dome,
    relief_type_plateau,
    relief_type_steep
  ) as "reliefType",
  array_to_json(altitude) as altitude,
  array_to_json(aspect) as aspect,
  array_to_json(graininess) as graininess,
  array_to_json(humus) as humus,
  array_to_json(humus_variants) as "humusVariants",
  array_to_json(raw_material) as "rawMaterial",
  array_to_json(slope) as slope,
  array_to_json(skeletal_fraction_soil_depth) as "skeletalFractionSoilDepth",
  array_to_json(soil) as soil,
  array_to_json(soil_variants) as "soilVariants",
  array_to_json(soil_wetness_groundwater) as "soilWetnessGroundwater",
  array_to_json(soil_wetness_tailwater) as "soilWetnessTailwater",
  (
    select
      count(*) > 0
    from
      foresttype_group
    where
      code = foresttype_meta.code
      and "group" = 'main'::foresttype_group_type
  ) as group_main,
  (
    select
      count(*) > 0
    from
      foresttype_group
    where
      code = foresttype_meta.code
      and "group" = 'special'::foresttype_group_type
  ) as group_special,
  (
    select
      count(*) > 0
    from
      foresttype_group
    where
      code = foresttype_meta.code
      and "group" = 'volatile'::foresttype_group_type
  ) as group_volatile,
  (
    select
      count(*) > 0
    from
      foresttype_group
    where
      code = foresttype_meta.code
      and "group" = 'riverside'::foresttype_group_type
  ) as group_riverside,
  (
    select
      count(*) > 0
    from
      foresttype_group
    where
      code = foresttype_meta.code
      and "group" = 'pioneer'::foresttype_group_type
  ) as group_pioneer
from
  foresttype_meta
group by
  code
order by
  -- Extract numeric prefix; if no prefix exists, assign a large value
  coalesce(
    nullif((regexp_match(code, '^\d+')) [1], '')::integer,
    2147483647
  ),
  -- Then sort alphabetically by the full code
  code;

drop table if exists export.herbtype;

create table export.herbtype as
select
  code::text as code,
  de,
  fr,
  la
from
  herbtype_meta
group by
  code
order by
  code;

drop table if exists export.indicator;

create table export.indicator as
with
  foresttypes_agg as (
    select
      sisf_nr as target,
      array_agg(
        distinct trim(
          both
          from
            naistyp_c
        )
      ) as agg_foresttypes
    from
      nat_naistyp_art
    where
      vorh in ('1', '2', '3')
    group by
      target
  )
select
  im.code::int as code,
  im.de,
  im.fr,
  im.la,
  to_json(foresttypes_agg.agg_foresttypes) as foresttypes
from
  indicator_meta im
  join foresttypes_agg on im.code::text = foresttypes_agg.target::int::text
order by
  im.code asc;

drop table if exists export.mosstype;

create table export.mosstype as
select
  code::text as code,
  de,
  fr,
  la
from
  mosstype_meta
group by
  code
order by
  code;

drop table if exists export.relief;

create table export.relief as
select
  target as code,
  de,
  fr
from
  (
    select distinct
      target,
      de,
      fr
    from
      relief_meta
  ) foo
group by
  code,
  foo.de,
  foo.fr
order by
  code;

drop table if exists export.silverfirarea;

create table export.silverfirarea as
select
  target as code,
  de,
  fr
from
  silver_fir_area_meta
group by
  code,
  silver_fir_area_meta.de,
  silver_fir_area_meta.fr
order by
  code;

drop table if exists export.slope;

create table export.slope as
select
  target as code,
  de,
  fr
from
  slope_meta
group by
  code,
  slope_meta.de,
  slope_meta.fr
order by
  code;