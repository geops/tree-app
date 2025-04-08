drop table if exists export.projections;
create table export.projections (id SERIAL, forestecoregion TEXT, altitudinalzone TEXT, foresttype TEXT, additional TEXT, silverfirarea TEXT, relief TEXT, slope TEXT, targetaltitudinalzone TEXT, targetforesttype TEXT);
truncate export.projections;
insert into
   export.projections (forestecoregion, altitudinalzone, foresttype, additional, silverfirarea, relief, slope, targetaltitudinalzone, targetforesttype) 	-- 3.) Match CSV values to enum values.
   with slopes as 
   (
      select
         slope,
         array_to_string(regexp_matches(slope, '(<|>).*(\d{2})'), '') parsed_slope 
      from
         projections_import
   )
   select distinct
      processed_forest_ecoregion as forestecoregion,
      altitudinal_zone_meta.code as altitudinalzone,
      case
         trim(both 
   from
      forest_type) = any(
      select
         code 
      from
         foresttype_meta) 
         when
            true 
         then
            forest_type 
         else
            null 
      end
      as foresttype, 
      case
         additional_meta.target is null 
         when
            true 
         then
            'unknown' 
         else
            additional_meta.target 
      end
      as additional, 
      case
         silver_fir_area_meta.target is null 
         when
            true 
         then
            'unknown' 
         else
            silver_fir_area_meta.target 
      end
      as silverfirarea, 
      case
         relief_meta.target is null 
         when
            true 
         then
            'unknown' 
         else
            relief_meta.target 
      end
      as relief, 
      case
         slopes.slope is null 
         when
            true 
         then
            'unknown' 
         else
            slopes.parsed_slope 
      end
      as slope, target_altitudinal_zone_meta.code as targetaltitudinalzone, 
      case
         processed_target_forest_type = any(
         select
            code 
         from
            foresttype_meta) 
            when
               true 
            then
               processed_target_forest_type 
            else
               null 
      end
      as targetforesttype 
         from
            (
               select
(regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(forest_ecoregions, forest_ecoregions_specific), '2(,|\s)', '2a, 2b,'), 'R 5', '5a, 5b,'), ',\s?'), 
                  (
                     select
                        string_agg(subcode, '|'::text) 
                     from
                        forest_ecoregions
                  )
))[1] as processed_forest_ecoregion,
                  case
                     when
                        target_altitudinal_zone ~ 'Nebenareal' 
                     then
                        'nebenareal' 
                     when
                        target_altitudinal_zone ~ 'Hauptareal' 
                     then
                        'hauptareal' 
                     when
                        target_altitudinal_zone ~ 'Reliktareal' 
                     then
                        'reliktareal' 
                     else
                        processed_silver_fir_area 
                  end
                  as processed_silver_fir_area2, 
                  case
                     when
                        target_altitudinal_zone ~ 'hochmontan' 
                     then
                        'hochmontan' 
                     else
                        trim(target_altitudinal_zone) 
                  end
                  as processed_target_altitudinal_zone, regexp_replace(trim(both 
               from
                  target_forest_type), '  ', ' ') as processed_target_forest_type, * 
               from
                  (
                     select
(regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(trim(lower(silver_fir_area)), 'nicht relevant'), 'haupt- und nebenareal', 'hauptareal,nebenareal'), 'haupt- oder nebenareal', 'hauptareal,nebenareal'), ',\s?') , 
                        (
                           select
                              string_agg(lower(areal_de)::text, '|'::text) || '|nicht relevant' 
                           from
                              silver_fir_areas
                        )
))[1] as processed_silver_fir_area,
                        * 
                     from
                        projections_import
                  )
                  import_silver_fir_area
            )
            import 
            left join
               altitudinal_zone_meta 
               on lower(altitudinal_zone_meta.source::text) = trim(lower(import.altitudinal_zone)) 
            left join
               altitudinal_zone_meta target_altitudinal_zone_meta 
               on lower(target_altitudinal_zone_meta.source::text) = lower(import.processed_target_altitudinal_zone) 
            left join
               additional_meta 
               on lower(additional_meta.source) = lower(import.additional) 
            left join
               silver_fir_area_meta 
               on lower(silver_fir_area_meta.source) = import.processed_silver_fir_area2 
            left join
               relief_meta 
               on relief_meta.source = import.relief 
            left join
               slopes 
               on slopes.slope = import.slope 
         order by
            forestecoregion,
            altitudinalzone,
            foresttype,
            targetaltitudinalzone,
            targetforesttype;