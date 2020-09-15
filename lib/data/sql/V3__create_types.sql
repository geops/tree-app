----------------------------------------------
-- additional

CREATE TYPE additional AS ENUM ('NrmlSl','ExtB','Nrml','withAv','CmpS','Shdy_Cl_Bb','Shdy_Cl','Wrm_Rdt','=10F','Cl','<1F','NoAvln','WthAvln', 'D_Eb_Cl','>5F','<5F','DpSl_Shdy','Dp','Rvn','Rbl','Shlw','<10F','>10F','unknown');


CREATE TABLE additional_meta (source TEXT, de TEXT, en TEXT, fr TEXT,target additional);


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Boden normal',
        'Boden normal',
        'Normal Soil',
        'sol normal',
        'NrmlSl');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Extrem blockig',
        'Extrem blockig',
        'Extremely blocky',
        'extrèmement riche en blocs',
        'ExtB');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Normal',
        'Normal',
        'Normal',
        'normal',
        'Nrml');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('bei Lawinenzug',
        'bei Lawinenzug',
        'for avalanches',
        'près d''un couloir d''avalanches',
        'withAv');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Boden verdichtet',
        'Boden verdichtet',
        'Compacted Soil',
        'sol compacté',
        'CmpS');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('schattig, kühl, grosse Blöcke',
        'schattig, kühl, grosse Blöcke',
        'Shady, Cool, Big blocks',
        'ombragé, frais, gros blocs',
        'Shdy_Cl_Bb');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Schattig, Kühl',
        'Schattig, Kühl',
        'Shady, Cool',
        'ombragé, frais',
        'Shdy_Cl');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Warm und Strahlungsreich',
        'Warm und Strahlungsreich',
        'Warm and radiant',
        'chaud et exposé',
        'Wrm_Rdt');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('falls mind alle 10 Jahre überschwemmt',
        'falls mind alle 10 Jahre überschwemmt',
        'Flooded every 10 years',
        'en cas d''inondation tous les 10 ans',
        '=10F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Kühl',
        'Kühl',
        'Cool',
        'frais',
        'Cl');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('falls alljährlich überschwemmt',
        'falls alljährlich überschwemmt',
        'Flooded every year',
        'en cas d''inondation annuelle',
        '<1F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Keine Lawinenbeeinflussung',
        'Keine Lawinenbeeinflussung',
        'No avalanche influence',
        'Non influencé par les avalanches',
        'NoAvln');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('mit Lawinenbeeinflussung',
        'mit Lawinenbeeinflussung',
        'With avalanche control',
        'Influencé par les avalanches',
        'WthAvln');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('trocken, extrem blockig, kühl',
        'trocken, extrem blockig, kühl',
        'Dry, Extremely blocky, Cool',
        'sec, extrèmement riches en blocs, frais',
        'D_Eb_Cl');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('alle 6 Jahre oder seltener überschwemmt',
        'alle 6 Jahre oder seltener überschwemmt',
        'Flooded every six years or less',
        'inondé tous les 6 ans ou plus rarement',
        '>5F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('bis alle 5 Jahre überschwemmt',
        'bis alle 5 Jahre überschwemmt',
        'Flooded every five years',
        'inondé jusqu''à tous les 5 ans',
        '<5F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('tiefgründiger Boden, schattig',
        'tiefgründiger Boden, schattig',
        'Deep soil, Shady',
        'sol profond, ombragé',
        'DpSl_Shdy');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('tiefgründig',
        'tiefgründig',
        'Deep',
        'sol profond',
        'Dp');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('Schlucht',
        'Schlucht',
        'Ravine',
        'ravin',
        'Rvn');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('mit viel Schutt',
        'mit viel Schutt',
        'With lots of rubble',
        'éboulis marqué',
        'Rbl');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('flachgründig',
        'flachgründig',
        'Shallow',
        'sol superficiel',
        'Shlw');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('weniger als alle 10 Jahre überschwemmt',
        'weniger als alle 10 Jahre überschwemmt',
        'Flooded less than every 10 years',
        'inondé plus rarement que tous les 10 ans',
        '<10F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('mind. alle 10 Jahre überschwemmt',
        'mind. alle 10 Jahre überschwemmt',
        'Flooded at least every 10 years',
        'inondé au minimum tous les 10 ans',
        '>10F');


INSERT INTO additional_meta (source, de, en, fr, target)
VALUES ('',
        'nicht relevant',
        'not relevant',
        'pas important',
        'unknown');

----------------------------------------------
-- altitudinal zones

CREATE TABLE altitudinal_zone_meta (source TEXT, de TEXT, fr TEXT, nais TEXT, code TEXT, id SERIAL);


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('collin -mediterran',
        'collin-mediterran',
        'collinéen à méditerranéen',
        '01C',
        '0');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('hyperinsubrisch',
        'hyperinsubrisch',
        'hyperinsubrique',
        'HY',
        '10');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('collin',
        'collin',
        'collinéen',
        'C',
        '20');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('collin mit Buche',
        'collin mit Buche',
        'collinéen avec hêtre',
        'CB',
        '30');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('submontan',
        'submontan',
        'submontagnard',
        'SM',
        '40');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('untermontan',
        'untermontan',
        'montagnard inférieur',
        'UM',
        '50');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('obermontan',
        'obermontan',
        'montagnard supérieur',
        'OM',
        '60');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('unter- & obermontan',
        'unter- & obermontan',
        'montagnard inférieur & supérieur',
        'UMOM',
        '70');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('hochmontan',
        'hochmontan',
        'haut-montagnard',
        'HM',
        '80');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('subalpin',
        'subalpin',
        'subalpin',
        'SA',
        '90');


INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code)
VALUES ('obersubalpin',
        'obersubalpin',
        'subalpin supérieur',
        'OSA',
        '100');

----------------------------------------------
-- foresttype

CREATE TABLE foresttype_meta (code TEXT PRIMARY KEY,
                                                de TEXT, fr TEXT, la TEXT, tree_layer_height_min INT, tree_layer_height_max INT, conifer_tree_height_max INT, deciduous_tree_height_max INT,
                              sort FLOAT, carbonate_fine INT, carbonate_rock INT, geomorphology_rock_band INT, geomorphology_blocky_rocky_strong INT, geomorphology_blocky_rocky_little INT, geomorphology_limestone_pavement INT, geomorphology_rocks_moderately_moved INT, geomorphology_rocks_strongly_moved INT, geomorphology_rocks_stabilised INT, relief_type_central_slope INT, relief_type_hollow INT, relief_type_dome INT, relief_type_plateau INT, relief_type_steep INT, process_rockfall INT, process_avalanche INT, process_landslide INT, process_erosion INT, water_stream INT, water_small INT, water_spring INT, water_change INT, location_de TEXT, location_fr TEXT, natural_forest_de TEXT, natural_forest_fr TEXT, vegetation_de TEXT, vegetation_fr TEXT, altitude INTEGER[][], altitudinal_zone_forest_ecoregion INTEGER[][], skeletal_fraction_soil_depth INTEGER[][], soil_wetness_groundwater INTEGER[][], soil_wetness_tailwater INTEGER[][], aspect INTEGER[], graininess INTEGER[], humus INTEGER[][], humus_variants INTEGER[], raw_material INTEGER[], slope INTEGER[], soil INTEGER[][], soil_variants INTEGER[]);


INSERT INTO foresttype_meta (code, de, fr, la, tree_layer_height_min, tree_layer_height_max, conifer_tree_height_max, deciduous_tree_height_max,
                             sort, carbonate_fine, carbonate_rock, geomorphology_rock_band, geomorphology_blocky_rocky_strong, geomorphology_blocky_rocky_little, geomorphology_limestone_pavement, geomorphology_rocks_moderately_moved, geomorphology_rocks_strongly_moved, geomorphology_rocks_stabilised, relief_type_central_slope, relief_type_hollow, relief_type_dome, relief_type_plateau, relief_type_steep, process_rockfall, process_avalanche, process_landslide, process_erosion, water_stream, water_small, water_spring, water_change, location_de, location_fr, natural_forest_de, natural_forest_fr, vegetation_de, vegetation_fr)
SELECT trim(naistyp_c) AS code,
       COALESCE(trim(naistyp_name_deu), trim(naistyp_namk_deu), trim(naistyp_wges)) AS de,
       COALESCE(trim(naistyp_name_frz), trim(naistyp_namk_frz)) AS fr,
       naistyp_name_lat AS la,
       typ.naistyp_hdom_min::int AS tree_layer_height_min,
       typ.naistyp_hdom_max::int AS tree_layer_height_max,
       typ.naistyp_hmax_nad::int AS conifer_tree_height_max,
       typ.naistyp_hmax_lau::int AS deciduous_tree_height_max,
       trim(BOTH
            FROM mstr.naistyp_sort)::float AS
sort,
       typ.ntyp_kg_fein::int carbonate_fine,
       typ.ntyp_kg_gestein::int carbonate_rock,
       typ.ntyp_fels::int AS geomorphology_rock_band,
       typ.ntyp_bl_fels_st::int AS geomorphology_blocky_rocky_strong,
       typ.ntyp_bl_fels_we::int AS geomorphology_blocky_rocky_little,
       typ.ntyp_bl_karren::int AS geomorphology_limestone_pavement,
       typ.ntyp_bl_schutt_m::int AS geomorphology_rocks_moderately_moved,
       typ.ntyp_bl_schutt_s::int AS geomorphology_rocks_strongly_moved,
       typ.ntyp_bl_schutt_x::int AS geomorphology_rocks_stabilised,
       typ.ntyp_rt_mittelh::int AS relief_type_central_slope,
       typ.ntyp_rt_mulde::int AS relief_type_hollow,
       typ.ntyp_rt_kuppe::int AS relief_type_dome,
       typ.ntyp_rt_plateau::int AS relief_type_plateau,
       typ.ntyp_rt_steilh::int AS relief_type_steep,
       typ.ntyp_steinschlag::int AS process_rockfall,
       typ.ntyp_lawinen::int AS process_avalanche,
       typ.ntyp_rutschung::int AS process_landslide,
       typ.ntyp_erosion::int AS process_erosion,
       typ.ntyp_wass_bach::int AS water_stream,
       typ.ntyp_wass_klein::int AS water_small,
       typ.ntyp_wass_quell::int AS water_spring,
       typ.ntyp_wechself::int AS water_change,
       regexp_replace(typ.naistyp_stao, '\r|\n', '', 'g') AS location_de,
       regexp_replace(typ.naistyp_stao_fr, '\r|\n', '', 'g') AS location_fr,
       regexp_replace(typ.naistyp_nwld, '\r|\n', '', 'g') AS natural_forest_de,
       regexp_replace(typ.naistyp_nwld_fr, '\r|\n', '', 'g') AS natural_forest_fr,
       regexp_replace(typ.naistyp_vasp, '\r|\n', '', 'g') AS vegetation_de,
       regexp_replace(typ.naistyp_vasp_fr, '\r|\n', '', 'g') AS vegetation_fr
FROM nat_naistyp_mstr mstr
LEFT JOIN nat_naistyp typ USING (naistyp_c)
WHERE naistyp_s20 = 'Y'
UNION
SELECT trim(BOTH
            FROM naistyp) AS code,
       NULL AS de,
       NULL AS fr,
       NULL AS la,
       NULL AS tree_layer_height_min,
       NULL AS tree_layer_height_max,
       NULL AS conifer_tree_height_max,
       NULL AS deciduous_tree_height_max,
       trim(BOTH
            FROM naistyp_sort)::float AS
sort,
       NULL AS carbonate_fine,
       NULL AS carbonate_rock,
       NULL AS geomorphology_rock_band,
       NULL AS geomorphology_blocky_rocky_strong,
       NULL AS geomorphology_blocky_rocky_little,
       NULL AS geomorphology_limestone_pavement,
       NULL AS geomorphology_rocks_moderately_moved,
       NULL AS geomorphology_rocks_strongly_moved,
       NULL AS geomorphology_rocks_stabilised,
       NULL AS relief_type_central_slope,
       NULL AS relief_type_hollow,
       NULL AS relief_type_dome,
       NULL AS relief_type_plateau,
       NULL AS relief_type_steep,
       NULL AS process_rockfall,
       NULL AS process_avalanche,
       NULL AS process_landslide,
       NULL AS process_erosion,
       NULL AS water_stream,
       NULL AS water_small,
       NULL AS water_spring,
       NULL AS water_change,
       NULL AS location_de,
       NULL AS location_fr,
       NULL AS natural_forest_de,
       NULL AS natural_forest_fr,
       NULL AS vegetation_de,
       NULL AS vegetation_fr
FROM nat_baum_collin
GROUP BY naistyp,
         naistyp_sort;


UPDATE foresttype_meta
SET altitudinal_zone_forest_ecoregion = ARRAY[ ARRAY[HS_01b_01C_J::int,
                                                     HS_01d_SM_J::int,
                                                     HS_01e_UM_J::int,
                                                     HS_01h_OM_J::int,
                                                     HS_01i_HM_J::int,
                                                     null,
                                                     null], ARRAY[ HS_02b_C_M::int,
                                                                   HS_02d_SM_M::int,
                                                                   HS_02e_UM_M::int,
                                                                   HS_02h_OM_M::int,
                                                                   HS_02i_HM_M::int,
                                                                   null,
                                                                   null], ARRAY[HS_03b_C_1::int,
                                                                                HS_03d_SM_1::int,
                                                                                HS_03e_UM_1::int,
                                                                                HS_03h_OM_1::int,
                                                                                HS_03i_HM_1::int,
                                                                                HS_03m_SA_1::int,
                                                                                HS_03n_OSA_1::int], ARRAY[HS_04b_C_2a::int,
                                                                                                          HS_04d_SM_2a::int,
                                                                                                          HS_04e_UM_2a::int,
                                                                                                          HS_04h_OM_2a::int,
                                                                                                          HS_04i_HM_2a::int,
                                                                                                          HS_04m_SA_2a::int,
                                                                                                          HS_04n_OSA_2a::int], ARRAY[HS_05b_C_2b::int,
                                                                                                                                     HS_05i_HM_2b::int,
                                                                                                                                     HS_05j_HM_2b_bis1000m::int,
                                                                                                                                     HS_05k_HM_2b_ab1000m::int,
                                                                                                                                     HS_05m_SA_2b::int,
                                                                                                                                     HS_05n_OSA_2b::int,
                                                                                                                                     null], ARRAY[HS_06i_HM_3::int,
                                                                                                                                                  HS_06m_SA_3::int,
                                                                                                                                                  HS_06n_OSA_3::int,
                                                                                                                                                  null,
                                                                                                                                                  null,
                                                                                                                                                  null,
                                                                                                                                                  null], ARRAY[HS_07b_C_4::int,
                                                                                                                                                               HS_07i_HM_4::int,
                                                                                                                                                               HS_07m_SA_4::int,
                                                                                                                                                               HS_07n_OSA_4::int,
                                                                                                                                                               null,
                                                                                                                                                               null,
                                                                                                                                                               null], ARRAY[ HS_08a_HY_5a::int,
                                                                                                                                                                             HS_08b_C_5a::int,
                                                                                                                                                                             HS_08c_CB_5a::int,
                                                                                                                                                                             HS_08g_UMOM_5a::int,
                                                                                                                                                                             HS_08i_HM_5a::int,
                                                                                                                                                                             HS_08m_SA_5a::int,
                                                                                                                                                                             HS_08n_OSA_5a::int], ARRAY[HS_09a_HY_5b::int,
                                                                                                                                                                                                        HS_09c_CB_5b::int,
                                                                                                                                                                                                        HS_09g_UMOM_5b::int,
                                                                                                                                                                                                        HS_09m_SA_5b::int,
                                                                                                                                                                                                        null,
                                                                                                                                                                                                        null,
                                                                                                                                                                                                        null], ARRAY[HS_10a_HY_Me::int,
                                                                                                                                                                                                                     HS_10c_CB_Me::int,
                                                                                                                                                                                                                     null,
                                                                                                                                                                                                                     null,
                                                                                                                                                                                                                     null,
                                                                                                                                                                                                                     null,
                                                                                                                                                                                                                     null]]
FROM nat_lage
LEFT JOIN nat_naistyp ON regexp_replace(nat_lage.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET skeletal_fraction_soil_depth = ARRAY[ ARRAY[gs_01::int,
                                                gs_02::int,
                                                gs_03::int,
                                                gs_04::int,
                                                gs_05::int,
                                                gs_06::int], --Gündigkeit sehr flach
 ARRAY[gs_07::int,
       gs_08::int,
       gs_09::int,
       gs_10::int,
       gs_11::int,
       gs_12::int], --Gündigkeit flach
 ARRAY[gs_13::int,
       gs_14::int,
       gs_15::int,
       gs_16::int,
       gs_17::int,
       gs_18::int], --Gündigkeit mittel
 ARRAY[gs_19::int,
       gs_20::int,
       gs_21::int,
       gs_22::int,
       gs_23::int,
       gs_24::int], --Gündigkeit tief
 ARRAY[gs_25::int,
       gs_26::int,
       gs_27::int,
       gs_28::int,
       gs_29::int,
       gs_30::int], --Gündigkeit sehr tief
 ARRAY[gs_31::int,
       gs_32::int,
       gs_33::int,
       gs_34::int,
       gs_35::int,
       gs_36::int] --Gündigkeit äusserst tief
 ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET soil_wetness_groundwater = ARRAY[ ARRAY[wvg_01::int,
                                            wvg_02::int,
                                            wvg_03::int,
                                            wvg_04::int,
                                            wvg_05::int,
                                            wvg_06::int], ARRAY[wvg_07::int,
                                                                wvg_08::int,
                                                                wvg_09::int,
                                                                wvg_10::int,
                                                                wvg_11::int,
                                                                wvg_12::int], ARRAY[wvg_13::int,
                                                                                    wvg_14::int,
                                                                                    wvg_15::int,
                                                                                    wvg_16::int,
                                                                                    wvg_17::int,
                                                                                    wvg_18::int], ARRAY[wvg_19::int,
                                                                                                        wvg_20::int,
                                                                                                        wvg_21::int,
                                                                                                        wvg_22::int,
                                                                                                        wvg_23::int,
                                                                                                        wvg_24::int], ARRAY[wvg_25::int,
                                                                                                                            wvg_26::int,
                                                                                                                            wvg_27::int,
                                                                                                                            wvg_28::int,
                                                                                                                            wvg_29::int,
                                                                                                                            wvg_30::int], ARRAY[wvg_31::int,
                                                                                                                                                wvg_32::int,
                                                                                                                                                wvg_33::int,
                                                                                                                                                wvg_34::int,
                                                                                                                                                wvg_35::int,
                                                                                                                                                wvg_36::int] ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET soil_wetness_tailwater = ARRAY[ ARRAY[wvs_01::int,
                                          wvs_02::int,
                                          wvs_03::int,
                                          wvs_04::int,
                                          wvs_05::int,
                                          wvs_06::int], ARRAY[wvs_07::int,
                                                              wvs_08::int,
                                                              wvs_09::int,
                                                              wvs_10::int,
                                                              wvs_11::int,
                                                              wvs_12::int], ARRAY[wvs_13::int,
                                                                                  wvs_14::int,
                                                                                  wvs_15::int,
                                                                                  wvs_16::int,
                                                                                  wvs_17::int,
                                                                                  wvs_18::int], ARRAY[wvs_19::int,
                                                                                                      wvs_20::int,
                                                                                                      wvs_21::int,
                                                                                                      wvs_22::int,
                                                                                                      wvs_23::int,
                                                                                                      wvs_24::int], ARRAY[wvs_25::int,
                                                                                                                          wvs_26::int,
                                                                                                                          wvs_27::int,
                                                                                                                          wvs_28::int,
                                                                                                                          wvs_29::int,
                                                                                                                          wvs_30::int], ARRAY[wvs_31::int,
                                                                                                                                              wvs_32::int,
                                                                                                                                              wvs_33::int,
                                                                                                                                              wvs_34::int,
                                                                                                                                              wvs_35::int,
                                                                                                                                              wvs_36::int], ARRAY[wvs_37::int,
                                                                                                                                                                  wvs_38::int,
                                                                                                                                                                  wvs_39::int,
                                                                                                                                                                  wvs_40::int,
                                                                                                                                                                  wvs_41::int,
                                                                                                                                                                  wvs_42::int] ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET aspect = ARRAY[ E_001_025_n_nne::int,
                    E_026_050_nne_ne::int,
                    E_051_075_ne_ene::int,
                    E_076_100_ene_e::int,
                    E_101_125_e_see::int,
                    E_126_150_see_se::int,
                    E_151_175_se_sse::int,
                    E_176_200_ss_s::int,
                    E_201_225_s_ssw::int,
                    E_226_250_ssw_sw::int,
                    E_251_275_sw_wsw::int,
                    E_276_300_wsw_w::int,
                    E_301_325_w_wnw::int,
                    E_326_350_wnw_nw::int,
                    E_351_375_nw_nnww::int,
                    E_376_400_nnw_n::int ]
FROM nat_lage
LEFT JOIN nat_naistyp ON regexp_replace(nat_lage.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET slope = ARRAY[ HN_000_010::int,
                   HN_010_025::int,
                   HN_025_050::int,
                   HN_050_075::int,
                   HN_075_100::int,
                   HN_100::int ]
FROM nat_lage
LEFT JOIN nat_naistyp ON regexp_replace(nat_lage.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET altitude = ARRAY[ ARRAY[HL_N_0250::int,
                            HL_N_0300::int,
                            HL_N_0350::int,
                            HL_N_0400::int,
                            HL_N_0450::int,
                            HL_N_0500::int,
                            HL_N_0550::int,
                            HL_N_0600::int,
                            HL_N_0650::int,
                            HL_N_0700::int,
                            HL_N_0750::int,
                            HL_N_0800::int,
                            HL_N_0850::int,
                            HL_N_0900::int,
                            HL_N_0950::int,
                            HL_N_1000::int,
                            HL_N_1050::int,
                            HL_N_1100::int,
                            HL_N_1150::int,
                            HL_N_1200::int,
                            HL_N_1250::int,
                            HL_N_1300::int,
                            HL_N_1350::int,
                            HL_N_1400::int,
                            HL_N_1450::int,
                            HL_N_1500::int,
                            HL_N_1550::int,
                            HL_N_1600::int,
                            HL_N_1650::int,
                            HL_N_1700::int,
                            HL_N_1750::int,
                            HL_N_1800::int,
                            HL_N_1850::int,
                            HL_N_1900::int,
                            HL_N_1950::int,
                            HL_N_2000::int,
                            HL_N_2050::int,
                            HL_N_2100::int,
                            HL_N_2150::int,
                            HL_N_2200::int,
                            HL_N_2250::int,
                            HL_N_2300::int], ARRAY[HL_EW_0250::int,
                                                   HL_EW_0300::int,
                                                   HL_EW_0350::int,
                                                   HL_EW_0400::int,
                                                   HL_EW_0450::int,
                                                   HL_EW_0500::int,
                                                   HL_EW_0550::int,
                                                   HL_EW_0600::int,
                                                   HL_EW_0650::int,
                                                   HL_EW_0700::int,
                                                   HL_EW_0750::int,
                                                   HL_EW_0800::int,
                                                   HL_EW_0850::int,
                                                   HL_EW_0900::int,
                                                   HL_EW_0950::int,
                                                   HL_EW_1000::int,
                                                   HL_EW_1050::int,
                                                   HL_EW_1100::int,
                                                   HL_EW_1150::int,
                                                   HL_EW_1200::int,
                                                   HL_EW_1250::int,
                                                   HL_EW_1300::int,
                                                   HL_EW_1350::int,
                                                   HL_EW_1400::int,
                                                   HL_EW_1450::int,
                                                   HL_EW_1500::int,
                                                   HL_EW_1550::int,
                                                   HL_EW_1600::int,
                                                   HL_EW_1650::int,
                                                   HL_EW_1700::int,
                                                   HL_EW_1750::int,
                                                   HL_EW_1800::int,
                                                   HL_EW_1850::int,
                                                   HL_EW_1900::int,
                                                   HL_EW_1950::int,
                                                   HL_EW_2000::int,
                                                   HL_EW_2050::int,
                                                   HL_EW_2100::int,
                                                   HL_EW_2150::int,
                                                   HL_EW_2200::int,
                                                   HL_EW_2250::int,
                                                   HL_EW_2300::int], ARRAY[HL_S_0250::int,
                                                                           HL_S_0300::int,
                                                                           HL_S_0350::int,
                                                                           HL_S_0400::int,
                                                                           HL_S_0450::int,
                                                                           HL_S_0500::int,
                                                                           HL_S_0550::int,
                                                                           HL_S_0600::int,
                                                                           HL_S_0650::int,
                                                                           HL_S_0700::int,
                                                                           HL_S_0750::int,
                                                                           HL_S_0800::int,
                                                                           HL_S_0850::int,
                                                                           HL_S_0900::int,
                                                                           HL_S_0950::int,
                                                                           HL_S_1000::int,
                                                                           HL_S_1050::int,
                                                                           HL_S_1100::int,
                                                                           HL_S_1150::int,
                                                                           HL_S_1200::int,
                                                                           HL_S_1250::int,
                                                                           HL_S_1300::int,
                                                                           HL_S_1350::int,
                                                                           HL_S_1400::int,
                                                                           HL_S_1450::int,
                                                                           HL_S_1500::int,
                                                                           HL_S_1550::int,
                                                                           HL_S_1600::int,
                                                                           HL_S_1650::int,
                                                                           HL_S_1700::int,
                                                                           HL_S_1750::int,
                                                                           HL_S_1800::int,
                                                                           HL_S_1850::int,
                                                                           HL_S_1900::int,
                                                                           HL_S_1950::int,
                                                                           HL_S_2000::int,
                                                                           HL_S_2050::int,
                                                                           HL_S_2100::int,
                                                                           HL_S_2150::int,
                                                                           HL_S_2200::int,
                                                                           HL_S_2250::int,
                                                                           HL_S_2300::int] ]
FROM nat_lage
LEFT JOIN nat_naistyp ON regexp_replace(nat_lage.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET graininess = ARRAY[KO_IS::int,
                       KO_L::int,
                       KO_S::int,
                       KO_T::int,
                       KO_U::int,
                       KO_lT::int,
                       KO_lU::int,
                       KO_sL::int,
                       KO_tL::int,
                       KO_tU::int ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET humus = ARRAY[ ARRAY[HUF_mo_mull_hydro::int,
                         HUF_mo_mull_norm::int,
                         HUF_mo_mull_xero::int], ARRAY[HUF_mo_rh_hydro::int,
                                                       HUF_mo_rh_norm::int,
                                                       HUF_mo_rh_xero::int], ARRAY[HUF_mo_typ_hydro::int,
                                                                                   HUF_mo_typ_norm::int,
                                                                                   HUF_mo_typ_xero::int], ARRAY[HUF_mu_f_hydro::int,
                                                                                                                HUF_mu_f_norm::int,
                                                                                                                HUF_mu_f_xero::int], ARRAY[HUF_mu_l_hydro::int,
                                                                                                                                           HUF_mu_l_norm::int,
                                                                                                                                           HUF_mu_l_xero::int], ARRAY[HUF_rh_hydro::int,
                                                                                                                                                                      HUF_rh_norm::int,
                                                                                                                                                                      HUF_rh_xero::int] ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET humus_variants = ARRAY[HUF_V_Anmoor::int,
                           HUF_V_Kalkmoder::int,
                           HUF_V_Kalkmull::int,
                           HUF_V_Tangel::int,
                           HUF_V_Torf::int,
                           HUF_V_erod::int]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET raw_material = ARRAY[AM_B::int,
                         AM_S::int ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET soil = ARRAY[ ARRAY[BE_GestRohB::int,
                        null,
                        null], ARRAY[BE_Ranker_norm::int,
                                     BE_Ranker_verbraunt::int,
                                     BE_Ranker_vernaesst::int], ARRAY[BE_Regosol_norm::int,
                                                                      BE_Regosol_verbraunt::int,
                                                                      BE_Regosol_vernaesst::int], ARRAY[BE_Pararendz_norm::int,
                                                                                                        BE_Pararendz_verbraunt::int,
                                                                                                        BE_Pararendz_vernaesst::int], ARRAY[BE_Rendz_norm::int,
                                                                                                                                            BE_Rendz_verbraunt::int,
                                                                                                                                            BE_Rendz_vernaesst::int], ARRAY[BE_Braunerd_norm::int,
                                                                                                                                                                            BE_Braunerd_podso::int,
                                                                                                                                                                            BE_Braunerd_vernaesst::int], ARRAY[BE_Parabraunerd_norm::int,
                                                                                                                                                                                                               BE_Parabraunerd_podso::int,
                                                                                                                                                                                                               BE_Parabraunerd_vernaesst::int], ARRAY[BE_Podsol_norm::int,
                                                                                                                                                                                                                                                      BE_Podsol_vernaesst::int,
                                                                                                                                                                                                                                                      null], ARRAY[BE_Stauw_norm::int,
                                                                                                                                                                                                                                                                   BE_Stauw_nassgebl::int,
                                                                                                                                                                                                                                                                   null], ARRAY[BE_Grundw_norm::int,
                                                                                                                                                                                                                                                                                BE_Grundw_nassgebl::int,
                                                                                                                                                                                                                                                                                null] ]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


UPDATE foresttype_meta
SET soil_variants = ARRAY[BE_V_Auenb::int,
                          BE_V_Braunpod::int,
                          BE_V_Humuspod::int,
                          BE_V_OrgB::int,
                          BE_V_neutrBraune::int]
FROM nat_boden
LEFT JOIN nat_naistyp ON regexp_replace(nat_boden.naistyp_sort, ',', '.') = nat_naistyp.naistyp_sort
WHERE trim(nat_naistyp.naistyp_c) = foresttype_meta.code;


CREATE TYPE foresttype_group_type AS ENUM ('main', 'special', 'volatile', 'riverside', 'pioneer');


CREATE TABLE foresttype_group ("group" foresttype_group_type,
                               code TEXT);


INSERT INTO foresttype_group("group", code)
SELECT 'main'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_hawa IN ('1',
                           '2')
UNION
SELECT 'special'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_sowa IN ('1',
                           '2')
UNION
SELECT 'volatile'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_wefe IN ('1',
                           '2')
UNION
SELECT 'riverside'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_aue IN ('1',
                          '2')
UNION
SELECT 'pioneer'::foresttype_group_type,
       trim(both
            from naistyp_c)
FROM nat_naistyp
WHERE naistyp_oeg_pio IN ('1',
                          '2');

----------------------------------------------
-- vegetation

CREATE TABLE bushtype_meta (code INTEGER PRIMARY KEY,
                                                 de TEXT, fr TEXT, la TEXT);


CREATE TABLE herbtype_meta (code INTEGER PRIMARY KEY,
                                                 de TEXT, fr TEXT, la TEXT);


CREATE TABLE mosstype_meta (code INTEGER PRIMARY KEY,
                                                 de TEXT, fr TEXT, la TEXT);


INSERT INTO bushtype_meta (code, de, fr, la)
SELECT sisf_nr::int AS code,
       COALESCE(art_nam_deu, art_nam_lat) AS de,
       COALESCE(art_nam_frz, art_nam_lat) AS fr,
       art_nam_lat AS la
FROM nat_arten_mstr
JOIN nat_arten_strauch USING (sisf_nr);


INSERT INTO herbtype_meta (code, de, fr, la)
SELECT sisf_nr::int AS code,
       COALESCE(art_nam_deu, art_nam_lat) AS de,
       COALESCE(art_nam_frz, art_nam_lat) AS fr,
       art_nam_lat AS la
FROM nat_arten_mstr
JOIN nat_arten_kraut USING (sisf_nr);


INSERT INTO mosstype_meta (code, de, fr, la)
SELECT moss_mstr.sisf_nr::int AS code,
       COALESCE(art_nam_deu, art_nam_lat) AS de,
       COALESCE(art_nam_frz, art_nam_lat) AS fr,
       art_nam_lat AS la
FROM nat_arten_mstr moss_mstr
JOIN nat_arten_moos USING (sisf_nr);

-- frequency: 1 = oft, 2 = manchmal

CREATE TABLE bushtype_foresttype (bushtype_code INTEGER REFERENCES bushtype_meta,
                                                                   foresttype_code TEXT REFERENCES foresttype_meta,
                                                                                                   frequency INTEGER);


INSERT INTO bushtype_foresttype (bushtype_code, foresttype_code, frequency)
SELECT sisf_nr::int AS bushtype_code,
       trim(naistyp_c) AS foresttype_code,
       vorh::int AS frequency
FROM nat_naistyp_art
WHERE art = 'S'
        AND vorh IN ('1',
                     '2');


CREATE TABLE herbtype_foresttype (herbtype_code INTEGER REFERENCES herbtype_meta,
                                                                   foresttype_code TEXT REFERENCES foresttype_meta,
                                                                                                   frequency INTEGER);


INSERT INTO herbtype_foresttype (herbtype_code, foresttype_code, frequency)
SELECT sisf_nr::int AS herbtype_code,
       trim(naistyp_c) AS foresttype_code,
       vorh::int AS frequency
FROM nat_naistyp_art
WHERE art = 'K'
        AND vorh IN ('1',
                     '2');


CREATE TABLE mosstype_foresttype (mosstype_code INTEGER REFERENCES mosstype_meta,
                                                                   foresttype_code TEXT REFERENCES foresttype_meta,
                                                                                                   frequency INTEGER);


INSERT INTO mosstype_foresttype (mosstype_code, foresttype_code, frequency)
SELECT sisf_nr::int AS mosstype_code,
       trim(naistyp_c) AS foresttype_code,
       vorh::int AS frequency
FROM nat_naistyp_art
WHERE art = 'M'
        AND vorh IN ('1',
                     '2');

----------------------------------------------
-- indicator

CREATE TABLE indicator_meta (code INTEGER PRIMARY KEY,
                                                  de TEXT, fr TEXT);


CREATE TABLE indicator_foresttype (indicator_code INTEGER REFERENCES indicator_meta,
                                                                     foresttype_code TEXT REFERENCES foresttype_meta);


CREATE TABLE indicator_altitudinal_zone (indicator_code INTEGER REFERENCES indicator_meta,
                                                                           altitudinal_zone_code TEXT);


CREATE TABLE indicator_forest_ecoregion (indicator_code INTEGER REFERENCES indicator_meta,
                                                                           forest_ecoregion_code TEXT);


INSERT INTO indicator_meta (code, de, fr)
SELECT sisf_nr::int AS code,
       COALESCE(art_nam_deu, art_nam_lat) AS de,
       COALESCE(art_nam_frz, art_nam_lat) AS fr
FROM nat_arten_mstr
WHERE art_erk_zeik = '1';


INSERT INTO indicator_foresttype (indicator_code, foresttype_code)
SELECT mstr.sisf_nr::int AS indicator_code,
       trim(BOTH
            FROM art.naistyp_c) AS foresttype_code
FROM nat_arten_mstr mstr
JOIN nat_naistyp_art art ON art.sisf_nr = mstr.sisf_nr
WHERE mstr.art_erk_zeik = '1'
        AND art.vorh IN ('1',
                         '2',
                         '3')
        AND trim(BOTH
                 FROM naistyp_c) IN
                (SELECT code
                 FROM foresttype_meta);


INSERT INTO indicator_forest_ecoregion (indicator_code, forest_ecoregion_code)
SELECT sisf_nr::int AS code,
       '1' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_1 = '1'
UNION
SELECT sisf_nr::int AS code,
       '2a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_2a = '1'
UNION
SELECT sisf_nr::int AS code,
       '2b' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_2b = '1'
UNION
SELECT sisf_nr::int AS code,
       '3' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_3 = '1'
UNION
SELECT sisf_nr::int AS code,
       '4' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_4 = '1'
UNION
SELECT sisf_nr::int AS code,
       '5a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5a = '1'
UNION
SELECT sisf_nr::int AS code,
       '5a' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5aa = '1'
UNION
SELECT sisf_nr::int AS code,
       '5b' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_5b = '1'
UNION
SELECT sisf_nr::int AS code,
       'J' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_j = '1'
UNION
SELECT sisf_nr::int AS code,
       'M' AS forest_ecoregion_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_region_m = '1';


INSERT INTO indicator_altitudinal_zone (indicator_code, altitudinal_zone_code)
SELECT sisf_nr::int AS code,
       '20' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_collin = '1'
UNION
SELECT sisf_nr::int AS code,
       '80' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_hochmont = '1'
UNION
SELECT sisf_nr::int AS code,
       '60' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_obermont = '1'
UNION
SELECT sisf_nr::int AS code,
       '100' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_obsubalp = '1'
UNION
SELECT sisf_nr::int AS code,
       '90' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_subalpin = '1'
UNION
SELECT sisf_nr::int AS code,
       '40' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_submontan = '1'
UNION
SELECT sisf_nr::int AS code,
       '50' AS altitudinal_zone_code
FROM nat_arten_mstr
WHERE art_erk_zeik = '1'
        AND art_hs_untermont = '1';

----------------------------------------------
-- recommendationtype

CREATE TYPE recommendationtype AS ENUM ('0', '1', '2', '3');

----------------------------------------------
-- relief

CREATE TYPE relief AS ENUM ('h_and_m','normal','w_and_s','kup','unknown');


CREATE TABLE relief_meta (source TEXT, de TEXT, fr TEXT, target relief);


INSERT INTO relief_meta (source, de, fr, target)
VALUES ('Hang- oder Muldenlage',
        'Hang- und Muldenlage',
        'en pente ou dans une dépression',
        'h_and_m');


INSERT INTO relief_meta (source, de, fr, target)
VALUES ('Hang- und Muldenlage',
        'Hang- und Muldenlage',
        'en pente ou dans une dépression',
        'h_and_m');


INSERT INTO relief_meta (source, de, fr, target)
VALUES ('normal',
        'normal',
        'normal',
        'normal');


INSERT INTO relief_meta (source, de, fr, target)
VALUES ('Kuppenlage',
        'Kuppenlage',
        'sur une butte',
        'kup');


INSERT INTO relief_meta (source, de, fr, target)
VALUES ('',
        'nicht relevant',
        'pas important',
        'unknown');

----------------------------------------------
-- slope

CREATE TABLE slope_meta (target TEXT, de TEXT, fr TEXT);


INSERT INTO slope_meta (target, de, fr)
VALUES ('<20',
        '<20%',
        '<20%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('>20',
        '>20%',
        '>20%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('<60',
        '<60%',
        '<60%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('<70',
        '<70%',
        '<70%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('>60',
        '>60%',
        '>60%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('>70',
        '>70%',
        '>70%');


INSERT INTO slope_meta (target, de, fr)
VALUES ('unknown',
        'nicht relevant',
        'pas important');

----------------------------------------------
-- silver fir areaS

CREATE TABLE silver_fir_area_meta (source TEXT, de TEXT, fr TEXT, target TEXT);


INSERT INTO silver_fir_area_meta (source, de, fr, target)
VALUES ('Hauptareal',
        'Hauptareal',
        'Aire principale',
        '1');


INSERT INTO silver_fir_area_meta (source, de, fr, target)
VALUES ('Nebenareal',
        'Nebenareal',
        'Aire secondaire',
        '2');


INSERT INTO silver_fir_area_meta (source, de, fr, target)
VALUES ('Reliktareal',
        'Reliktareal',
        'Aire relictuelle',
        '3');


INSERT INTO silver_fir_area_meta (source, de, fr, target)
VALUES ('nicht relevant',
        'nicht relevant',
        'pas important',
        'unknown');

----------------------------------------------
-- treetype

CREATE TYPE treetype AS ENUM ('100','300','600','700','800','6900','9500','25200','25300','25400','60400','60500','96900','97200','97750','97800','113350','137700','165000','172200','174200','174300','213300','217500','217510','220400','224200','227200','231500','238050','252900','287100','293550','302800','304900','305500','305800','305900','306000','306100','308600','317100','317300','317500','328400','329700','330200','330600','335300','335600','335800','335900','336000','336100','336200','345600','346500','362800','363700','363900','364000','364200','364300','365800','402200','402300','402500','402600','402700','402750','413600','421400','421500','422450','432800','432900','433000');


CREATE TABLE treetype_meta (target treetype PRIMARY KEY,
                                                    de TEXT, fr TEXT, la TEXT, endangered BOOLEAN, nonresident BOOLEAN, pioneer BOOLEAN);


INSERT INTO treetype_meta (target, de, fr, la, endangered, nonresident, pioneer)
SELECT foo.treetype,
       nais.art_nam_deu,
       nais.art_nam_frz,
       nais.art_nam_lat,
       baum.art_kaa::boolean,
       baum.art_gfa::boolean,
       baum.art_pionier::boolean
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
LEFT JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
LEFT JOIN nat_arten_baum baum ON nais.sisf_nr = baum.sisf_nr;


CREATE TABLE treetype_foresttype (treetype_code treetype REFERENCES treetype_meta,
                                                                    foresttype_code TEXT REFERENCES foresttype_meta);


INSERT INTO treetype_foresttype (treetype_code, foresttype_code)
SELECT foo.treetype AS treetype_code,
       trim(BOTH
            FROM art.naistyp_c) AS foresttype_code
FROM
        (SELECT unnest(enum_range(NULL::treetype)) AS treetype) foo
JOIN nat_naistyp_art art ON art.sisf_nr::int::text = foo.treetype::text
WHERE art.vorh IN ('1',
                   '2',
                   '3')
        AND trim(BOTH
                 FROM naistyp_c) IN
                (SELECT code
                 FROM foresttype_meta);


CREATE TABLE treetype_altitudinal_zone (treetype_code treetype REFERENCES treetype_meta,
                                                                          altitudinal_zone_code TEXT);


CREATE TABLE treetype_forest_ecoregion (treetype_code treetype REFERENCES treetype_meta,
                                                                          forest_ecoregion_code TEXT);


INSERT INTO treetype_forest_ecoregion (treetype_code, forest_ecoregion_code)
SELECT foo.treetype AS treetype_code,
       '1' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_1 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '2a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_2a = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '2b' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_2b = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '3' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_3 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '4' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_4 = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5a = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5a' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5aa = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '5b' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_5b = '1'
UNION
SELECT foo.treetype AS treetype_code,
       'J' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_j = '1'
UNION
SELECT foo.treetype AS treetype_code,
       'M' AS forest_ecoregion_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_region_m = '1';


INSERT INTO treetype_altitudinal_zone (treetype_code, altitudinal_zone_code)
SELECT foo.treetype AS treetype_code,
       '20' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_collin = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '80' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_hochmont = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '60' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_obermont = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '100' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_obsubalp = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '90' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_subalpin = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '40' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_submontan = '1'
UNION
SELECT foo.treetype AS treetype_code,
       '50' AS altitudinal_zone_code
FROM
        (SELECT unnest(enum_range(null::treetype)) AS treetype) foo
JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype::text
WHERE art_hs_untermont = '1';

