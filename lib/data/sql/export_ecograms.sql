drop table if exists export.ecograms;

create table export.ecograms as
select
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  to_json(string_to_array(eco.f, ',')) as foresttypes
from
  ecograms eco
where
  eco.profile = 'ch'
group by
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  eco.f
order by
  eco.id asc;

drop table if exists export.lu_ecograms;

create table export.lu_ecograms as
select
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  to_json(string_to_array(eco.f, ',')) as foresttypes
from
  ecograms eco
where
  eco.profile = 'lu'
group by
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  eco.f
order by
  eco.id asc;

drop table if exists export.bl_ecograms;

create table export.bl_ecograms as
select
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  to_json(string_to_array(eco.f, ',')) as foresttypes
from
  ecograms eco
where
  eco.profile = 'bl'
group by
  eco.id,
  eco.x,
  eco.y,
  eco.w,
  eco.h,
  eco.r,
  eco.ox,
  eco.oy,
  eco.z,
  eco.f
order by
  eco.id asc;