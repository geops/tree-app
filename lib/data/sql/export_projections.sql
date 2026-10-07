-- Function to create and populate projections export tables
CREATE OR REPLACE FUNCTION create_projections_export_table(
    export_table_name TEXT,
    import_table_name TEXT
) RETURNS void AS $$
BEGIN
    -- Drop and create the export table
    EXECUTE format('DROP TABLE IF EXISTS export.%I', export_table_name);
    EXECUTE format('CREATE TABLE export.%I (id SERIAL, forestecoregion TEXT, altitudinalzone TEXT, foresttype TEXT, additional TEXT, silverfirarea TEXT, relief TEXT, slope TEXT, targetaltitudinalzone TEXT, targetforesttype TEXT)', export_table_name);
    
    -- Insert data into the export table
    EXECUTE format('
        INSERT INTO export.%I (forestecoregion, altitudinalzone, foresttype, additional, silverfirarea, relief, slope, targetaltitudinalzone, targetforesttype)
        WITH slopes AS (
            SELECT
                slope,
                array_to_string(regexp_matches(slope, ''(<|>).*(\d{2})''), '''') parsed_slope 
            FROM %I
        )
        SELECT DISTINCT
            processed_forest_ecoregion as forestecoregion,
            altitudinal_zone_meta.code as altitudinalzone,
            CASE
                WHEN trim(both from forest_type) = any(select code from foresttype_meta) 
                THEN forest_type 
                ELSE null 
            END as foresttype, 
            CASE
                WHEN additional_meta.target is null 
                THEN ''unknown'' 
                ELSE additional_meta.target 
            END as additional, 
            CASE
                WHEN silver_fir_area_meta.target is null 
                THEN ''unknown'' 
                ELSE silver_fir_area_meta.target 
            END as silverfirarea, 
            CASE
                WHEN relief_meta.target is null 
                THEN ''unknown'' 
                ELSE relief_meta.target 
            END as relief, 
            CASE
                WHEN slopes.slope is null 
                THEN ''unknown'' 
                ELSE slopes.parsed_slope 
            END as slope, 
            target_altitudinal_zone_meta.code as targetaltitudinalzone, 
            CASE
                WHEN processed_target_forest_type = any(select code from foresttype_meta) 
                THEN processed_target_forest_type 
                ELSE null 
            END as targetforesttype 
        FROM (
            SELECT
                (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(forest_ecoregions, forest_ecoregions_specific), ''2(,|\s)'', ''2a, 2b,''), ''R 5'', ''5a, 5b,''), '',\s?''), 
                    (SELECT string_agg(subcode, ''|''::text) FROM forest_ecoregions)
                ))[1] as processed_forest_ecoregion,
                CASE
                    WHEN target_altitudinal_zone ~ ''Nebenareal'' THEN ''nebenareal'' 
                    WHEN target_altitudinal_zone ~ ''Hauptareal'' THEN ''hauptareal'' 
                    WHEN target_altitudinal_zone ~ ''Reliktareal'' THEN ''reliktareal'' 
                    ELSE processed_silver_fir_area 
                END as processed_silver_fir_area2, 
                CASE
                    WHEN target_altitudinal_zone ~ ''hochmontan'' THEN ''hochmontan'' 
                    ELSE trim(target_altitudinal_zone) 
                END as processed_target_altitudinal_zone, 
                regexp_replace(trim(both from target_forest_type), ''  '', '' '') as processed_target_forest_type, 
                * 
            FROM (
                SELECT
                    (regexp_matches(regexp_split_to_table(regexp_replace(regexp_replace(coalesce(trim(lower(silver_fir_area)), ''nicht relevant''), ''haupt- und nebenareal'', ''hauptareal,nebenareal''), ''haupt- oder nebenareal'', ''hauptareal,nebenareal''), '',\s?'') , 
                        (SELECT string_agg(lower(areal_de)::text, ''|''::text) || ''|nicht relevant'' FROM silver_fir_areas)
                    ))[1] as processed_silver_fir_area,
                    * 
                FROM %I
            ) import_silver_fir_area
        ) import 
        LEFT JOIN altitudinal_zone_meta ON lower(altitudinal_zone_meta.source::text) = trim(lower(import.altitudinal_zone)) 
        LEFT JOIN altitudinal_zone_meta target_altitudinal_zone_meta ON lower(target_altitudinal_zone_meta.source::text) = lower(import.processed_target_altitudinal_zone) 
        LEFT JOIN additional_meta ON lower(additional_meta.source) = lower(import.additional) 
        LEFT JOIN silver_fir_area_meta ON lower(silver_fir_area_meta.source) = import.processed_silver_fir_area2 
        LEFT JOIN relief_meta ON relief_meta.source = import.relief 
        LEFT JOIN slopes ON slopes.slope = import.slope 
        ORDER BY forestecoregion, altitudinalzone, foresttype, targetaltitudinalzone, targetforesttype',
        export_table_name, import_table_name, import_table_name
    );
END;
$$ LANGUAGE plpgsql;

-- Create the standard projections export table
SELECT create_projections_export_table('projections', 'projections_import');

-- Create the VD projections export table
SELECT create_projections_export_table('vd_projections', 'vd_projections_import');