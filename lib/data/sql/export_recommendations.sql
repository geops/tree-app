drop table if exists recommendations_meta;


create table recommendations_meta (foresttype TEXT, treetype treetype,
                                                    recommendationtype recommendationtype);


insert into recommendations_meta (foresttype, treetype, recommendationtype)
select distinct trim(both
                     from naistyp_c) as foresttype,
                sisf_nr::int::text::treetype,
                vorh::recommendationtype
from nat_naistyp_art
where art = 'B'
union
select distinct trim(both
                     from naistyp) as foresttype,
                sisf_nr::int::text::treetype,
                case vorh
                    when 'a' then '1'::recommendationtype
                    when 'b' then '2'::recommendationtype
                    when 'c' then '3'::recommendationtype
                    else null
                end as recommendationtype
from nat_baum_collin
where sisf_nr::int::text::name = any(enum_range(null::treetype)::name[]);


drop table if exists recommendations;


create table export.recommendations as with one as
  (select foresttype,
          json_agg(treetype::text::int
                   order by treetype) treetypes
   from recommendations_meta
   where recommendationtype = '1'
     and treetype != '9500'
   group by foresttype),
                                            two as
  (select foresttype,
          json_agg(treetype::text::int
                   order by treetype) treetypes
   from recommendations_meta
   where recommendationtype = '2'
     and treetype != '9500'
   group by foresttype),
                                            three as
  (select foresttype,
          json_agg(treetype::text::int
                   order by treetype) treetypes
   from recommendations_meta
   where recommendationtype = '3'
     and treetype != '9500'
   group by foresttype),
                                            four as
  (select foresttype,
          json_agg(treetype::text::int
                   order by treetype) treetypes
   from recommendations_meta
   where treetype = '9500'
   group by foresttype)
select foresttype,
       json_build_array(coalesce(one.treetypes, '[]'::json),
                        coalesce(two.treetypes, '[]'::json),
                        coalesce(three.treetypes, '[]'::json),
                        coalesce(four.treetypes, '[]'::json)) as recommendations
from
  (select distinct foresttype
   from recommendations_meta
   order by foresttype) foo
left join one using (foresttype)
left join two using (foresttype)
left join three using (foresttype)
left join four using (foresttype)