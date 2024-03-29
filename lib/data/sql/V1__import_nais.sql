CREATE TABLE Baumarteninformationen (Naistyp TEXT, Gebietsfremd TEXT, Krankheitsgefaehrdet TEXT, Code TEXT);

COPY Baumarteninformationen
FROM '/data/nais/Baumarteninformationen.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE Bodeninformationen (Feld_Nr TEXT, Feld_Name TEXT, FT1 TEXT, FT1h TEXT, FT2 TEXT, FT3 TEXT, FT3s TEXT, FT3LV TEXT, FT3L4L TEXT, FT3Stern TEXT, FT4 TEXT, FT4Stern TEXT, FT6 TEXT, FT7S TEXT, FT7a TEXT, FT7Stern TEXT, FT8S TEXT, FT8a TEXT, FT8d TEXT, FT8Stern TEXT, FT9a TEXT, FT9w TEXT, FT10a TEXT, FT10w TEXT, FT11 TEXT, FT12Stern TEXT, FT12S TEXT, FT12a TEXT, FT12e TEXT, FT12Sternh TEXT, FT12w TEXT, FT13a TEXT, FT13e TEXT, FT13eh TEXT, FT13h TEXT, FT13Stern TEXT, FT14 TEXT, FT14Stern TEXT, FT15 TEXT, FT16 TEXT, FT16Stern TEXT, FT17 TEXT, FT18 TEXT, FT18M TEXT, FT18w TEXT, FT18v TEXT, FT18Stern TEXT, FT19 TEXT, FT19L TEXT, FT19P TEXT, FT19a TEXT, FT19f TEXT, FT20 TEXT, FT20E TEXT, FT21 TEXT, FT21L TEXT, FT21Stern TEXT, FT22 TEXT, FT22A TEXT, FT22C TEXT, FT22Stern TEXT, FT23 TEXT, FT23H TEXT, FT23Stern TEXT, FT24Stern TEXT, FT25 TEXT, FT25O TEXT, FT25_A TEXT, FT25a TEXT, FT25b TEXT, FT25e TEXT, FT25f TEXT, FT25Q TEXT, FT25au TEXT, FT25Stern TEXT, FT26 TEXT, FT26h TEXT, FT26w TEXT, FT27 TEXT, FT27O TEXT, FT27h TEXT, FT27Stern TEXT, FT28 TEXT, FT29 TEXT, FT29A TEXT, FT29C TEXT, FT29h TEXT, FT30 TEXT, FT31 TEXT, FT32C TEXT, FT32S TEXT, FT32V TEXT, FT32Stern TEXT, FT33V TEXT, FT33a TEXT, FT33b TEXT, FT33m TEXT, FT34a TEXT, FT34b TEXT, FT34Stern TEXT, FT35 TEXT, FT35M TEXT, FT35Q TEXT, FT35S TEXT, FT35A TEXT, FT36 TEXT, FT37 TEXT, FT38 TEXT, FT38S TEXT, FT38Stern TEXT, FT39 TEXT, FT39Stern TEXT, FT40P TEXT, FT40PBl TEXT, FT40Stern TEXT, FT41 TEXT, FT41Stern TEXT, FT42C TEXT, FT42Q TEXT, FT42V TEXT, FT42r TEXT, FT42B TEXT, FT42t TEXT, FT43 TEXT, FT43S TEXT, FT43Stern TEXT, FT44 TEXT, FT45 TEXT, FT46 TEXT, FT46M TEXT, FT46t TEXT, FT46Stern TEXT, FT47 TEXT, FT47D TEXT, FT47M TEXT, FT47H TEXT, FT47Stern TEXT, FT48 TEXT, FT49 TEXT, FT49Stern TEXT, FT50 TEXT, FT50P TEXT, FT50Stern TEXT, FT51 TEXT, FT51C TEXT, FT52 TEXT, FT52T TEXT, FT53 TEXT, FT53Stern TEXT, FT53A TEXT, FT54 TEXT, FT54A TEXT, FT55 TEXT, FT55Stern TEXT, FT56 TEXT, FT57Bl TEXT, FT57C TEXT, FT57M TEXT, FT57S TEXT, FT57V TEXT, FT57VM TEXT, FT58 TEXT, FT58Bl TEXT, FT58C TEXT, FT58L TEXT, FT59 TEXT, FT59A TEXT, FT59C TEXT, FT59E TEXT, FT59H TEXT, FT59J TEXT, FT59L TEXT, FT59R TEXT, FT59S TEXT, FT59V TEXT, FT59Stern TEXT, FT60 TEXT, FT60A TEXT, FT60E TEXT, FT60Stern TEXT, FT61 TEXT, FT62 TEXT, FT65 TEXT, FT65Stern TEXT, FT66 TEXT, FT66PM TEXT, FT67 TEXT, FT68 TEXT, FT68Stern TEXT, FT69 TEXT, FT70 TEXT, FT71 TEXT, FT72 TEXT, FT91 TEXT, FT92a TEXT, FT92z TEXT, FT93 TEXT, FTAV TEXT);

COPY Bodeninformationen
FROM '/data/nais/Bodeninformationen.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_ARTEN_BAUM (SISF_NR TEXT, ART_SCHICHT_STD TEXT, ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, ART_REGION_M TEXT, ART_REGION_1 TEXT, ART_REGION_2A TEXT, ART_REGION_2B TEXT, ART_REGION_3 TEXT, ART_REGION_4 TEXT, ART_REGION_5A TEXT, ART_REGION_5AA TEXT, ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT, ART_PIONIER TEXT, ART_GFA TEXT, ART_KAA TEXT, ART_LA_BAFU TEXT);

COPY NAT_ARTEN_BAUM
FROM '/data/nais/NAT_ARTEN_BAUM.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_ARTEN_KRAUT (SISF_NR TEXT, ART_SCHICHT_STD TEXT, ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, ART_REGION_M TEXT, ART_REGION_1 TEXT, ART_REGION_2A TEXT, ART_REGION_2B TEXT, ART_REGION_3 TEXT, ART_REGION_4 TEXT, ART_REGION_5A TEXT, ART_REGION_5AA TEXT, ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT);

COPY NAT_ARTEN_KRAUT
FROM '/data/nais/NAT_ARTEN_KRAUT.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_ARTEN_MOOS (SISF_NR TEXT, ART_SCHICHT_STD TEXT, ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, ART_REGION_M TEXT, ART_REGION_1 TEXT, ART_REGION_2A TEXT, ART_REGION_2B TEXT, ART_REGION_3 TEXT, ART_REGION_4 TEXT, ART_REGION_5A TEXT, ART_REGION_5AA TEXT, ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT);

COPY NAT_ARTEN_MOOS
FROM '/data/nais/NAT_ARTEN_MOOS.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_ARTEN_MSTR (SISF_NR TEXT, ART_NAM_LAT TEXT, ART_NAM_DEU TEXT, ART_NAM_FRZ TEXT, ART_NAM_ITA TEXT, ART_SCHICHT_BS_S TEXT, ART_SCHICHT_BS_A TEXT, ART_SCHICHT_SS_S TEXT, ART_SCHICHT_SS_A TEXT, ART_SCHICHT_KS_S TEXT, ART_SCHICHT_KS_A TEXT, ART_SCHICHT_MS_S TEXT, ART_SCHICHT_MS_A TEXT, ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, ART_REGION_M TEXT, ART_REGION_1 TEXT, ART_REGION_2A TEXT, ART_REGION_2B TEXT, ART_REGION_3 TEXT, ART_REGION_4 TEXT, ART_REGION_5A TEXT, ART_REGION_5AA TEXT, ART_REGION_5B TEXT, ART_EIG_GRP TEXT, ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT, ART_EINGEF TEXT, ART_ACHTUNG TEXT, ART_EIN_ZEIK TEXT, ART_ERK_ZEIK TEXT);

COPY NAT_ARTEN_MSTR
FROM '/data/nais/NAT_ARTEN_MSTR.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_ARTEN_STRAUCH (SISF_NR TEXT, ART_SCHICHT_STD TEXT, ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, ART_REGION_M TEXT, ART_REGION_1 TEXT, ART_REGION_2A TEXT, ART_REGION_2B TEXT, ART_REGION_3 TEXT, ART_REGION_4 TEXT, ART_REGION_5A TEXT, ART_REGION_5AA TEXT, ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT);

COPY NAT_ARTEN_STRAUCH
FROM '/data/nais/NAT_ARTEN_STRAUCH.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_BAUM_COLLIN (REGION TEXT, NAISTYP_SORT TEXT, NAISTYP TEXT, SISF_NR TEXT, VORH TEXT, QUELLE_BA TEXT);

COPY NAT_BAUM_COLLIN
FROM '/data/nais/NAT_BAUM_COLLIN.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_BODEN (NAISTYP_SORT TEXT, AM_B TEXT, AM_S TEXT, BE_Braunerd_norm TEXT, BE_Braunerd_podso TEXT, BE_Braunerd_vernaesst TEXT, BE_GestRohB TEXT, BE_Grundw_nassgebl TEXT, BE_Grundw_norm TEXT, BE_Parabraunerd_norm TEXT, BE_Parabraunerd_podso TEXT, BE_Parabraunerd_vernaesst TEXT, BE_Pararendz_norm TEXT, BE_Pararendz_verbraunt TEXT, BE_Pararendz_vernaesst TEXT, BE_Podsol_norm TEXT, BE_Podsol_vernaesst TEXT, BE_Ranker_norm TEXT, BE_Ranker_verbraunt TEXT, BE_Ranker_vernaesst TEXT, BE_Regosol_norm TEXT, BE_Regosol_verbraunt TEXT, BE_Regosol_vernaesst TEXT, BE_Rendz_norm TEXT, BE_Rendz_verbraunt TEXT, BE_Rendz_vernaesst TEXT, BE_Stauw_nassgebl TEXT, BE_Stauw_norm TEXT, BE_V_Auenb TEXT, BE_V_Braunpod TEXT, BE_V_Humuspod TEXT, BE_V_OrgB TEXT, BE_V_neutrBraune TEXT, GS_01 TEXT, GS_02 TEXT, GS_03 TEXT, GS_04 TEXT, GS_05 TEXT, GS_06 TEXT, GS_07 TEXT, GS_08 TEXT, GS_09 TEXT, GS_10 TEXT, GS_11 TEXT, GS_12 TEXT, GS_13 TEXT, GS_14 TEXT, GS_15 TEXT, GS_16 TEXT, GS_17 TEXT, GS_18 TEXT, GS_19 TEXT, GS_20 TEXT, GS_21 TEXT, GS_22 TEXT, GS_23 TEXT, GS_24 TEXT, GS_25 TEXT, GS_26 TEXT, GS_27 TEXT, GS_28 TEXT, GS_29 TEXT, GS_30 TEXT, GS_31 TEXT, GS_32 TEXT, GS_33 TEXT, GS_34 TEXT, GS_35 TEXT, GS_36 TEXT, HUF_V_Anmoor TEXT, HUF_V_Kalkmoder TEXT, HUF_V_Kalkmull TEXT, HUF_V_Tangel TEXT, HUF_V_Torf TEXT, HUF_V_erod TEXT, HUF_mo_mull_hydro TEXT, HUF_mo_mull_norm TEXT, HUF_mo_mull_xero TEXT, HUF_mo_rh_hydro TEXT, HUF_mo_rh_norm TEXT, HUF_mo_rh_xero TEXT, HUF_mo_typ_hydro TEXT, HUF_mo_typ_norm TEXT, HUF_mo_typ_xero TEXT, HUF_mu_f_hydro TEXT, HUF_mu_f_norm TEXT, HUF_mu_f_xero TEXT, HUF_mu_l_hydro TEXT, HUF_mu_l_norm TEXT, HUF_mu_l_xero TEXT, HUF_rh_hydro TEXT, HUF_rh_norm TEXT, HUF_rh_xero TEXT, KO_IS TEXT, KO_L TEXT, KO_S TEXT, KO_T TEXT, KO_U TEXT, KO_lT TEXT, KO_lU TEXT, KO_sL TEXT, KO_tL TEXT, KO_tU TEXT, WVG_01 TEXT, WVG_02 TEXT, WVG_03 TEXT, WVG_04 TEXT, WVG_05 TEXT, WVG_06 TEXT, WVG_07 TEXT, WVG_08 TEXT, WVG_09 TEXT, WVG_10 TEXT, WVG_11 TEXT, WVG_12 TEXT, WVG_13 TEXT, WVG_14 TEXT, WVG_15 TEXT, WVG_16 TEXT, WVG_17 TEXT, WVG_18 TEXT, WVG_19 TEXT, WVG_20 TEXT, WVG_21 TEXT, WVG_22 TEXT, WVG_23 TEXT, WVG_24 TEXT, WVG_25 TEXT, WVG_26 TEXT, WVG_27 TEXT, WVG_28 TEXT, WVG_29 TEXT, WVG_30 TEXT, WVG_31 TEXT, WVG_32 TEXT, WVG_33 TEXT, WVG_34 TEXT, WVG_35 TEXT, WVG_36 TEXT, WVS_01 TEXT, WVS_02 TEXT, WVS_03 TEXT, WVS_04 TEXT, WVS_05 TEXT, WVS_06 TEXT, WVS_07 TEXT, WVS_08 TEXT, WVS_09 TEXT, WVS_10 TEXT, WVS_11 TEXT, WVS_12 TEXT, WVS_13 TEXT, WVS_14 TEXT, WVS_15 TEXT, WVS_16 TEXT, WVS_17 TEXT, WVS_18 TEXT, WVS_19 TEXT, WVS_20 TEXT, WVS_21 TEXT, WVS_22 TEXT, WVS_23 TEXT, WVS_24 TEXT, WVS_25 TEXT, WVS_26 TEXT, WVS_27 TEXT, WVS_28 TEXT, WVS_29 TEXT, WVS_30 TEXT, WVS_31 TEXT, WVS_32 TEXT, WVS_33 TEXT, WVS_34 TEXT, WVS_35 TEXT, WVS_36 TEXT, WVS_37 TEXT, WVS_38 TEXT, WVS_39 TEXT, WVS_40 TEXT, WVS_41 TEXT, WVS_42 TEXT);

COPY NAT_BODEN
FROM '/data/nais/NAT_BODEN.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_LAGE (NAISTYP_SORT TEXT, E_001_025_n_nne TEXT, E_026_050_nne_ne TEXT, E_051_075_ne_ene TEXT, E_076_100_ene_e TEXT, E_101_125_e_see TEXT, E_126_150_see_se TEXT, E_151_175_se_sse TEXT, E_176_200_ss_s TEXT, E_201_225_s_ssw TEXT, E_226_250_ssw_sw TEXT, E_251_275_sw_wsw TEXT, E_276_300_wsw_w TEXT, E_301_325_w_wnw TEXT, E_326_350_wnw_nw TEXT, E_351_375_nw_nnww TEXT, E_376_400_nnw_n TEXT, HL_EW_0250 TEXT, HL_EW_0300 TEXT, HL_EW_0350 TEXT, HL_EW_0400 TEXT, HL_EW_0450 TEXT, HL_EW_0500 TEXT, HL_EW_0550 TEXT, HL_EW_0600 TEXT, HL_EW_0650 TEXT, HL_EW_0700 TEXT, HL_EW_0750 TEXT, HL_EW_0800 TEXT, HL_EW_0850 TEXT, HL_EW_0900 TEXT, HL_EW_0950 TEXT, HL_EW_1000 TEXT, HL_EW_1050 TEXT, HL_EW_1100 TEXT, HL_EW_1150 TEXT, HL_EW_1200 TEXT, HL_EW_1250 TEXT, HL_EW_1300 TEXT, HL_EW_1350 TEXT, HL_EW_1400 TEXT, HL_EW_1450 TEXT, HL_EW_1500 TEXT, HL_EW_1550 TEXT, HL_EW_1600 TEXT, HL_EW_1650 TEXT, HL_EW_1700 TEXT, HL_EW_1750 TEXT, HL_EW_1800 TEXT, HL_EW_1850 TEXT, HL_EW_1900 TEXT, HL_EW_1950 TEXT, HL_EW_2000 TEXT, HL_EW_2050 TEXT, HL_EW_2100 TEXT, HL_EW_2150 TEXT, HL_EW_2200 TEXT, HL_EW_2250 TEXT, HL_EW_2300 TEXT, HL_N_0250 TEXT, HL_N_0300 TEXT, HL_N_0350 TEXT, HL_N_0400 TEXT, HL_N_0450 TEXT, HL_N_0500 TEXT, HL_N_0550 TEXT, HL_N_0600 TEXT, HL_N_0650 TEXT, HL_N_0700 TEXT, HL_N_0750 TEXT, HL_N_0800 TEXT, HL_N_0850 TEXT, HL_N_0900 TEXT, HL_N_0950 TEXT, HL_N_1000 TEXT, HL_N_1050 TEXT, HL_N_1100 TEXT, HL_N_1150 TEXT, HL_N_1200 TEXT, HL_N_1250 TEXT, HL_N_1300 TEXT, HL_N_1350 TEXT, HL_N_1400 TEXT, HL_N_1450 TEXT, HL_N_1500 TEXT, HL_N_1550 TEXT, HL_N_1600 TEXT, HL_N_1650 TEXT, HL_N_1700 TEXT, HL_N_1750 TEXT, HL_N_1800 TEXT, HL_N_1850 TEXT, HL_N_1900 TEXT, HL_N_1950 TEXT, HL_N_2000 TEXT, HL_N_2050 TEXT, HL_N_2100 TEXT, HL_N_2150 TEXT, HL_N_2200 TEXT, HL_N_2250 TEXT, HL_N_2300 TEXT, HL_S_0250 TEXT, HL_S_0300 TEXT, HL_S_0350 TEXT, HL_S_0400 TEXT, HL_S_0450 TEXT, HL_S_0500 TEXT, HL_S_0550 TEXT, HL_S_0600 TEXT, HL_S_0650 TEXT, HL_S_0700 TEXT, HL_S_0750 TEXT, HL_S_0800 TEXT, HL_S_0850 TEXT, HL_S_0900 TEXT, HL_S_0950 TEXT, HL_S_1000 TEXT, HL_S_1050 TEXT, HL_S_1100 TEXT, HL_S_1150 TEXT, HL_S_1200 TEXT, HL_S_1250 TEXT, HL_S_1300 TEXT, HL_S_1350 TEXT, HL_S_1400 TEXT, HL_S_1450 TEXT, HL_S_1500 TEXT, HL_S_1550 TEXT, HL_S_1600 TEXT, HL_S_1650 TEXT, HL_S_1700 TEXT, HL_S_1750 TEXT, HL_S_1800 TEXT, HL_S_1850 TEXT, HL_S_1900 TEXT, HL_S_1950 TEXT, HL_S_2000 TEXT, HL_S_2050 TEXT, HL_S_2100 TEXT, HL_S_2150 TEXT, HL_S_2200 TEXT, HL_S_2250 TEXT, HL_S_2300 TEXT, HN_000_010 TEXT, HN_010_025 TEXT, HN_025_050 TEXT, HN_050_075 TEXT, HN_075_100 TEXT, HN_100 TEXT, HS_01b_01C_J TEXT, HS_01d_SM_J TEXT, HS_01e_UM_J TEXT, HS_01h_OM_J TEXT, HS_01i_HM_J TEXT, HS_02b_C_M TEXT, HS_02d_SM_M TEXT, HS_02e_UM_M TEXT, HS_02h_OM_M TEXT, HS_02i_HM_M TEXT, HS_03b_C_1 TEXT, HS_03d_SM_1 TEXT, HS_03e_UM_1 TEXT, HS_03h_OM_1 TEXT, HS_03i_HM_1 TEXT, HS_03m_SA_1 TEXT, HS_03n_OSA_1 TEXT, HS_04b_C_2a TEXT, HS_04d_SM_2a TEXT, HS_04e_UM_2a TEXT, HS_04h_OM_2a TEXT, HS_04i_HM_2a TEXT, HS_04m_SA_2a TEXT, HS_04n_OSA_2a TEXT, HS_05b_C_2b TEXT, HS_05i_HM_2b TEXT, HS_05j_HM_2b_bis1000m TEXT, HS_05k_HM_2b_ab1000m TEXT, HS_05m_SA_2b TEXT, HS_05n_OSA_2b TEXT, HS_06i_HM_3 TEXT, HS_06m_SA_3 TEXT, HS_06n_OSA_3 TEXT, HS_07b_C_4 TEXT, HS_07i_HM_4 TEXT, HS_07m_SA_4 TEXT, HS_07n_OSA_4 TEXT, HS_08a_HY_5a TEXT, HS_08b_C_5a TEXT, HS_08c_CB_5a TEXT, HS_08g_UMOM_5a TEXT, HS_08i_HM_5a TEXT, HS_08m_SA_5a TEXT, HS_08n_OSA_5a TEXT, HS_09a_HY_5b TEXT, HS_09c_CB_5b TEXT, HS_09g_UMOM_5b TEXT, HS_09m_SA_5b TEXT, HS_10a_HY_Me TEXT, HS_10c_CB_Me TEXT);

COPY NAT_LAGE
FROM '/data/nais/NAT_LAGE.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_NAIS_EIG_GR (NAIS_EIG_KEY TEXT, NAIS_EIG_TXT TEXT);

COPY NAT_NAIS_EIG_GR
FROM '/data/nais/NAT_NAIS_EIG_GR.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_NAISTYP_ART (NAISTYP_SORT TEXT, NAISTYP_C TEXT, ART TEXT, SISF_NR TEXT, VORH TEXT);

COPY NAT_NAISTYP_ART
FROM '/data/nais/NAT_NAISTYP_ART.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_NAISTYP_MSTR (NAISTYP_SORT TEXT, NAISTYP_C TEXT, NAISTYP_S20 TEXT, NAISTYP_NAME_LAT TEXT, NAISTYP_NAME_DEU TEXT, NAISTYP_NAMK_DEU TEXT, NAISTYP_NAME_FRZ TEXT, NAISTYP_NAMK_FRZ TEXT, NTYP_C_ANHANG2A TEXT, NTYP_C_BSCHR_SEP TEXT, NTYP_C_BSCHR_TI TEXT, NTYP_W_B_ETAP1 TEXT, NTYP_W_B_ETAP2 TEXT, NTYP_G_P_ETAP1 TEXT, NTYP_G_P_ETAP2 TEXT, NTYP_BS_ETAP1 TEXT, NTYP_BS_ETAP2 TEXT, NTYP_SSKSMS_ETA1 TEXT, NTYP_SSKSMS_ETA2 TEXT, NTYP_DELARZE08 TEXT, NTYP_C_ABGES TEXT, NTYP_C_GFX_ORT TEXT, NTYP_C_GFX_BODEN TEXT, NAISTYP_GFX TEXT, NAISTYP_WGES TEXT, NAISTYP_ANFP TEXT, NAISTYP_GFK TEXT, NAISTYP_GFEI TEXT, NAISTYP_GRB TEXT, NAISTYP_ANFP_05 TEXT, NAISTYP_BEM TEXT, NTYP_NATP_ABK TEXT, NTYP_NATP_BED TEXT);

COPY NAT_NAISTYP_MSTR
FROM '/data/nais/NAT_NAISTYP_MSTR.csv'
DELIMITER ';' CSV HEADER;


CREATE TABLE NAT_NAISTYP (NAISTYP_SORT TEXT, NAISTYP_C TEXT, NAISTYP_HAUPTVAR TEXT, NAISTYP_VAR TEXT, NAISTYP_NWLD TEXT, NAISTYP_NWLD_FR TEXT, NAISTYP_HDOM_MIN TEXT, NAISTYP_HDOM_MAX TEXT, NAISTYP_HMAX_NAD TEXT, NAISTYP_HMAX_LAU TEXT, NAISTYP_BEM4 TEXT, NAISTYP_STAO TEXT, NAISTYP_STAO_FR TEXT, NAISTYP_VASP TEXT, NAISTYP_VASP_FR TEXT, NAISTYP_HUMF TEXT, NAISTYP_ENT TEXT, NAISTYP_EIG TEXT, NAISTYP_EIG_FR TEXT, NTYP_KG_FEIN TEXT, NTYP_KG_GESTEIN TEXT, NAISTYP_KG_V TEXT, NAISTYP_KG_T_MIN TEXT, NAISTYP_KG_T_MAX TEXT, NTYP_AM_S TEXT, NTYP_AM_B TEXT, NTYP_RT_MITTELH TEXT, NTYP_RT_MULDE TEXT, NTYP_RT_KUPPE TEXT, NTYP_RT_PLATEAU TEXT, NTYP_RT_STEILH TEXT, NTYP_FELS TEXT, NTYP_BL_FELS_ST TEXT, NTYP_BL_FELS_WE TEXT, NTYP_BL_KARREN TEXT, NTYP_BL_SCHUTT_M TEXT, NTYP_BL_SCHUTT_S TEXT, NTYP_BL_SCHUTT_X TEXT, NTYP_STEINSCHLAG TEXT, NTYP_LAWINEN TEXT, NTYP_RUTSCHUNG TEXT, NTYP_EROSION TEXT, NTYP_WASS_BACH TEXT, NTYP_WASS_KLEIN TEXT, NTYP_WASS_QUELL TEXT, NTYP_WECHSELF TEXT, NAISTYP_GFX TEXT, ART_LNK_HG_NATW TEXT, ART_LNK_HG_HOE TEXT, ART_LNK_HG_STD TEXT, ART_LNK_HG_VEGA TEXT, ART_LNK_HG_MERKM TEXT, ART_LNK_HG_BS TEXT, ART_LNK_HG_SS TEXT, ART_LNK_HG_KS TEXT, ART_LNK_HG_MS TEXT, NAISTYP_OEG_HAWA TEXT, NAISTYP_OEB_HAWA TEXT, NAISTYP_OEG_SOWA TEXT, NAISTYP_OEB_SOWA TEXT, NAISTYP_OEG_WEFE TEXT, NAISTYP_OEB_WEFE TEXT, NAISTYP_OEG_AUE TEXT, NAISTYP_OEG_PIO TEXT, NAISTYP_ANFE TEXT, NAISTYP_OEG_GEB TEXT);

COPY NAT_NAISTYP
FROM '/data/nais/NAT_NAISTYP.csv'
DELIMITER ';' CSV HEADER;
