create or replace function create_recommendations(naistyp_art_table text, baum_collin_table text, output_table text)
returns void as $$
begin
    execute format('drop table if exists %s', output_table);
    
    execute format('
        create table %s as
        with recommendations_meta as (
            select distinct trim(both from naistyp_c) as foresttype,
                   sisf_nr::int::text::treetype as treetype,
                   vorh::recommendationtype as recommendationtype
            from %s
            where art = ''B''
            union
            select distinct trim(both from naistyp) as foresttype,
                   sisf_nr::int::text::treetype as treetype,
                   case vorh
                       when ''a'' then ''1''::recommendationtype
                       when ''b'' then ''2''::recommendationtype
                       when ''c'' then ''3''::recommendationtype
                       else null
                   end as recommendationtype
            from %s
            where sisf_nr::int::text::name = any(enum_range(null::treetype)::name[])
        ),
        one as (
            select foresttype,
                   json_agg(treetype::text::int order by treetype) treetypes
            from recommendations_meta
            where recommendationtype = ''1''
              and treetype != ''9500''
            group by foresttype
        ),
        two as (
            select foresttype,
                   json_agg(treetype::text::int order by treetype) treetypes
            from recommendations_meta
            where recommendationtype = ''2''
              and treetype != ''9500''
            group by foresttype
        ),
        three as (
            select foresttype,
                   json_agg(treetype::text::int order by treetype) treetypes
            from recommendations_meta
            where recommendationtype = ''3''
              and treetype != ''9500''
            group by foresttype
        ),
        four as (
            select foresttype,
                   json_agg(treetype::text::int order by treetype) treetypes
            from recommendations_meta
            where treetype = ''9500''
            group by foresttype
        )
        select foresttype,
               json_build_array(coalesce(one.treetypes, ''[]''::json),
                                coalesce(two.treetypes, ''[]''::json),
                                coalesce(three.treetypes, ''[]''::json),
                                coalesce(four.treetypes, ''[]''::json)) as recommendations
        from (
            select distinct foresttype
            from recommendations_meta
            order by foresttype
        ) foo
        left join one using (foresttype)
        left join two using (foresttype)
        left join three using (foresttype)
        left join four using (foresttype)',
        output_table,
        naistyp_art_table,
        baum_collin_table
    );
end;
$$ language plpgsql;

select create_recommendations('nat_naistyp_art', 'nat_baum_collin', 'export.recommendations');
select create_recommendations('vd_nat_naistyp_art', 'vd_nat_baum_collin', 'export.vd_recommendations');