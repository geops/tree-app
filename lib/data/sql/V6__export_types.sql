-- Export tables Luzern
CREATE TABLE lu_tillering_export (code TEXT, natural_forest_types int[][], farm_forest_types int[][], hardwood int[], firwood text[]);
CREATE TABLE lu_soil_export (code TEXT, data int[], characteristics text, note text);
CREATE TABLE lu_vegetation_indicator_export (code TEXT, data int[], note text);
CREATE TABLE lu_pioneer_export (code TEXT, data text[]);

WITH lu_tillering_data AS (
  SELECT 
    sto_nr,
    kategorie,
    coalesce(string_to_array(replace(Fi, '*', ''), '-'), ARRAY[null, null]) Fi,
    coalesce(string_to_array(replace(Ta, '*', ''), '-'), ARRAY[null, null]) Ta,
    coalesce(string_to_array(replace(WFö, '*', ''), '-'), ARRAY[null, null]) WFö,
    coalesce(string_to_array(replace(BFö, '*', ''), '-'), ARRAY[null, null]) BFö,
    coalesce(string_to_array(replace(Ei, '*', ''), '-'), ARRAY[null, null]) Ei,
    coalesce(string_to_array(replace(Lä, '*', ''), '-'), ARRAY[null, null]) Lä,
    coalesce(string_to_array(replace(Dg, '*', ''), '-'), ARRAY[null, null]) Dg,
    coalesce(string_to_array(replace(Bu, '*', ''), '-'), ARRAY[null, null]) Bu,
    coalesce(string_to_array(replace(Es, '*', ''), '-'), ARRAY[null, null]) Es,
    coalesce(string_to_array(replace(BAh, '*', ''), '-'), ARRAY[null, null]) BAh,
    coalesce(string_to_array(replace(SAh, '*', ''), '-'), ARRAY[null, null]) SAh,
    coalesce(string_to_array(replace(SEi, '*', ''), '-'), ARRAY[null, null]) SEi,
    coalesce(string_to_array(replace(TEi, '*', ''), '-'), ARRAY[null, null]) TEi,
    coalesce(string_to_array(replace(WLi, '*', ''), '-'), ARRAY[null, null]) WLi,
    coalesce(string_to_array(replace(SLi, '*', ''), '-'), ARRAY[null, null]) SLi,
    coalesce(string_to_array(replace(Ki, '*', ''), '-'), ARRAY[null, null]) Ki,
    coalesce(string_to_array(replace(BUl, '*', ''), '-'), ARRAY[null, null]) BUl,
    coalesce(string_to_array(replace(FUl, '*', ''), '-'), ARRAY[null, null]) FUl,
    coalesce(string_to_array(replace(SEr, '*', ''), '-'), ARRAY[null, null]) SEr,
    coalesce(string_to_array(replace(GEr, '*', ''), '-'), ARRAY[null, null]) GEr,
    coalesce(string_to_array(replace(AEr, '*', ''), '-'), ARRAY[null, null]) AEr,
    coalesce(string_to_array(replace(HBi, '*', ''), '-'), ARRAY[null, null]) HBi,
    coalesce(string_to_array(replace(TKi, '*', ''), '-'), ARRAY[null, null]) TKi,
    coalesce(string_to_array(replace(VBe, '*', ''), '-'), ARRAY[null, null]) VBe,
    coalesce(string_to_array(replace(MBe, '*', ''), '-'), ARRAY[null, null]) MBe,
    coalesce(string_to_array(replace(Wei, '*', ''), '-'), ARRAY[null, null]) Wei,
    Lbh_min::int,
    Lbh_opt::int,
    Ta_min,
    Ta_opt
  FROM lu_bestockung
),
lu_tillering_natural_forest_data AS (
  SELECT
    sto_nr,
    ARRAY [Fi, Ta, WFö, BFö, Ei, Lä, Dg, Bu, Es, BAh, SAh, SEi, TEi, WLi, SLi, Ki, BUl, FUl, SEr, GEr, AEr, HBi, TKi, VBe, MBe, Wei]::int[][] AS forest_types,
    Lbh_min,
    Lbh_opt,
    Ta_min,
    Ta_opt
  FROM lu_tillering_data
  WHERE kategorie = 'NW'
),
lu_tillering_farm_forest_data AS (
  SELECT
    sto_nr,
    ARRAY [Fi, Ta, WFö, BFö, Ei, Lä, Dg, Bu, Es, BAh, SAh, SEi, TEi, WLi, SLi, Ki, BUl, FUl, SEr, GEr, AEr, HBi, TKi, VBe, MBe, Wei]::int[][] AS forest_types
  FROM lu_tillering_data
  WHERE kategorie = 'WW'
)
INSERT INTO lu_tillering_export SELECT
  nfd.sto_nr AS code,
  nfd.forest_types AS natural_forest_types,
  ffd.forest_types AS farm_forest_types,
  ARRAY [Lbh_min, Lbh_opt] AS hardwood,
  ARRAY [Ta_min, Ta_opt] AS firwood
FROM lu_tillering_natural_forest_data AS nfd
LEFT JOIN lu_tillering_farm_forest_data AS ffd ON nfd.sto_nr = ffd.sto_nr;


INSERT INTO lu_soil_export 
SELECT
  sto_nr AS code,
  ARRAY [l, f, h, ahh, ah, basen, feuchte]::int[] AS data,
  besonderheiten AS characteristics,
  bemerkung AS note
FROM lu_boden;


INSERT INTO lu_vegetation_indicator_export 
SELECT
  sto_nr AS code,
  ARRAY [a,b,c,e,f,g,h,i,j,k,l,m,n,o,p]::int[] AS data,
  bemerkung AS note
FROM lu_artengruppen;

WITH lu_pioneer_data AS (
  SELECT 
    sto_nr,
    coalesce(string_to_array(replace(vorwaldbaumarten, ' ', ''), ','), ARRAY['-']) pioneer
  FROM lu_standorttypen
)

INSERT INTO lu_pioneer_export 
SELECT
  sto_nr AS code,
  pioneer::text[] as data
FROM lu_pioneer_data;


-- Export tables Basel
CREATE TABLE bl_vegetation_indicator_export (code TEXT, data int[]);
INSERT INTO bl_vegetation_indicator_export 
SELECT
  sto_nr AS code,
  ARRAY [A,B1,B2,C1,C2,D1,D2,D3,E1,E2,F,G,H,I,J,K,L,M,N1,N2,N3,O1,O2,O3,O4,O5,O6,O7,O8,P1,P2,P3,P4,Q1,Q2,Q3,R,S,T,U1,U2,U3,V1,V2,W,X1,X2,Y1,Y2,Z1,Z2,Z3]::int[] AS data
FROM bl_artengruppen;

CREATE TABLE bl_treetype_export (code TEXT, hardwood TEXT, data text[]);
INSERT INTO bl_treetype_export 
SELECT
  sto_nr AS code,
  Laubholzanteil_prozent as hardwood,
  ARRAY [Bu,TEi,SEi,BAh,SAh,BUl,Es,SEr,TKi,FAh,HBu,Ki,WLi,SLi,EBe,MBe,VBe,Nu,FUl,FEi,FlUl,SbAh,HBi,Ro,REi,"as",Ta,Fi,Fö,Lä,Eib,BFö,SFö,Dou]::text[] AS data
FROM bl_baumartenwahl;

-- Main export function 
COPY
    (SELECT jsonb_build_object(
      'bl', (SELECT jsonb_build_object('forestType', (SELECT json_agg(jsonb_build_object('code', sto_nr,
                                                                                            'de', sto_deu,
                                                                                            'la', sto_lat,
                                                                                            'properties', eigenschaften,
                                                                                            'tillering', bestockungsziele,
                                                                                            'forestryRejuvDev', wb_verj_ent,
                                                                                            'forestryCare', wb_pfl,
                                                                                            'descriptionNaturalForest', beschrieb_naturwald,
                                                                                            'heightDispersion', hoehenverbreitung,
                                                                                            'location', bl_standorttypen.standort,
                                                                                            'geology', geologie,
                                                                                            'vegetation', vegetation,
                                                                                            'vegetationIndicator', array_to_json(vegetation_indicator.data),
                                                                                            'tilleringHardwood', treetypes.hardwood,
                                                                                            'tilleringTreeTypes', treetypes.data,
                                                                                            'expoAndAspect', jsonb_build_array(NNO_12,
                                                                                                                            NNO_25,
                                                                                                                            NNO_37,
                                                                                                                            NNO_50,
                                                                                                                            NNO_62,
                                                                                                                            NNO_75,
                                                                                                                            NNO_87,
                                                                                                                            NNO_100,
                                                                                                                            NOO_12,
                                                                                                                            NOO_25,
                                                                                                                            NOO_37,
                                                                                                                            NOO_50,
                                                                                                                            NOO_62,
                                                                                                                            NOO_75,
                                                                                                                            NOO_87,
                                                                                                                            NOO_100,
                                                                                                                            OSO_12,
                                                                                                                            OSO_25,
                                                                                                                            OSO_37,
                                                                                                                            OSO_50,
                                                                                                                            OSO_62,
                                                                                                                            OSO_75,
                                                                                                                            OSO_87,
                                                                                                                            OSO_100,
                                                                                                                            SSO_12,
                                                                                                                            SSO_25,
                                                                                                                            SSO_37,
                                                                                                                            SSO_50,
                                                                                                                            SSO_62,
                                                                                                                            SSO_75,
                                                                                                                            SSO_87,
                                                                                                                            SSO_100,
                                                                                                                            SSW_12,
                                                                                                                            SSW_25,
                                                                                                                            SSW_37,
                                                                                                                            SSW_50,
                                                                                                                            SSW_62,
                                                                                                                            SSW_75,
                                                                                                                            SSW_87,
                                                                                                                            SSW_100,
                                                                                                                            WSW_12,
                                                                                                                            WSW_25,
                                                                                                                            WSW_37,
                                                                                                                            WSW_50,
                                                                                                                            WSW_62,
                                                                                                                            WSW_75,
                                                                                                                            WSW_87,
                                                                                                                            WSW_100,
                                                                                                                            WNW_12,
                                                                                                                            WNW_25,
                                                                                                                            WNW_37,
                                                                                                                            WNW_50,
                                                                                                                            WNW_62,
                                                                                                                            WNW_75,
                                                                                                                            WNW_87,
                                                                                                                            WNW_100,
                                                                                                                            NNW_12,
                                                                                                                            NNW_25,
                                                                                                                            NNW_37,
                                                                                                                            NNW_50,
                                                                                                                            NNW_62,
                                                                                                                            NNW_75,
                                                                                                                            NNW_87,
                                                                                                                            NNW_100),
                                                                                            'transitions', to_jsonb(string_to_array(regexp_replace(uebergaenge_zu, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')))) AS
          values
          FROM bl_standorttypen
          LEFT JOIN bl_expo_hanglage USING(STO_Nr)
          LEFT JOIN bl_vegetation_indicator_export vegetation_indicator ON bl_standorttypen.sto_nr = vegetation_indicator.code
          LEFT JOIN bl_treetype_export treetypes ON bl_standorttypen.sto_nr = treetypes.code
          ),
          --'transitionMapping', (SELECT json_agg(jsonb_build_object('code', sto_nr_nais, 'cantonalForestTypes', to_jsonb(string_to_array(regexp_replace(sto_nr_profile, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')))) FROM bl_uebergaenge),
          'associationGroup', (SELECT json_agg(jsonb_build_object('category', gesgr_cat,
                                                                      'de', gesgr_deu,
                                                                      'forestAppearance', waldbild,
                                                                      'description', standort,
                                                                      'useAndCare', nutzung_pflege,
                                                                      'heightDispersion', vegetationsstufe,
                                                                      'areaBl', flaechenanteil_bl,
                                                                      'areaBs', flaechenanteil_bs,
                                                                      'areaBlBsPercent', flaeche_blbs_prozent,
                                                                      'locations', to_jsonb(string_to_array(regexp_replace(standorte, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')))) AS
          values
          FROM bl_gesellschaftsgruppen))),
      'lu', (SELECT jsonb_build_object('forestType', (SELECT json_agg(jsonb_build_object('code', sto_nr,
                                                                                            'de', sto_deu,
                                                                                            'la', sto_lat,
                                                                                            'aptitude', eignung,
                                                                                            'forestryRejuvDev', wb_verj_ent,
                                                                                            'forestryCare', wb_pfl,
                                                                                            'description', beschreibung,
                                                                                            'heightDispersion', hoehenverbreitung,
                                                                                            'vegetation', vegetation,
                                                                                            'vegetationIndicator', array_to_json(vegetation_indicator.data),
                                                                                            'pioneerTreeTypes', array_to_json(pioneer_tree_types.data),
                                                                                            'associationGroupCode', regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g' ),
                                                                                            'soil', array_to_json(lu_soil_export.data),
                                                                                            'tillering', jsonb_build_array(array_to_json(natural_forest_types), array_to_json(farm_forest_types)),
                                                                                            'tilleringHardwood', array_to_json(hardwood),
                                                                                            'tilleringFirwood', firwood,
                                                                                            'expoAndAspect', jsonb_build_array(NNO_12,
                                                                                                                            NNO_25,
                                                                                                                            NNO_37,
                                                                                                                            NNO_50,
                                                                                                                            NNO_62,
                                                                                                                            NNO_75,
                                                                                                                            NNO_87,
                                                                                                                            NNO_100,
                                                                                                                            NOO_12,
                                                                                                                            NOO_25,
                                                                                                                            NOO_37,
                                                                                                                            NOO_50,
                                                                                                                            NOO_62,
                                                                                                                            NOO_75,
                                                                                                                            NOO_87,
                                                                                                                            NOO_100,
                                                                                                                            OSO_12,
                                                                                                                            OSO_25,
                                                                                                                            OSO_37,
                                                                                                                            OSO_50,
                                                                                                                            OSO_62,
                                                                                                                            OSO_75,
                                                                                                                            OSO_87,
                                                                                                                            OSO_100,
                                                                                                                            SSO_12,
                                                                                                                            SSO_25,
                                                                                                                            SSO_37,
                                                                                                                            SSO_50,
                                                                                                                            SSO_62,
                                                                                                                            SSO_75,
                                                                                                                            SSO_87,
                                                                                                                            SSO_100,
                                                                                                                            SSW_12,
                                                                                                                            SSW_25,
                                                                                                                            SSW_37,
                                                                                                                            SSW_50,
                                                                                                                            SSW_62,
                                                                                                                            SSW_75,
                                                                                                                            SSW_87,
                                                                                                                            SSW_100,
                                                                                                                            WSW_12,
                                                                                                                            WSW_25,
                                                                                                                            WSW_37,
                                                                                                                            WSW_50,
                                                                                                                            WSW_62,
                                                                                                                            WSW_75,
                                                                                                                            WSW_87,
                                                                                                                            WSW_100,
                                                                                                                            WNW_12,
                                                                                                                            WNW_25,
                                                                                                                            WNW_37,
                                                                                                                            WNW_50,
                                                                                                                            WNW_62,
                                                                                                                            WNW_75,
                                                                                                                            WNW_87,
                                                                                                                            WNW_100,
                                                                                                                            NNW_12,
                                                                                                                            NNW_25,
                                                                                                                            NNW_37,
                                                                                                                            NNW_50,
                                                                                                                            NNW_62,
                                                                                                                            NNW_75,
                                                                                                                            NNW_87,
                                                                                                                            NNW_100),
                                                                                            'compactRisk', verdrisk,
                                                                                            'priority', prioritaet)) AS
          values
          FROM lu_standorttypen
          LEFT JOIN lu_expo_hanglage USING(STO_Nr)
          LEFT JOIN lu_tillering_export ON lu_standorttypen.sto_nr = lu_tillering_export.code
          LEFT JOIN lu_soil_export ON lu_standorttypen.sto_nr = lu_soil_export.code
          LEFT JOIN lu_vegetation_indicator_export vegetation_indicator ON lu_standorttypen.sto_nr = vegetation_indicator.code
          LEFT JOIN lu_pioneer_export pioneer_tree_types ON lu_standorttypen.sto_nr = pioneer_tree_types.code
      ), 
      --'transitionMapping', (SELECT json_agg(jsonb_build_object('code', sto_nr_nais, 'cantonalForestTypes', to_jsonb(string_to_array(regexp_replace(sto_nr_profile, E'[\\n\\r[:space:]]+', '', 'g' )::text, ',')))) FROM lu_uebergaenge),
      'associationGroup', (SELECT json_agg(jsonb_build_object('code', regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g' ),
                                                                                              'de', gesgr_deu,
                                                                                              'la', gesgruppe_lat,
                                                                                              'description', beschreibung,
                                                                                              'location', standort,
                                                                                              'soil', boden,
                                                                                              'aptitudeMeaning', eignung_bedeutung,
                                                                                              'heightDispersion', hoehenverbreitung)) AS
          values
          FROM lu_gesellschaftsgruppen),
      'speciesGroup', (SELECT json_agg(jsonb_build_object('code', sto_nr,
                                                          'a', a,
                                                          'b', b,
                                                          'c', c,
                                                          'e', e,
                                                          'f', f,
                                                          'g', g,
                                                          'h', h,
                                                          'i', i,
                                                          'j', j,
                                                          'k', k,
                                                          'l', l,
                                                          'm', m,
                                                          'n', n,
                                                          'o', o,
                                                          'p', p,
                                                          'note', bemerkung,
                                                          'associationGroupCode', regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g' ))) AS
          values
          FROM lu_artengruppen))),
      'ch', (WITH additional AS
         (SELECT json_agg(jsonb_build_object('code', target, 'de', de, 'fr', fr)) AS
          values
          FROM additional_meta),
          altitudinal_zone AS
         (SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'id', id)) AS
          values
          FROM altitudinal_zone_meta),
          bushtype AS (
            SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'la', la)) AS values FROM bushtype_meta
          ),
          forest_ecoregions AS
         (SELECT json_agg(jsonb_build_object('code', subcode, 'de', region_de, 'fr', region_fr)) AS
          values
          FROM
              (SELECT subcode,
                            min(region_de) AS region_de, min(region_fr) AS region_fr
               FROM forest_ecoregions
               GROUP BY subcode
               ORDER BY subcode) foo),
          foresttype AS
         (SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'la', la, 'height', CASE tree_layer_height_min is null
                                                                                   WHEN TRUE THEN null
                                                                                   ELSE jsonb_build_array(conifer_tree_height_max, deciduous_tree_height_max, tree_layer_height_min, tree_layer_height_max)
                                                                               END,
                                                                     'location', jsonb_build_object('de', location_de, 'fr', location_fr),
                                                                     'naturalForest', jsonb_build_object('de', natural_forest_de, 'fr', natural_forest_fr),
                                                                     'vegetation', jsonb_build_object('de', vegetation_de, 'fr', vegetation_fr),
                                                                     'altitudinalZoneForestEcoregion', array_to_json(altitudinal_zone_forest_ecoregion),
                                                                     'carbonate', jsonb_build_array(carbonate_fine, carbonate_rock),
                                                                     'water', jsonb_build_array(water_stream, water_small, water_spring, water_change),
                                                                     'geomorphology', jsonb_build_array(geomorphology_rock_band, geomorphology_blocky_rocky_strong, geomorphology_blocky_rocky_little, geomorphology_limestone_pavement, geomorphology_rocks_moderately_moved, geomorphology_rocks_strongly_moved, geomorphology_rocks_stabilised),
                                                                     'process', jsonb_build_array(process_rockfall, process_avalanche, process_landslide, process_erosion),
                                                                     'reliefType', jsonb_build_array(relief_type_central_slope, relief_type_hollow, relief_type_dome, relief_type_plateau, relief_type_steep),
                                                                     'altitude', array_to_json(altitude),
                                                                     'aspect', array_to_json(aspect),
                                                                     'graininess', array_to_json(graininess),
                                                                     'humus', array_to_json(humus),
                                                                     'humusVariants', array_to_json(humus_variants),
                                                                     'rawMaterial', array_to_json(raw_material),
                                                                     'slope', array_to_json(slope),
                                                                     'skeletalFractionSoilDepth', array_to_json(skeletal_fraction_soil_depth),
                                                                     'soil', array_to_json(soil),
                                                                     'soilVariants', array_to_json(soil_variants),
                                                                     'soilWetnessGroundwater', array_to_json(soil_wetness_groundwater),
                                                                     'soilWetnessTailwater', array_to_json(soil_wetness_tailwater),
                                                                     'group', jsonb_build_object('main',
                                                                                                                    (SELECT count(*) > 0
                                                                                                                     FROM foresttype_group
                                                                                                                     WHERE code = foresttype_meta.code
                                                                                                                         AND "group" = 'main'::foresttype_group_type), 'special',
                                                                                                                    (SELECT count(*) > 0
                                                                                                                     FROM foresttype_group
                                                                                                                     WHERE code = foresttype_meta.code
                                                                                                                         AND "group" = 'special'::foresttype_group_type), 'volatile',
                                                                                                                    (SELECT count(*) > 0
                                                                                                                     FROM foresttype_group
                                                                                                                     WHERE code = foresttype_meta.code
                                                                                                                         AND "group" = 'volatile'::foresttype_group_type), 'riverside',
                                                                                                                    (SELECT count(*) > 0
                                                                                                                     FROM foresttype_group
                                                                                                                     WHERE code = foresttype_meta.code
                                                                                                                         AND "group" = 'riverside'::foresttype_group_type), 'pioneer',
                                                                                                                    (SELECT count(*) > 0
                                                                                                                     FROM foresttype_group
                                                                                                                     WHERE code = foresttype_meta.code
                                                                                                                         AND "group" = 'pioneer'::foresttype_group_type)))
                          ORDER BY
                          sort) AS
          VALUES
          FROM foresttype_meta),
          herbtype AS (
            SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'la', la)) AS values FROM herbtype_meta
          ),
          indicators as
         (SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'la', la, 'forestTypes',
                                                 (SELECT json_agg(trim(BOTH FROM naistyp_c))
                                                  FROM nat_naistyp_art
                                                  WHERE vorh IN ('1', '2', '3') AND sisf_nr::int = indicator_meta.code)
         )) AS
          values
          FROM indicator_meta),
          mosstype AS (
            SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'la', la)) AS values FROM mosstype_meta
          ),
          relief as
         (SELECT json_agg(jsonb_build_object('code', target, 'de', de, 'fr', fr)) AS
          values
          FROM
              (SELECT DISTINCT target,
                               de, fr
               FROM relief_meta) foo),
          silver_fir_areas as
         (SELECT json_agg(jsonb_build_object('code', target, 'de', de, 'fr', fr)) AS
          values
          FROM silver_fir_area_meta),
          slope AS
         (SELECT json_agg(jsonb_build_object('code', target, 'de', de, 'fr', fr)) AS
          values
          FROM slope_meta),
          treetype AS
         (SELECT json_agg(jsonb_build_object('code', target::text::int, 'de', de, 'fr', fr, 'la', la, 'endangered', endangered, 'nonresident', nonresident, 'pioneer', pioneer, 'forestTypes',
                                                 (SELECT json_agg(trim(BOTH FROM naistyp_c))
                                                  FROM nat_naistyp_art
                                                  WHERE vorh IN ('1', '2', '3') AND sisf_nr::int::text = treetype_meta.target::text))) AS
          values
          FROM treetype_meta) SELECT jsonb_build_object('additional',additional.
                                                        values,'altitudinalZone',altitudinal_zone.
                                                        values,'bushType', bushtype.
                                                        values,'forestEcoregion', forest_ecoregions.
                                                        values,'forestType', foresttype.
                                                        values,'herbType', herbtype.
                                                        values,'indicator',indicators.
                                                        values,'mossType', mosstype.
                                                        values,'relief',relief.
                                                        values,'silverFirArea',silver_fir_areas.
                                                        values,'slope',slope.
                                                        values,'treeType', treetype.
                                                        values)
     FROM additional,
          altitudinal_zone,
          bushtype,
          forest_ecoregions,
          foresttype,
          herbtype,
          indicators,
          mosstype,
          relief,
          silver_fir_areas,
          slope,
          treetype))) TO PROGRAM $$sed 's/\\\\\"/\\\"/g' > '/data/types.json'$$; --filter + replace double backslash escapes
