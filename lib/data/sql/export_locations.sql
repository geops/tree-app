drop table if exists export.lu_locations;
drop table if exists export.bl_locations;
drop table if exists export.locations;
create table export.lu_locations as select * from locations where profile = 'lu';
create table export.bl_locations as select * from locations where profile = 'bl';
create table export.locations as select * from locations where profile = 'ch';
