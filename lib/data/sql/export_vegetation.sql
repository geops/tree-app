drop table if exists export.vegetation;


create table export.vegetation as with herb1 as
  (select foresttype_code,
          json_agg(herbtype_code::text::int
                   order by herbtype_code) herbtypes
   from herbtype_foresttype
   where frequency = 1
   group by foresttype_code),
                                       herb2 as
  (select foresttype_code,
          json_agg(herbtype_code::text::int
                   order by herbtype_code) herbtypes
   from herbtype_foresttype
   where frequency = 2
   group by foresttype_code),
                                       bush1 as
  (select foresttype_code,
          json_agg(bushtype_code::text::int
                   order by bushtype_code) bushtypes
   from bushtype_foresttype
   where frequency = 1
   group by foresttype_code),
                                       bush2 as
  (select foresttype_code,
          json_agg(bushtype_code::text::int
                   order by bushtype_code) bushtypes
   from bushtype_foresttype
   where frequency = 2
   group by foresttype_code),
                                       moss1 as
  (select foresttype_code,
          json_agg(mosstype_code::text::int
                   order by mosstype_code) mosstypes
   from mosstype_foresttype
   where frequency = 1
   group by foresttype_code),
                                       moss2 as
  (select foresttype_code,
          json_agg(mosstype_code::text::int
                   order by mosstype_code) mosstypes
   from mosstype_foresttype
   where frequency = 2
   group by foresttype_code)
select meta.code,
       json_build_array(coalesce(herb1.herbtypes, '[]'::json),
                        coalesce(herb2.herbtypes, '[]'::json)) as herb,
       json_build_array(coalesce(bush1.bushtypes, '[]'::json),
                        coalesce(bush2.bushtypes, '[]'::json)) as bush,
       json_build_array(coalesce(moss1.mosstypes, '[]'::json),
                        coalesce(moss2.mosstypes, '[]'::json)) as moss
from foresttype_meta meta
left join herb1 on meta.code = herb1.foresttype_code
left join herb2 on meta.code = herb2.foresttype_code
left join bush1 on meta.code = bush1.foresttype_code
left join bush2 on meta.code = bush2.foresttype_code
left join moss1 on meta.code = moss1.foresttype_code
left join moss2 on meta.code = moss2.foresttype_code