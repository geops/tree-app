CREATE TABLE tillering_meta as (select * from lu_bestockung);
UPDATE tillering_meta
SET
    Fi = string_to_array(replace(Fi, '*', ''), '-'),
	Ta = string_to_array(replace(Ta, '*', ''), '-'),
	WFö = string_to_array(replace(WFö, '*', ''), '-'),
	BFö = string_to_array(replace(BFö, '*', ''), '-'),
	Ei = string_to_array(replace(Ei, '*', ''), '-'),
	Lä =string_to_array(replace(Lä, '*', ''), '-'),
	Dg = string_to_array(replace(Dg, '*', ''), '-'),
	Bu = string_to_array(replace(Bu, '*', ''), '-'),
	Es = string_to_array(replace(Es, '*', ''), '-'),
	BAh = string_to_array(replace(BAh, '*', ''), '-'),
	SAh = string_to_array(replace(SAh, '*', ''), '-'),
	SEi = string_to_array(replace(SEi, '*', ''), '-'),
	TEi = string_to_array(replace(TEi, '*', ''), '-'),
	WLi = string_to_array(replace(WLi, '*', ''), '-'),
	SLi = string_to_array(replace(SLi, '*', ''), '-'),
	Ki = string_to_array(replace(Ki, '*', ''), '-'),
	BUl = string_to_array(replace(BUl, '*', ''), '-'),
	FUl = string_to_array(replace(FUl, '*', ''), '-'),
	SEr = string_to_array(replace(SEr, '*', ''), '-'),
	GEr = string_to_array(replace(GEr, '*', ''), '-'),
	AEr = string_to_array(replace(AEr, '*', ''), '-'),
	HBi = string_to_array(replace(HBi, '*', ''), '-'),
	TKi = string_to_array(replace(TKi, '*', ''), '-'),
	VBe = string_to_array(replace(VBe, '*', ''), '-'),
	MBe = string_to_array(replace(MBe, '*', ''), '-'),
	Wei = string_to_array(replace(Wei, '*', ''), '-');

CREATE TABLE tillering_export (STO_NR TEXT, NW VARCHAR, WW VARCHAR);
INSERT INTO tillering_export (STO_NR) SELECT DISTINCT STO_NR FROM lu_bestockung;

with nw as (select * from tillering_export
	inner join 
		(SELECT * FROM tillering_meta WHERE tillering_meta.Kategorie = 'NW') b
	using(STO_NR)
)

update tillering_export
set NW = ARRAY(
	select (Fi, Ta, WFö, BFö, Ei, Lä, Dg, Bu, Es, BAh, SAh, SEi, TEi, WLi, SLi, Ki, BUl, FUl, SEr, GEr, AEr, HBi, TKi, VBe, MBe, Wei ) from nw WHERE tillering_export.STO_NR = nw.STO_NR
);

with ww as (select * from tillering_export
	inner join 
		(SELECT * FROM tillering_meta WHERE tillering_meta.Kategorie = 'WW') b
	using(STO_NR)
)

update tillering_export
set WW = ARRAY(
	select (Fi, Ta, WFö, BFö, Ei, Lä, Dg, Bu, Es, BAh, SAh, SEi, TEi, WLi, SLi, Ki, BUl, FUl, SEr, GEr, AEr, HBi, TKi, VBe, MBe, Wei ) from ww WHERE tillering_export.STO_NR = ww.STO_NR
);


COPY
    (SELECT jsonb_build_object(
      'lu', (SELECT jsonb_build_object('forestType', (SELECT json_agg(jsonb_build_object('code', sto_nr,
                                                                                            'de', sto_deu,
                                                                                            'la', sto_lat,
                                                                                            'aptitude', eignung,
                                                                                            'forestryRejuvDev', wb_verj_ent,
                                                                                            'forestryCare', wb_pfl,
                                                                                            'description', beschreibung,
                                                                                            'heightDispersion', hoehenverbreitung,
                                                                                            'vegetation', vegetation,
                                                                                            'pioneerTreeTypes', vorwaldbaumarten,
                                                                                            'associationGroupCode', regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g' ),
                                                                                            --'tillering', jsonb_build_array(array_to_json(NW), array_to_json(WW)),
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
          FROM lu_standorttypen LEFT JOIN lu_expo_hanglage USING(STO_Nr) LEFT JOIN tillering_export USING(STO_NR)), 'associationGroup', (SELECT json_agg(jsonb_build_object('code', regexp_replace(gesgr_nr, E'[\\n\\r[:space:]]+', '', 'g' ),
                                                                                              'de', gesgr_deu,
                                                                                              'la', gesgruppe_lat,
                                                                                              'description', beschreibung,
                                                                                              'location', standort,
                                                                                              'soil', boden,
                                                                                              'aptitudeMeaning', eignung_bedeutung,
                                                                                              'heightDispersion', hoehenverbreitung)) AS
          values
          FROM lu_gesellschaftsgruppen), 'speciesGroup', (SELECT json_agg(jsonb_build_object('code', sto_nr,
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
         (SELECT json_agg(jsonb_build_object('code', code, 'de', de, 'fr', fr, 'forestTypes',
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
          treetype))) TO '/data/types.json';
