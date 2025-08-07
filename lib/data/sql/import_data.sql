-- ########### NAIS ###########
CREATE TABLE Baumarteninformationen (
  Naistyp TEXT, Gebietsfremd TEXT, Krankheitsgefaehrdet TEXT, 
  Code TEXT
);
COPY Baumarteninformationen 
FROM 
  '/data/nais/Baumarteninformationen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE Bodeninformationen (
  Feld_Nr TEXT, 
  Feld_Name TEXT, 
  FT1 TEXT, 
  FT1h TEXT, 
  FT2 TEXT, 
  FT3 TEXT, 
  FT3s TEXT, 
  FT3LV TEXT, 
  FT3L4L TEXT, 
  FT3Stern TEXT, 
  FT4 TEXT, 
  FT4Stern TEXT, 
  FT6 TEXT, 
  FT7S TEXT, 
  FT7a TEXT, 
  FT7Stern TEXT, 
  FT8S TEXT, 
  FT8a TEXT, 
  FT8d TEXT, 
  FT8Stern TEXT, 
  FT9a TEXT, 
  FT9w TEXT, 
  FT10a TEXT, 
  FT10w TEXT, 
  FT11 TEXT, 
  FT12Stern TEXT, 
  FT12S TEXT, 
  FT12a TEXT, 
  FT12e TEXT, 
  FT12Sternh TEXT, 
  FT12w TEXT, 
  FT13a TEXT, 
  FT13e TEXT, 
  FT13eh TEXT, 
  FT13h TEXT, 
  FT13Stern TEXT, 
  FT14 TEXT, 
  FT14Stern TEXT, 
  FT15 TEXT, 
  FT16 TEXT, 
  FT16Stern TEXT, 
  FT17 TEXT, 
  FT18 TEXT, 
  FT18M TEXT, 
  FT18w TEXT, 
  FT18v TEXT, 
  FT18Stern TEXT, 
  FT19 TEXT, 
  FT19L TEXT, 
  FT19P TEXT, 
  FT19a TEXT, 
  FT19f TEXT, 
  FT20 TEXT, 
  FT20E TEXT, 
  FT21 TEXT, 
  FT21L TEXT, 
  FT21Stern TEXT, 
  FT22 TEXT, 
  FT22A TEXT, 
  FT22C TEXT, 
  FT22Stern TEXT, 
  FT23 TEXT, 
  FT23H TEXT, 
  FT23Stern TEXT, 
  FT24Stern TEXT, 
  FT25 TEXT, 
  FT25O TEXT, 
  FT25_A TEXT, 
  FT25a TEXT, 
  FT25b TEXT, 
  FT25e TEXT, 
  FT25f TEXT, 
  FT25Q TEXT, 
  FT25au TEXT, 
  FT25Stern TEXT, 
  FT26 TEXT, 
  FT26h TEXT, 
  FT26w TEXT, 
  FT27 TEXT, 
  FT27O TEXT, 
  FT27h TEXT, 
  FT27Stern TEXT, 
  FT28 TEXT, 
  FT29 TEXT, 
  FT29A TEXT, 
  FT29C TEXT, 
  FT29h TEXT, 
  FT30 TEXT, 
  FT31 TEXT, 
  FT32C TEXT, 
  FT32S TEXT, 
  FT32V TEXT, 
  FT32Stern TEXT, 
  FT33V TEXT, 
  FT33a TEXT, 
  FT33b TEXT, 
  FT33m TEXT, 
  FT34a TEXT, 
  FT34b TEXT, 
  FT34Stern TEXT, 
  FT35 TEXT, 
  FT35M TEXT, 
  FT35Q TEXT, 
  FT35S TEXT, 
  FT35A TEXT, 
  FT36 TEXT, 
  FT37 TEXT, 
  FT38 TEXT, 
  FT38S TEXT, 
  FT38Stern TEXT, 
  FT39 TEXT, 
  FT39Stern TEXT, 
  FT40P TEXT, 
  FT40PBl TEXT, 
  FT40Stern TEXT, 
  FT41 TEXT, 
  FT41Stern TEXT, 
  FT42C TEXT, 
  FT42Q TEXT, 
  FT42V TEXT, 
  FT42r TEXT, 
  FT42B TEXT, 
  FT42t TEXT, 
  FT43 TEXT, 
  FT43S TEXT, 
  FT43Stern TEXT, 
  FT44 TEXT, 
  FT45 TEXT, 
  FT46 TEXT, 
  FT46M TEXT, 
  FT46t TEXT, 
  FT46Stern TEXT, 
  FT47 TEXT, 
  FT47D TEXT, 
  FT47M TEXT, 
  FT47H TEXT, 
  FT47Stern TEXT, 
  FT48 TEXT, 
  FT49 TEXT, 
  FT49Stern TEXT, 
  FT50 TEXT, 
  FT50P TEXT, 
  FT50Stern TEXT, 
  FT51 TEXT, 
  FT51C TEXT, 
  FT52 TEXT, 
  FT52T TEXT, 
  FT53 TEXT, 
  FT53Stern TEXT, 
  FT53A TEXT, 
  FT54 TEXT, 
  FT54A TEXT, 
  FT55 TEXT, 
  FT55Stern TEXT, 
  FT56 TEXT, 
  FT57Bl TEXT, 
  FT57C TEXT, 
  FT57M TEXT, 
  FT57S TEXT, 
  FT57V TEXT, 
  FT57VM TEXT, 
  FT58 TEXT, 
  FT58Bl TEXT, 
  FT58C TEXT, 
  FT58L TEXT, 
  FT59 TEXT, 
  FT59A TEXT, 
  FT59C TEXT, 
  FT59E TEXT, 
  FT59H TEXT, 
  FT59J TEXT, 
  FT59L TEXT, 
  FT59R TEXT, 
  FT59S TEXT, 
  FT59V TEXT, 
  FT59Stern TEXT, 
  FT60 TEXT, 
  FT60A TEXT, 
  FT60E TEXT, 
  FT60Stern TEXT, 
  FT61 TEXT, 
  FT62 TEXT, 
  FT65 TEXT, 
  FT65Stern TEXT, 
  FT66 TEXT, 
  FT66PM TEXT, 
  FT67 TEXT, 
  FT68 TEXT, 
  FT68Stern TEXT, 
  FT69 TEXT, 
  FT70 TEXT, 
  FT71 TEXT, 
  FT72 TEXT, 
  FT91 TEXT, 
  FT92a TEXT, 
  FT92z TEXT, 
  FT93 TEXT, 
  FTAV TEXT
);
COPY Bodeninformationen 
FROM 
  '/data/nais/Bodeninformationen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_ARTEN_BAUM (
  SISF_NR TEXT, ART_SCHICHT_STD TEXT, 
  ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, 
  ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, 
  ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, 
  ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, 
  ART_REGION_M TEXT, ART_REGION_1 TEXT, 
  ART_REGION_2A TEXT, ART_REGION_2B TEXT, 
  ART_REGION_3 TEXT, ART_REGION_4 TEXT, 
  ART_REGION_5A TEXT, ART_REGION_5AA TEXT, 
  ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, 
  ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT, 
  ART_PIONIER TEXT, ART_GFA TEXT, ART_KAA TEXT, 
  ART_LA_BAFU TEXT
);
COPY NAT_ARTEN_BAUM 
FROM 
  '/data/nais/NAT_ARTEN_BAUM.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_ARTEN_KRAUT (
  SISF_NR TEXT, ART_SCHICHT_STD TEXT, 
  ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, 
  ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, 
  ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, 
  ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, 
  ART_REGION_M TEXT, ART_REGION_1 TEXT, 
  ART_REGION_2A TEXT, ART_REGION_2B TEXT, 
  ART_REGION_3 TEXT, ART_REGION_4 TEXT, 
  ART_REGION_5A TEXT, ART_REGION_5AA TEXT, 
  ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, 
  ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT
);
COPY NAT_ARTEN_KRAUT 
FROM 
  '/data/nais/NAT_ARTEN_KRAUT.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_ARTEN_MOOS (
  SISF_NR TEXT, ART_SCHICHT_STD TEXT, 
  ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, 
  ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, 
  ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, 
  ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, 
  ART_REGION_M TEXT, ART_REGION_1 TEXT, 
  ART_REGION_2A TEXT, ART_REGION_2B TEXT, 
  ART_REGION_3 TEXT, ART_REGION_4 TEXT, 
  ART_REGION_5A TEXT, ART_REGION_5AA TEXT, 
  ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, 
  ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT
);
COPY NAT_ARTEN_MOOS 
FROM 
  '/data/nais/NAT_ARTEN_MOOS.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_ARTEN_MSTR (
  SISF_NR TEXT, ART_NAM_LAT TEXT, ART_NAM_DEU TEXT, 
  ART_NAM_FRZ TEXT, ART_NAM_ITA TEXT, 
  ART_SCHICHT_BS_S TEXT, ART_SCHICHT_BS_A TEXT, 
  ART_SCHICHT_SS_S TEXT, ART_SCHICHT_SS_A TEXT, 
  ART_SCHICHT_KS_S TEXT, ART_SCHICHT_KS_A TEXT, 
  ART_SCHICHT_MS_S TEXT, ART_SCHICHT_MS_A TEXT, 
  ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, 
  ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, 
  ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, 
  ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, 
  ART_REGION_M TEXT, ART_REGION_1 TEXT, 
  ART_REGION_2A TEXT, ART_REGION_2B TEXT, 
  ART_REGION_3 TEXT, ART_REGION_4 TEXT, 
  ART_REGION_5A TEXT, ART_REGION_5AA TEXT, 
  ART_REGION_5B TEXT, ART_EIG_GRP TEXT, 
  ART_ZEIG_DET TEXT, ART_ZEIG_FLO TEXT, 
  ART_LEBENSR TEXT, ART_EINGEF TEXT, 
  ART_ACHTUNG TEXT, ART_EIN_ZEIK TEXT, 
  ART_ERK_ZEIK TEXT
);
COPY NAT_ARTEN_MSTR 
FROM 
  '/data/nais/NAT_ARTEN_MSTR.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_ARTEN_STRAUCH (
  SISF_NR TEXT, ART_SCHICHT_STD TEXT, 
  ART_HS_COLLIN TEXT, ART_HS_SUBMONTAN TEXT, 
  ART_HS_UNTERMONT TEXT, ART_HS_OBERMONT TEXT, 
  ART_HS_HOCHMONT TEXT, ART_HS_SUBALPIN TEXT, 
  ART_HS_OBSUBALP TEXT, ART_REGION_J TEXT, 
  ART_REGION_M TEXT, ART_REGION_1 TEXT, 
  ART_REGION_2A TEXT, ART_REGION_2B TEXT, 
  ART_REGION_3 TEXT, ART_REGION_4 TEXT, 
  ART_REGION_5A TEXT, ART_REGION_5AA TEXT, 
  ART_REGION_5B TEXT, ART_ZEIG_DET TEXT, 
  ART_ZEIG_FLO TEXT, ART_LEBENSR TEXT
);
COPY NAT_ARTEN_STRAUCH 
FROM 
  '/data/nais/NAT_ARTEN_STRAUCH.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_BAUM_COLLIN (
  REGION TEXT, NAISTYP_SORT TEXT, NAISTYP TEXT, 
  SISF_NR TEXT, VORH TEXT, QUELLE_BA TEXT
);
COPY NAT_BAUM_COLLIN 
FROM 
  '/data/nais/NAT_BAUM_COLLIN.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_BODEN (
  NAISTYP_SORT TEXT, 
  AM_B TEXT, 
  AM_S TEXT, 
  BE_Braunerd_norm TEXT, 
  BE_Braunerd_podso TEXT, 
  BE_Braunerd_vernaesst TEXT, 
  BE_GestRohB TEXT, 
  BE_Grundw_nassgebl TEXT, 
  BE_Grundw_norm TEXT, 
  BE_Parabraunerd_norm TEXT, 
  BE_Parabraunerd_podso TEXT, 
  BE_Parabraunerd_vernaesst TEXT, 
  BE_Pararendz_norm TEXT, 
  BE_Pararendz_verbraunt TEXT, 
  BE_Pararendz_vernaesst TEXT, 
  BE_Podsol_norm TEXT, 
  BE_Podsol_vernaesst TEXT, 
  BE_Ranker_norm TEXT, 
  BE_Ranker_verbraunt TEXT, 
  BE_Ranker_vernaesst TEXT, 
  BE_Regosol_norm TEXT, 
  BE_Regosol_verbraunt TEXT, 
  BE_Regosol_vernaesst TEXT, 
  BE_Rendz_norm TEXT, 
  BE_Rendz_verbraunt TEXT, 
  BE_Rendz_vernaesst TEXT, 
  BE_Stauw_nassgebl TEXT, 
  BE_Stauw_norm TEXT, 
  BE_V_Auenb TEXT, 
  BE_V_Braunpod TEXT, 
  BE_V_Humuspod TEXT, 
  BE_V_OrgB TEXT, 
  BE_V_neutrBraune TEXT, 
  GS_01 TEXT, 
  GS_02 TEXT, 
  GS_03 TEXT, 
  GS_04 TEXT, 
  GS_05 TEXT, 
  GS_06 TEXT, 
  GS_07 TEXT, 
  GS_08 TEXT, 
  GS_09 TEXT, 
  GS_10 TEXT, 
  GS_11 TEXT, 
  GS_12 TEXT, 
  GS_13 TEXT, 
  GS_14 TEXT, 
  GS_15 TEXT, 
  GS_16 TEXT, 
  GS_17 TEXT, 
  GS_18 TEXT, 
  GS_19 TEXT, 
  GS_20 TEXT, 
  GS_21 TEXT, 
  GS_22 TEXT, 
  GS_23 TEXT, 
  GS_24 TEXT, 
  GS_25 TEXT, 
  GS_26 TEXT, 
  GS_27 TEXT, 
  GS_28 TEXT, 
  GS_29 TEXT, 
  GS_30 TEXT, 
  GS_31 TEXT, 
  GS_32 TEXT, 
  GS_33 TEXT, 
  GS_34 TEXT, 
  GS_35 TEXT, 
  GS_36 TEXT, 
  HUF_V_Anmoor TEXT, 
  HUF_V_Kalkmoder TEXT, 
  HUF_V_Kalkmull TEXT, 
  HUF_V_Tangel TEXT, 
  HUF_V_Torf TEXT, 
  HUF_V_erod TEXT, 
  HUF_mo_mull_hydro TEXT, 
  HUF_mo_mull_norm TEXT, 
  HUF_mo_mull_xero TEXT, 
  HUF_mo_rh_hydro TEXT, 
  HUF_mo_rh_norm TEXT, 
  HUF_mo_rh_xero TEXT, 
  HUF_mo_typ_hydro TEXT, 
  HUF_mo_typ_norm TEXT, 
  HUF_mo_typ_xero TEXT, 
  HUF_mu_f_hydro TEXT, 
  HUF_mu_f_norm TEXT, 
  HUF_mu_f_xero TEXT, 
  HUF_mu_l_hydro TEXT, 
  HUF_mu_l_norm TEXT, 
  HUF_mu_l_xero TEXT, 
  HUF_rh_hydro TEXT, 
  HUF_rh_norm TEXT, 
  HUF_rh_xero TEXT, 
  KO_IS TEXT, 
  KO_L TEXT, 
  KO_S TEXT, 
  KO_T TEXT, 
  KO_U TEXT, 
  KO_lT TEXT, 
  KO_lU TEXT, 
  KO_sL TEXT, 
  KO_tL TEXT, 
  KO_tU TEXT, 
  WVG_01 TEXT, 
  WVG_02 TEXT, 
  WVG_03 TEXT, 
  WVG_04 TEXT, 
  WVG_05 TEXT, 
  WVG_06 TEXT, 
  WVG_07 TEXT, 
  WVG_08 TEXT, 
  WVG_09 TEXT, 
  WVG_10 TEXT, 
  WVG_11 TEXT, 
  WVG_12 TEXT, 
  WVG_13 TEXT, 
  WVG_14 TEXT, 
  WVG_15 TEXT, 
  WVG_16 TEXT, 
  WVG_17 TEXT, 
  WVG_18 TEXT, 
  WVG_19 TEXT, 
  WVG_20 TEXT, 
  WVG_21 TEXT, 
  WVG_22 TEXT, 
  WVG_23 TEXT, 
  WVG_24 TEXT, 
  WVG_25 TEXT, 
  WVG_26 TEXT, 
  WVG_27 TEXT, 
  WVG_28 TEXT, 
  WVG_29 TEXT, 
  WVG_30 TEXT, 
  WVG_31 TEXT, 
  WVG_32 TEXT, 
  WVG_33 TEXT, 
  WVG_34 TEXT, 
  WVG_35 TEXT, 
  WVG_36 TEXT, 
  WVS_01 TEXT, 
  WVS_02 TEXT, 
  WVS_03 TEXT, 
  WVS_04 TEXT, 
  WVS_05 TEXT, 
  WVS_06 TEXT, 
  WVS_07 TEXT, 
  WVS_08 TEXT, 
  WVS_09 TEXT, 
  WVS_10 TEXT, 
  WVS_11 TEXT, 
  WVS_12 TEXT, 
  WVS_13 TEXT, 
  WVS_14 TEXT, 
  WVS_15 TEXT, 
  WVS_16 TEXT, 
  WVS_17 TEXT, 
  WVS_18 TEXT, 
  WVS_19 TEXT, 
  WVS_20 TEXT, 
  WVS_21 TEXT, 
  WVS_22 TEXT, 
  WVS_23 TEXT, 
  WVS_24 TEXT, 
  WVS_25 TEXT, 
  WVS_26 TEXT, 
  WVS_27 TEXT, 
  WVS_28 TEXT, 
  WVS_29 TEXT, 
  WVS_30 TEXT, 
  WVS_31 TEXT, 
  WVS_32 TEXT, 
  WVS_33 TEXT, 
  WVS_34 TEXT, 
  WVS_35 TEXT, 
  WVS_36 TEXT, 
  WVS_37 TEXT, 
  WVS_38 TEXT, 
  WVS_39 TEXT, 
  WVS_40 TEXT, 
  WVS_41 TEXT, 
  WVS_42 TEXT
);
COPY NAT_BODEN 
FROM 
  '/data/nais/NAT_BODEN.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_LAGE (
  NAISTYP_SORT TEXT, 
  E_001_025_n_nne TEXT, 
  E_026_050_nne_ne TEXT, 
  E_051_075_ne_ene TEXT, 
  E_076_100_ene_e TEXT, 
  E_101_125_e_see TEXT, 
  E_126_150_see_se TEXT, 
  E_151_175_se_sse TEXT, 
  E_176_200_ss_s TEXT, 
  E_201_225_s_ssw TEXT, 
  E_226_250_ssw_sw TEXT, 
  E_251_275_sw_wsw TEXT, 
  E_276_300_wsw_w TEXT, 
  E_301_325_w_wnw TEXT, 
  E_326_350_wnw_nw TEXT, 
  E_351_375_nw_nnww TEXT, 
  E_376_400_nnw_n TEXT, 
  HL_EW_0250 TEXT, 
  HL_EW_0300 TEXT, 
  HL_EW_0350 TEXT, 
  HL_EW_0400 TEXT, 
  HL_EW_0450 TEXT, 
  HL_EW_0500 TEXT, 
  HL_EW_0550 TEXT, 
  HL_EW_0600 TEXT, 
  HL_EW_0650 TEXT, 
  HL_EW_0700 TEXT, 
  HL_EW_0750 TEXT, 
  HL_EW_0800 TEXT, 
  HL_EW_0850 TEXT, 
  HL_EW_0900 TEXT, 
  HL_EW_0950 TEXT, 
  HL_EW_1000 TEXT, 
  HL_EW_1050 TEXT, 
  HL_EW_1100 TEXT, 
  HL_EW_1150 TEXT, 
  HL_EW_1200 TEXT, 
  HL_EW_1250 TEXT, 
  HL_EW_1300 TEXT, 
  HL_EW_1350 TEXT, 
  HL_EW_1400 TEXT, 
  HL_EW_1450 TEXT, 
  HL_EW_1500 TEXT, 
  HL_EW_1550 TEXT, 
  HL_EW_1600 TEXT, 
  HL_EW_1650 TEXT, 
  HL_EW_1700 TEXT, 
  HL_EW_1750 TEXT, 
  HL_EW_1800 TEXT, 
  HL_EW_1850 TEXT, 
  HL_EW_1900 TEXT, 
  HL_EW_1950 TEXT, 
  HL_EW_2000 TEXT, 
  HL_EW_2050 TEXT, 
  HL_EW_2100 TEXT, 
  HL_EW_2150 TEXT, 
  HL_EW_2200 TEXT, 
  HL_EW_2250 TEXT, 
  HL_EW_2300 TEXT, 
  HL_N_0250 TEXT, 
  HL_N_0300 TEXT, 
  HL_N_0350 TEXT, 
  HL_N_0400 TEXT, 
  HL_N_0450 TEXT, 
  HL_N_0500 TEXT, 
  HL_N_0550 TEXT, 
  HL_N_0600 TEXT, 
  HL_N_0650 TEXT, 
  HL_N_0700 TEXT, 
  HL_N_0750 TEXT, 
  HL_N_0800 TEXT, 
  HL_N_0850 TEXT, 
  HL_N_0900 TEXT, 
  HL_N_0950 TEXT, 
  HL_N_1000 TEXT, 
  HL_N_1050 TEXT, 
  HL_N_1100 TEXT, 
  HL_N_1150 TEXT, 
  HL_N_1200 TEXT, 
  HL_N_1250 TEXT, 
  HL_N_1300 TEXT, 
  HL_N_1350 TEXT, 
  HL_N_1400 TEXT, 
  HL_N_1450 TEXT, 
  HL_N_1500 TEXT, 
  HL_N_1550 TEXT, 
  HL_N_1600 TEXT, 
  HL_N_1650 TEXT, 
  HL_N_1700 TEXT, 
  HL_N_1750 TEXT, 
  HL_N_1800 TEXT, 
  HL_N_1850 TEXT, 
  HL_N_1900 TEXT, 
  HL_N_1950 TEXT, 
  HL_N_2000 TEXT, 
  HL_N_2050 TEXT, 
  HL_N_2100 TEXT, 
  HL_N_2150 TEXT, 
  HL_N_2200 TEXT, 
  HL_N_2250 TEXT, 
  HL_N_2300 TEXT, 
  HL_S_0250 TEXT, 
  HL_S_0300 TEXT, 
  HL_S_0350 TEXT, 
  HL_S_0400 TEXT, 
  HL_S_0450 TEXT, 
  HL_S_0500 TEXT, 
  HL_S_0550 TEXT, 
  HL_S_0600 TEXT, 
  HL_S_0650 TEXT, 
  HL_S_0700 TEXT, 
  HL_S_0750 TEXT, 
  HL_S_0800 TEXT, 
  HL_S_0850 TEXT, 
  HL_S_0900 TEXT, 
  HL_S_0950 TEXT, 
  HL_S_1000 TEXT, 
  HL_S_1050 TEXT, 
  HL_S_1100 TEXT, 
  HL_S_1150 TEXT, 
  HL_S_1200 TEXT, 
  HL_S_1250 TEXT, 
  HL_S_1300 TEXT, 
  HL_S_1350 TEXT, 
  HL_S_1400 TEXT, 
  HL_S_1450 TEXT, 
  HL_S_1500 TEXT, 
  HL_S_1550 TEXT, 
  HL_S_1600 TEXT, 
  HL_S_1650 TEXT, 
  HL_S_1700 TEXT, 
  HL_S_1750 TEXT, 
  HL_S_1800 TEXT, 
  HL_S_1850 TEXT, 
  HL_S_1900 TEXT, 
  HL_S_1950 TEXT, 
  HL_S_2000 TEXT, 
  HL_S_2050 TEXT, 
  HL_S_2100 TEXT, 
  HL_S_2150 TEXT, 
  HL_S_2200 TEXT, 
  HL_S_2250 TEXT, 
  HL_S_2300 TEXT, 
  HN_000_010 TEXT, 
  HN_010_025 TEXT, 
  HN_025_050 TEXT, 
  HN_050_075 TEXT, 
  HN_075_100 TEXT, 
  HN_100 TEXT, 
  HS_01b_01C_J TEXT, 
  HS_01d_SM_J TEXT, 
  HS_01e_UM_J TEXT, 
  HS_01h_OM_J TEXT, 
  HS_01i_HM_J TEXT, 
  HS_02b_C_M TEXT, 
  HS_02d_SM_M TEXT, 
  HS_02e_UM_M TEXT, 
  HS_02h_OM_M TEXT, 
  HS_02i_HM_M TEXT, 
  HS_03b_C_1 TEXT, 
  HS_03d_SM_1 TEXT, 
  HS_03e_UM_1 TEXT, 
  HS_03h_OM_1 TEXT, 
  HS_03i_HM_1 TEXT, 
  HS_03m_SA_1 TEXT, 
  HS_03n_OSA_1 TEXT, 
  HS_04b_C_2a TEXT, 
  HS_04d_SM_2a TEXT, 
  HS_04e_UM_2a TEXT, 
  HS_04h_OM_2a TEXT, 
  HS_04i_HM_2a TEXT, 
  HS_04m_SA_2a TEXT, 
  HS_04n_OSA_2a TEXT, 
  HS_05b_C_2b TEXT, 
  HS_05i_HM_2b TEXT, 
  HS_05j_HM_2b_bis1000m TEXT, 
  HS_05k_HM_2b_ab1000m TEXT, 
  HS_05m_SA_2b TEXT, 
  HS_05n_OSA_2b TEXT, 
  HS_06i_HM_3 TEXT, 
  HS_06m_SA_3 TEXT, 
  HS_06n_OSA_3 TEXT, 
  HS_07b_C_4 TEXT, 
  HS_07i_HM_4 TEXT, 
  HS_07m_SA_4 TEXT, 
  HS_07n_OSA_4 TEXT, 
  HS_08a_HY_5a TEXT, 
  HS_08b_C_5a TEXT, 
  HS_08c_CB_5a TEXT, 
  HS_08g_UMOM_5a TEXT, 
  HS_08i_HM_5a TEXT, 
  HS_08m_SA_5a TEXT, 
  HS_08n_OSA_5a TEXT, 
  HS_09a_HY_5b TEXT, 
  HS_09c_CB_5b TEXT, 
  HS_09g_UMOM_5b TEXT, 
  HS_09m_SA_5b TEXT, 
  HS_10a_HY_Me TEXT, 
  HS_10c_CB_Me TEXT
);
COPY NAT_LAGE 
FROM 
  '/data/nais/NAT_LAGE.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_NAIS_EIG_GR (
  NAIS_EIG_KEY TEXT, NAIS_EIG_TXT TEXT
);
COPY NAT_NAIS_EIG_GR 
FROM 
  '/data/nais/NAT_NAIS_EIG_GR.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_NAISTYP_ART (
  NAISTYP_SORT TEXT, NAISTYP_C TEXT, 
  ART TEXT, SISF_NR TEXT, VORH TEXT
);
COPY NAT_NAISTYP_ART 
FROM 
  '/data/nais/NAT_NAISTYP_ART.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_NAISTYP_MSTR (
  NAISTYP_SORT TEXT, NAISTYP_C TEXT, 
  NAISTYP_S20 TEXT, NAISTYP_NAME_LAT TEXT, 
  NAISTYP_NAME_DEU TEXT, NAISTYP_NAMK_DEU TEXT, 
  NAISTYP_NAME_FRZ TEXT, NAISTYP_NAMK_FRZ TEXT, 
  NTYP_C_ANHANG2A TEXT, NTYP_C_BSCHR_SEP TEXT, 
  NTYP_C_BSCHR_TI TEXT, NTYP_W_B_ETAP1 TEXT, 
  NTYP_W_B_ETAP2 TEXT, NTYP_G_P_ETAP1 TEXT, 
  NTYP_G_P_ETAP2 TEXT, NTYP_BS_ETAP1 TEXT, 
  NTYP_BS_ETAP2 TEXT, NTYP_SSKSMS_ETA1 TEXT, 
  NTYP_SSKSMS_ETA2 TEXT, NTYP_DELARZE08 TEXT, 
  NTYP_C_ABGES TEXT, NTYP_C_GFX_ORT TEXT, 
  NTYP_C_GFX_BODEN TEXT, NAISTYP_GFX TEXT, 
  NAISTYP_WGES TEXT, NAISTYP_ANFP TEXT, 
  NAISTYP_GFK TEXT, NAISTYP_GFEI TEXT, 
  NAISTYP_GRB TEXT, NAISTYP_ANFP_05 TEXT, 
  NAISTYP_BEM TEXT, NTYP_NATP_ABK TEXT, 
  NTYP_NATP_BED TEXT
);
COPY NAT_NAISTYP_MSTR 
FROM 
  '/data/nais/NAT_NAISTYP_MSTR.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE NAT_NAISTYP (
  NAISTYP_SORT TEXT, NAISTYP_C TEXT, 
  NAISTYP_HAUPTVAR TEXT, NAISTYP_VAR TEXT, 
  NAISTYP_NWLD TEXT, NAISTYP_NWLD_FR TEXT, 
  NAISTYP_HDOM_MIN TEXT, NAISTYP_HDOM_MAX TEXT, 
  NAISTYP_HMAX_NAD TEXT, NAISTYP_HMAX_LAU TEXT, 
  NAISTYP_BEM4 TEXT, NAISTYP_STAO TEXT, 
  NAISTYP_STAO_FR TEXT, NAISTYP_VASP TEXT, 
  NAISTYP_VASP_FR TEXT, NAISTYP_HUMF TEXT, 
  NAISTYP_ENT TEXT, NAISTYP_EIG TEXT, 
  NAISTYP_EIG_FR TEXT, NTYP_KG_FEIN TEXT, 
  NTYP_KG_GESTEIN TEXT, NAISTYP_KG_V TEXT, 
  NAISTYP_KG_T_MIN TEXT, NAISTYP_KG_T_MAX TEXT, 
  NTYP_AM_S TEXT, NTYP_AM_B TEXT, NTYP_RT_MITTELH TEXT, 
  NTYP_RT_MULDE TEXT, NTYP_RT_KUPPE TEXT, 
  NTYP_RT_PLATEAU TEXT, NTYP_RT_STEILH TEXT, 
  NTYP_FELS TEXT, NTYP_BL_FELS_ST TEXT, 
  NTYP_BL_FELS_WE TEXT, NTYP_BL_KARREN TEXT, 
  NTYP_BL_SCHUTT_M TEXT, NTYP_BL_SCHUTT_S TEXT, 
  NTYP_BL_SCHUTT_X TEXT, NTYP_STEINSCHLAG TEXT, 
  NTYP_LAWINEN TEXT, NTYP_RUTSCHUNG TEXT, 
  NTYP_EROSION TEXT, NTYP_WASS_BACH TEXT, 
  NTYP_WASS_KLEIN TEXT, NTYP_WASS_QUELL TEXT, 
  NTYP_WECHSELF TEXT, NAISTYP_GFX TEXT, 
  ART_LNK_HG_NATW TEXT, ART_LNK_HG_HOE TEXT, 
  ART_LNK_HG_STD TEXT, ART_LNK_HG_VEGA TEXT, 
  ART_LNK_HG_MERKM TEXT, ART_LNK_HG_BS TEXT, 
  ART_LNK_HG_SS TEXT, ART_LNK_HG_KS TEXT, 
  ART_LNK_HG_MS TEXT, NAISTYP_OEG_HAWA TEXT, 
  NAISTYP_OEB_HAWA TEXT, NAISTYP_OEG_SOWA TEXT, 
  NAISTYP_OEB_SOWA TEXT, NAISTYP_OEG_WEFE TEXT, 
  NAISTYP_OEB_WEFE TEXT, NAISTYP_OEG_AUE TEXT, 
  NAISTYP_OEG_PIO TEXT, NAISTYP_ANFE TEXT, 
  NAISTYP_OEG_GEB TEXT
);
COPY NAT_NAISTYP 
FROM 
  '/data/nais/NAT_NAISTYP.csv' DELIMITER ';' CSV HEADER;



-- ########### PROFILES ###########
-- Luzern
CREATE TABLE lu_standorttypen (
  STO_Nr TEXT, STO_DEU TEXT, STO_LAT TEXT, 
  EIGNUNG TEXT, WB_VERJ_ENT TEXT, WB_PFL TEXT, 
  BESCHREIBUNG TEXT, HOEHENVERBREITUNG TEXT, 
  VEGETATION TEXT, VORWALDBAUMARTEN TEXT, 
  GESGR_Nr TEXT, VERDRISK TEXT, PRIORITAET TEXT
);
COPY lu_standorttypen 
FROM 
  '/data/profiles/lu/standorttypen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE lu_gesellschaftsgruppen (
  GESGR_Nr TEXT, GESGR_DEU TEXT, GESGRUPPE_LAT TEXT, 
  BESCHREIBUNG TEXT, STANDORT TEXT, 
  BODEN TEXT, EIGNUNG_BEDEUTUNG TEXT, 
  HOEHENVERBREITUNG TEXT
);
COPY lu_gesellschaftsgruppen 
FROM 
  '/data/profiles/lu/gesellschaftsgruppen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE lu_artengruppen (
  STO_Nr TEXT, A TEXT, B TEXT, C TEXT, E TEXT, 
  F TEXT, G TEXT, H TEXT, I TEXT, J TEXT, 
  K TEXT, L TEXT, M TEXT, N TEXT, O TEXT, 
  P TEXT, BEMERKUNG TEXT, GESGR_Nr TEXT
);
COPY lu_artengruppen 
FROM 
  '/data/profiles/lu/artengruppen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE lu_boden (
  STO_Nr TEXT, L TEXT, F TEXT, H TEXT, Ahh TEXT, 
  Ah TEXT, BASEN TEXT, FEUCHTE TEXT, BESONDERHEITEN TEXT, 
  BEMERKUNG TEXT, GESGR_Nr TEXT
);
COPY lu_boden 
FROM 
  '/data/profiles/lu/boden.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE lu_expo_hanglage (
  STO_Nr TEXT, NNO_12 INT, NNO_25 INT, 
  NNO_37 INT, NNO_50 INT, NNO_62 INT, 
  NNO_75 INT, NNO_87 INT, NNO_100 INT, 
  NOO_12 INT, NOO_25 INT, NOO_37 INT, 
  NOO_50 INT, NOO_62 INT, NOO_75 INT, 
  NOO_87 INT, NOO_100 INT, OSO_12 INT, 
  OSO_25 INT, OSO_37 INT, OSO_50 INT, 
  OSO_62 INT, OSO_75 INT, OSO_87 INT, 
  OSO_100 INT, SSO_12 INT, SSO_25 INT, 
  SSO_37 INT, SSO_50 INT, SSO_62 INT, 
  SSO_75 INT, SSO_87 INT, SSO_100 INT, 
  SSW_12 INT, SSW_25 INT, SSW_37 INT, 
  SSW_50 INT, SSW_62 INT, SSW_75 INT, 
  SSW_87 INT, SSW_100 INT, WSW_12 INT, 
  WSW_25 INT, WSW_37 INT, WSW_50 INT, 
  WSW_62 INT, WSW_75 INT, WSW_87 INT, 
  WSW_100 INT, WNW_12 INT, WNW_25 INT, 
  WNW_37 INT, WNW_50 INT, WNW_62 INT, 
  WNW_75 INT, WNW_87 INT, WNW_100 INT, 
  NNW_12 INT, NNW_25 INT, NNW_37 INT, 
  NNW_50 INT, NNW_62 INT, NNW_75 INT, 
  NNW_87 INT, NNW_100 INT
);
COPY lu_expo_hanglage 
FROM 
  '/data/profiles/lu/exposition_hanglage.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE lu_bestockung (
  STO_Nr TEXT, Kategorie TEXT, Fi TEXT, 
  Ta TEXT, WFö TEXT, BFö TEXT, Ei TEXT, 
  Lä TEXT, Dg TEXT, Bu TEXT, Es TEXT, BAh TEXT, 
  SAh TEXT, SEi TEXT, TEi TEXT, WLi TEXT, 
  SLi TEXT, Ki TEXT, BUl TEXT, FUl TEXT, 
  SEr TEXT, GEr TEXT, AEr TEXT, HBi TEXT, 
  TKi TEXT, VBe TEXT, MBe TEXT, Wei TEXT, 
  Lbh_min TEXT, Lbh_opt TEXT, Ta_min TEXT, 
  Ta_opt TEXT, GESGR_Nr TEXT
);
COPY lu_bestockung 
FROM 
  '/data/profiles/lu/bestockung.csv' DELIMITER ';' CSV HEADER;

-- Basel
CREATE TABLE bl_standorttypen (
  STO_Nr TEXT, STO_DEU TEXT, STO_LAT TEXT, 
  EIGENSCHAFTEN TEXT, BESTOCKUNGSZIELE TEXT, 
  WB_VERJ_ENT TEXT, WB_PFL TEXT, BESCHRIEB_NATURWALD TEXT, 
  HOEHENVERBREITUNG TEXT, STANDORT TEXT, 
  GEOLOGIE TEXT, VEGETATION TEXT, UEBERGAENGE_ZU TEXT
);
COPY bl_standorttypen 
FROM 
  '/data/profiles/bl/standorttypen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE bl_gesellschaftsgruppen (
  GESGR_CAT TEXT, GESGR_DEU TEXT, WALDBILD TEXT, 
  STANDORT TEXT, NUTZUNG_PFLEGE TEXT, 
  VEGETATIONSSTUFE TEXT, FLAECHENANTEIL_BL TEXT, 
  FLAECHENANTEIL_BS TEXT, FLAECHE_BLBS_PROZENT TEXT, 
  STANDORTE TEXT
);
COPY bl_gesellschaftsgruppen 
FROM 
  '/data/profiles/bl/gesellschaftsgruppen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE bl_expo_hanglage (
  STO_Nr TEXT, NNO_12 INT, NNO_25 INT, 
  NNO_37 INT, NNO_50 INT, NNO_62 INT, 
  NNO_75 INT, NNO_87 INT, NNO_100 INT, 
  NOO_12 INT, NOO_25 INT, NOO_37 INT, 
  NOO_50 INT, NOO_62 INT, NOO_75 INT, 
  NOO_87 INT, NOO_100 INT, OSO_12 INT, 
  OSO_25 INT, OSO_37 INT, OSO_50 INT, 
  OSO_62 INT, OSO_75 INT, OSO_87 INT, 
  OSO_100 INT, SSO_12 INT, SSO_25 INT, 
  SSO_37 INT, SSO_50 INT, SSO_62 INT, 
  SSO_75 INT, SSO_87 INT, SSO_100 INT, 
  SSW_12 INT, SSW_25 INT, SSW_37 INT, 
  SSW_50 INT, SSW_62 INT, SSW_75 INT, 
  SSW_87 INT, SSW_100 INT, WSW_12 INT, 
  WSW_25 INT, WSW_37 INT, WSW_50 INT, 
  WSW_62 INT, WSW_75 INT, WSW_87 INT, 
  WSW_100 INT, WNW_12 INT, WNW_25 INT, 
  WNW_37 INT, WNW_50 INT, WNW_62 INT, 
  WNW_75 INT, WNW_87 INT, WNW_100 INT, 
  NNW_12 INT, NNW_25 INT, NNW_37 INT, 
  NNW_50 INT, NNW_62 INT, NNW_75 INT, 
  NNW_87 INT, NNW_100 INT
);
COPY bl_expo_hanglage 
FROM 
  '/data/profiles/bl/exposition_hanglage.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE bl_artengruppen (
  STO_Nr TEXT, A TEXT, B1 TEXT, B2 TEXT, 
  C1 TEXT, C2 TEXT, D1 TEXT, D2 TEXT, D3 TEXT, 
  E1 TEXT, E2 TEXT, F TEXT, G TEXT, H TEXT, 
  I TEXT, J TEXT, K TEXT, L TEXT, M TEXT, 
  N1 TEXT, N2 TEXT, N3 TEXT, O1 TEXT, O2 TEXT, 
  O3 TEXT, O4 TEXT, O5 TEXT, O6 TEXT, O7 TEXT, 
  O8 TEXT, P1 TEXT, P2 TEXT, P3 TEXT, P4 TEXT, 
  Q1 TEXT, Q2 TEXT, Q3 TEXT, R TEXT, S TEXT, 
  T TEXT, U1 TEXT, U2 TEXT, U3 TEXT, V1 TEXT, 
  V2 TEXT, W TEXT, X1 TEXT, X2 TEXT, Y1 TEXT, 
  Y2 TEXT, Z1 TEXT, Z2 TEXT, Z3 TEXT
);
COPY bl_artengruppen 
FROM 
  '/data/profiles/bl/artengruppen.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE bl_uebergaenge (
  STO_Nr_nais TEXT, STO_Nr_profile TEXT
);
COPY bl_uebergaenge 
FROM 
  '/data/profiles/bl/uebergaenge_mapping.csv' DELIMITER ';' CSV HEADER;
CREATE TABLE bl_baumartenwahl (
  STO_Nr TEXT, Laubholzanteil_prozent TEXT, 
  Bu TEXT, TEi TEXT, SEi TEXT, BAh TEXT, 
  SAh TEXT, BUl TEXT, Es TEXT, SEr TEXT, 
  TKi TEXT, FAh TEXT, HBu TEXT, Ki TEXT, 
  WLi TEXT, SLi TEXT, EBe TEXT, MBe TEXT, 
  VBe TEXT, Nu TEXT, FUl TEXT, FEi TEXT, 
  FlUl TEXT, SbAh TEXT, HBi TEXT, Ro TEXT, 
  REi TEXT, As_ TEXT, Ta TEXT, Fi TEXT, 
  Fö TEXT, Lä TEXT, Eib TEXT, BFö TEXT, 
  SFö TEXT, Dou TEXT
);
ALTER TABLE 
  bl_baumartenwahl RENAME COLUMN As_ TO "as";
-- We rename the column because "AS" is a reserved postgresql word and can't be used in CREATE TABLE
COPY bl_baumartenwahl 
FROM 
  '/data/profiles/bl/baumartenwahl.csv' DELIMITER ';' CSV HEADER;
  
-- Solothurn
CREATE TABLE so_standorttypen (
  "2085_NaiS" TEXT, "2085_SO" TEXT, "kantonaler_Steckbrief_vorhanden" TEXT, 
  "2085_Höhenstufe" TEXT, "1975_NaiS" TEXT, 
  "1975_SO" TEXT, STO_DEU TEXT
);
COPY so_standorttypen 
FROM 
  '/data/profiles/so/standorttypen.csv' DELIMITER ';' CSV HEADER;



-- ########### PROJECTIONS ###########
CREATE TABLE projections_import (
  forest_ecoregions TEXT, altitudinal_zone TEXT, 
  forest_type TEXT, slope TEXT, silver_fir_area TEXT, 
  forest_ecoregions_specific TEXT, 
  relief TEXT, additional TEXT, target_altitudinal_zone TEXT, 
  target_forest_type TEXT
);
COPY projections_import 
FROM 
  '/data/projections.csv' DELIMITER ';' CSV HEADER;



-- ########### SPATIAL ###########
----------------------------------------------
-- altitudinal_zones_1995
CREATE TABLE "altitudinal_zones_1995" (
  gid serial, 
  "hs_de" varchar(200), 
  "hs_fr" varchar(200), 
  "hs_it" varchar(200), 
  "hs_en" varchar(200), 
  "code" varchar(10), 
  "subcode" varchar(10)
);
ALTER TABLE 
  "altitudinal_zones_1995" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'altitudinal_zones_1995', 'geom', 
    '2056', 'MULTIPOLYGON', 2
  );
----------------------------------------------
-- altitudinal_zones_2085_dry
CREATE TABLE "altitudinal_zones_2085_dry" (
  gid serial, 
  "hs_de" varchar(200), 
  "hs_fr" varchar(200), 
  "hs_it" varchar(200), 
  "hs_en" varchar(200), 
  "code" varchar(10), 
  "subcode" varchar(10)
);
ALTER TABLE 
  "altitudinal_zones_2085_dry" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'altitudinal_zones_2085_dry', 
    'geom', '2056', 'MULTIPOLYGON', 2
  );
----------------------------------------------
-- altitudinal_zones_2085_less_dry
CREATE TABLE "altitudinal_zones_2085_less_dry" (
  gid serial, 
  "hs_de" varchar(200), 
  "hs_fr" varchar(200), 
  "hs_it" varchar(200), 
  "hs_en" varchar(200), 
  "code" varchar(10), 
  "subcode" varchar(10)
);
ALTER TABLE 
  "altitudinal_zones_2085_less_dry" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'altitudinal_zones_2085_less_dry', 
    'geom', '2056', 'MULTIPOLYGON', 2
  );
----------------------------------------------
-- cantonal_boundaries
CREATE TABLE "cantonal_boundaries" (
  gid serial, 
  "uuid" varchar(38), 
  "datum_aend" date, 
  "datum_erst" date, 
  "erstell_j" int4, 
  "erstell_m" varchar(20), 
  "revision_j" int4, 
  "revision_m" varchar(20), 
  "grund_aend" varchar(20), 
  "herkunft" varchar(20), 
  "herkunft_j" int4, 
  "herkunft_m" varchar(20), 
  "objektart" varchar(20), 
  "revision_q" varchar(100), 
  "icc" varchar(20), 
  "kantonsnum" int4, 
  "see_flaech" numeric, 
  "kantonsfla" numeric, 
  "kt_teil" varchar(20), 
  "name" varchar(254), 
  "einwohnerz" int4
);
ALTER TABLE 
  "cantonal_boundaries" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'cantonal_boundaries', 'geom', 
    '2056', 'MULTIPOLYGON', 4
  );
CREATE VIEW cantonal_boundaries_export AS 
SELECT 
  ST_Transform(geom, 3857) as geometry 
FROM 
  cantonal_boundaries;
----------------------------------------------
-- forest_ecoregions
CREATE TABLE "forest_ecoregions" (
  gid serial, 
  "region_de" varchar(50), 
  "region_fr" varchar(50), 
  "region_it" varchar(100), 
  "region_en" varchar(100), 
  "code" varchar(50), 
  "subcode" varchar(50), 
  "code_bu" int4, 
  "code_fi" int4, 
  "shape_leng" numeric, 
  "shape_area" numeric
);
ALTER TABLE 
  "forest_ecoregions" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_ecoregions', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- silver_fir_areas
CREATE TABLE "silver_fir_areas" (
  gid serial, 
  "areal_de" varchar(50), 
  "areal_fr" varchar(50), 
  "areal_it" varchar(50), 
  "areal_en" varchar(50), 
  "code_ta" int4, 
  "shape_leng" numeric, 
  "shape_area" numeric
);
ALTER TABLE 
  "silver_fir_areas" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'silver_fir_areas', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types TG
CREATE TABLE "forest_types_tg" (
  gid serial, 
  "fid" numeric, 
  "tgneu" varchar(50), 
  "nais" varchar(50)
);
ALTER TABLE 
  "forest_types_tg" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_tg', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types LU 
CREATE TABLE "forest_types_lu" (
  gid serial, 
  "farbe" int4, 
  "sto1" int4, 
  "sto2" int4, 
  "sto3" int4, 
  "sto4" int4, 
  "sto5" int4, 
  "typ" int4, 
  "plottxt" varchar(50), 
  "sto1_txt" varchar(7), 
  "sto2_txt" varchar(7), 
  "sto3_txt" varchar(7), 
  "sto4_txt" varchar(7), 
  "sto5_txt" varchar(7), 
  "nais1" varchar(7), 
  "nais2" varchar(7), 
  "prio" int4, 
  "hs" int4, 
  "verdrisk" int4, 
  "shape_leng" numeric, 
  "shape_area" numeric
);
ALTER TABLE 
  "forest_types_lu" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_lu', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types FL
CREATE TABLE "forest_types_fl" (
  gid serial, 
  "objekt" varchar(32), 
  "text" varchar(64), 
  "bonitaet" varchar(32), 
  "rep" varchar(32), 
  "dxf_text" varchar(32), 
  "color" varchar(32), 
  "dxf_neu" varchar(50), 
  "text_neu" varchar(254), 
  "typ_nais" varchar(254), 
  "text_nais" varchar(100)
);
ALTER TABLE 
  "forest_types_fl" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_fl', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types ZH
CREATE TABLE "forest_types_zh" (
  gid serial, 
  "vecode" float8, 
  "ek72" varchar(10), 
  "vename" varchar(80), 
  "nais" varchar(15), 
  "hstufe" varchar(15), 
  "shape_area" numeric, 
  "shape_len" numeric
);
ALTER TABLE 
  "forest_types_zh" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_zh', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
CREATE TABLE "forest_types_zh_2" (
  gid serial, 
  "vecode" float8, 
  "ek72" varchar(10), 
  "vename" varchar(80), 
  "nais" varchar(15), 
  "hstufe" varchar(15), 
  "shape_area" numeric, 
  "shape_len" numeric
);
ALTER TABLE 
  "forest_types_zh_2" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_zh_2', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types NE
CREATE TABLE "forest_types_ne" (
  gid serial, 
  "code_neuch" float8, 
  "associatio" varchar(254), 
  "hohenstufe" integer, 
  "code_nais" varchar(5)
);
ALTER TABLE 
  "forest_types_ne" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_ne', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types FR
CREATE TABLE "forest_types_fr" (
  gid serial, 
  "objectid" float8, 
  "legende" varchar(10), 
  "wg_1" varchar(10), 
  "ueh_hoch_1" varchar(10), 
  "ueh_tief_1" varchar(10), 
  "td_1" varchar(20), 
  "taux_1" numeric, 
  "wg_2" varchar(10), 
  "ueh_hoch_2" varchar(10), 
  "ueh_tief_2" varchar(10), 
  "td_2" varchar(20), 
  "taux_2" numeric, 
  "wg_3" varchar(10), 
  "ueh_hoch_3" varchar(10), 
  "ueh_tief_3" varchar(10), 
  "td_3" varchar(20), 
  "taux_3" numeric, 
  "wgr" varchar(20), 
  "annee" varchar(2), 
  "lot" varchar(10), 
  "etat" float8, 
  "assoc_tot_" varchar(35), 
  "pdf" varchar(20), 
  "pdf_fr" varchar(50), 
  "pdf_de" varchar(50), 
  "wg_tot" varchar(50), 
  "id_legende" int4, 
  "legende_fr" varchar(150), 
  "legende_de" varchar(150), 
  "legende_la" varchar(150), 
  "fertilite_" float8, 
  "fertilite1" float8, 
  "prop_feuil" float8, 
  "prop_feu_1" float8, 
  "ass_remarq" varchar(100), 
  "score_ass_" numeric, 
  "shape_star" numeric, 
  "shape_stle" numeric, 
  "namensuber" varchar(254), 
  "nais" varchar(10)
);
ALTER TABLE 
  "forest_types_fr" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_fr', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types JU
CREATE TABLE "forest_types_ju" (
  gid serial, 
  "objectid" float8, 
  "nais1" varchar(80), 
  "naisue" varchar(80), 
  "hs1" varchar(80), 
  "hsue" varchar(80)
);
ALTER TABLE 
  "forest_types_ju" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_ju', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types BL
CREATE TABLE "forest_types_bl" (
  gid serial, 
  "id" float8, 
  "gemeinde" varchar(254), 
  "nais_2022" varchar(10), 
  "hoehenstuf" varchar(254), 
  "hs" float8
);
ALTER TABLE 
  "forest_types_bl" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_bl', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types VD
CREATE TABLE "forest_types_vd" (
  gid serial, 
  "vd" varchar(80), 
  "nais" varchar(80), 
  "ev" varchar(80), 
  "popup" varchar(80), 
  "hs" float8
);
ALTER TABLE 
  "forest_types_vd" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_vd', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Altitudinal zones VD
CREATE TABLE "altitudinal_zones_vd" (
  gid serial, 
  "ev_sta" varchar(80), 
  "hs" float8
);
ALTER TABLE 
  "altitudinal_zones_vd" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'altitudinal_zones_vd', 'geom', 
    '2056', 'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types SG
CREATE TABLE "forest_types_sg" (
  gid serial, 
  "dtwgeinhei" varchar(80), 
  "ta" varchar(80), 
  "tahs" varchar(80), 
  "taue" varchar(80), 
  "tauehs" varchar(80), 
  "shape_leng" numeric, 
  "shape_area" numeric, 
  "hs" float8, 
  "hsue" float8
);
ALTER TABLE 
  "forest_types_sg" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_sg', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types SG
CREATE TABLE "forest_types_sh" (
  gid serial, 
  "uuid" varchar(254), 
  "waldgesell" varchar(254), 
  "waldgese_1" varchar(254), 
  "tree-app_w" varchar(254), 
  "tree-app_1" varchar(254), 
  "tree-app_2" varchar(254), 
  "hs" float8, 
  "nais" varchar(10), 
  "naisue" varchar(10)
);
ALTER TABLE 
  "forest_types_sh" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_sh', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types SO
CREATE TABLE "forest_types_so" (
  gid serial, 
  "t_id" int4, 
  "stan_nais" varchar(254), 
  "grunnheit" varchar(254), 
  "hs" varchar(20), 
  "hs_code" float8, 
  "hsue_code" float8
);
ALTER TABLE 
  "forest_types_so" 
ADD 
  PRIMARY KEY (gid);
SELECT 
  AddGeometryColumn(
    '', 'forest_types_so', 'geom', '2056', 
    'MULTIPOLYGON', 2
  );
----------------------------------------------
-- Forest types GL


CREATE TABLE "forest_types_gl" (gid serial,
"fid" numeric,
"qc_id" numeric,
"wg_haupt" varchar(254),
"wg_zusatz" varchar(254),
"wg_name" varchar(254),
"nais" varchar(254),
"nais1" varchar(254),
"nais2" varchar(254),
"mo" float8,
"ue" float8,
"tahs" varchar(254),
"tahsue" varchar(254),
"kommentar" varchar(254),
"korrigiert" numeric,
"hs_code" float8,
"hsue_code" float8);

ALTER TABLE "forest_types_gl" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('','forest_types_gl','geom', '2056','MULTIPOLYGON',2);


----------------------------------------------
-- Forest types AR


CREATE TABLE "forest_types_ar" (gid serial,
"fid" numeric,
"dtwgeinhei" varchar(254),
"nais" varchar(254),
"nais1" varchar(254),
"nais2" varchar(254),
"mo" numeric,
"ue" numeric,
"tahs" varchar(254),
"tahsue" varchar(254),
"hs_code" float8,
"hsue_code" float8);

ALTER TABLE "forest_types_ar" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('','forest_types_ar','geom', '2056','MULTIPOLYGON', 2);



-- ########### TYPES ###########
----------------------------------------------
-- additional
CREATE TYPE additional AS ENUM (
  'NrmlSl', 'ExtB', 'Nrml', 'withAv', 
  'CmpS', 'Shdy_Cl_Bb', 'Shdy_Cl', 
  'Wrm_Rdt', '=10F', 'Cl', '<1F', 'NoAvln', 
  'WthAvln', 'D_Eb_Cl', '>5F', '<5F', 
  'DpSl_Shdy', 'Dp', 'Rvn', 'Rbl', 'Shlw', 
  '<10F', '>10F', 'unknown'
);
CREATE TABLE additional_meta (
  source TEXT, de TEXT, en TEXT, fr TEXT, 
  target additional
);
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Boden normal', 'Boden normal', 'Normal Soil', 
    'sol normal', 'NrmlSl'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Extrem blockig', 'Extrem blockig', 
    'Extremely blocky', 'extrèmement riche en blocs', 
    'ExtB'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Normal', 'Normal', 'Normal', 'normal', 
    'Nrml'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'bei Lawinenzug', 'bei Lawinenzug', 
    'for avalanches', 'près d''un couloir d''avalanches', 
    'withAv'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Boden verdichtet', 'Boden verdichtet', 
    'Compacted Soil', 'sol compacté', 
    'CmpS'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'schattig, kühl, grosse Blöcke', 
    'schattig, kühl, grosse Blöcke', 
    'Shady, Cool, Big blocks', 'ombragé, frais, gros blocs', 
    'Shdy_Cl_Bb'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Schattig, Kühl', 'Schattig, Kühl', 
    'Shady, Cool', 'ombragé, frais', 
    'Shdy_Cl'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Warm und Strahlungsreich', 'Warm und Strahlungsreich', 
    'Warm and radiant', 'chaud et exposé', 
    'Wrm_Rdt'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'falls mind alle 10 Jahre überschwemmt', 
    'falls mind alle 10 Jahre überschwemmt', 
    'Flooded every 10 years', 'en cas d''inondation tous les 10 ans', 
    '=10F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Kühl', 'Kühl', 'Cool', 'frais', 
    'Cl'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'falls alljährlich überschwemmt', 
    'falls alljährlich überschwemmt', 
    'Flooded every year', 'en cas d''inondation annuelle', 
    '<1F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Keine Lawinenbeeinflussung', 'Keine Lawinenbeeinflussung', 
    'No avalanche influence', 'Non influencé par les avalanches', 
    'NoAvln'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'mit Lawinenbeeinflussung', 'mit Lawinenbeeinflussung', 
    'With avalanche control', 'Influencé par les avalanches', 
    'WthAvln'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'trocken, extrem blockig, kühl', 
    'trocken, extrem blockig, kühl', 
    'Dry, Extremely blocky, Cool', 
    'sec, extrèmement riches en blocs, frais', 
    'D_Eb_Cl'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'alle 6 Jahre oder seltener überschwemmt', 
    'alle 6 Jahre oder seltener überschwemmt', 
    'Flooded every six years or less', 
    'inondé tous les 6 ans ou plus rarement', 
    '>5F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'bis alle 5 Jahre überschwemmt', 
    'bis alle 5 Jahre überschwemmt', 
    'Flooded every five years', 'inondé jusqu''à tous les 5 ans', 
    '<5F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'tiefgründiger Boden, schattig', 
    'tiefgründiger Boden, schattig', 
    'Deep soil, Shady', 'sol profond, ombragé', 
    'DpSl_Shdy'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'tiefgründig', 'tiefgründig', 'Deep', 
    'sol profond', 'Dp'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'Schlucht', 'Schlucht', 'Ravine', 
    'ravin', 'Rvn'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'mit viel Schutt', 'mit viel Schutt', 
    'With lots of rubble', 'éboulis marqué', 
    'Rbl'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'flachgründig', 'flachgründig', 
    'Shallow', 'sol superficiel', 'Shlw'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'weniger als alle 10 Jahre überschwemmt', 
    'weniger als alle 10 Jahre überschwemmt', 
    'Flooded less than every 10 years', 
    'inondé plus rarement que tous les 10 ans', 
    '<10F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    'mind. alle 10 Jahre überschwemmt', 
    'mind. alle 10 Jahre überschwemmt', 
    'Flooded at least every 10 years', 
    'inondé au minimum tous les 10 ans', 
    '>10F'
  );
INSERT INTO additional_meta (source, de, en, fr, target) 
VALUES 
  (
    '', 'nicht relevant', 'not relevant', 
    'pas important', 'unknown'
  );
----------------------------------------------
-- altitudinal zones
CREATE TABLE altitudinal_zone_meta (
  source TEXT, de TEXT, fr TEXT, nais TEXT, 
  code TEXT, zh TEXT, id SERIAL
);
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'mediterran', 'collin-mediterran', 
    'collinéen à méditerranéen', 
    '01C', '0', 'med'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'hyperinsubrisch', 'hyperinsubrisch', 
    'hyperinsubrique', 'HY', '10', 'hy'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'collin', 'collin', 'collinéen', 
    'C', '20', 'co'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'collin mit Buche', 'collin mit Buche', 
    'collinéen avec hêtre', 'CB', 
    '30', 'cb'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'submontan', 'submontan', 'submontagnard', 
    'SM', '40', 'sm'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'untermontan', 'untermontan', 'montagnard inférieur', 
    'UM', '50', 'um'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'obermontan', 'obermontan', 'montagnard supérieur', 
    'OM', '60', 'om'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'unter- & obermontan', 'unter- & obermontan', 
    'montagnard inférieur & supérieur', 
    'UMOM', '70', 'umom'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'hochmontan', 'hochmontan', 'haut-montagnard', 
    'HM', '80', 'hm'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'subalpin', 'subalpin', 'subalpin', 
    'SA', '90', 'sa'
  );
INSERT INTO altitudinal_zone_meta (source, de, fr, nais, code, zh) 
VALUES 
  (
    'obersubalpin', 'obersubalpin', 'subalpin supérieur', 
    'OSA', '100', 'osa'
  );
----------------------------------------------
-- foresttype
CREATE TABLE foresttype_meta (
  code TEXT PRIMARY KEY, de TEXT, fr TEXT, 
  la TEXT, tree_layer_height_min INT, 
  tree_layer_height_max INT, conifer_tree_height_max INT, 
  deciduous_tree_height_max INT, sort FLOAT, 
  carbonate_fine INT, carbonate_rock INT, 
  geomorphology_rock_band INT, geomorphology_blocky_rocky_strong INT, 
  geomorphology_blocky_rocky_little INT, 
  geomorphology_limestone_pavement INT, 
  geomorphology_rocks_moderately_moved INT, 
  geomorphology_rocks_strongly_moved INT, 
  geomorphology_rocks_stabilised INT, 
  relief_type_central_slope INT, relief_type_hollow INT, 
  relief_type_dome INT, relief_type_plateau INT, 
  relief_type_steep INT, process_rockfall INT, 
  process_avalanche INT, process_landslide INT, 
  process_erosion INT, water_stream INT, 
  water_small INT, water_spring INT, 
  water_change INT, location_de TEXT, 
  location_fr TEXT, natural_forest_de TEXT, 
  natural_forest_fr TEXT, vegetation_de TEXT, 
  vegetation_fr TEXT, altitude INTEGER[][], 
  altitudinal_zone_forest_ecoregion INTEGER[][], 
  skeletal_fraction_soil_depth INTEGER[][], 
  soil_wetness_groundwater INTEGER[][], 
  soil_wetness_tailwater INTEGER[][], 
  aspect INTEGER[], graininess INTEGER[], 
  humus INTEGER[][], humus_variants INTEGER[], 
  raw_material INTEGER[], slope INTEGER[], 
  soil INTEGER[][], soil_variants INTEGER[]
);
INSERT INTO foresttype_meta (
  code, de, fr, la, tree_layer_height_min, 
  tree_layer_height_max, conifer_tree_height_max, 
  deciduous_tree_height_max, sort, 
  carbonate_fine, carbonate_rock, 
  geomorphology_rock_band, geomorphology_blocky_rocky_strong, 
  geomorphology_blocky_rocky_little, 
  geomorphology_limestone_pavement, 
  geomorphology_rocks_moderately_moved, 
  geomorphology_rocks_strongly_moved, 
  geomorphology_rocks_stabilised, 
  relief_type_central_slope, relief_type_hollow, 
  relief_type_dome, relief_type_plateau, 
  relief_type_steep, process_rockfall, 
  process_avalanche, process_landslide, 
  process_erosion, water_stream, water_small, 
  water_spring, water_change, location_de, 
  location_fr, natural_forest_de, 
  natural_forest_fr, vegetation_de, 
  vegetation_fr
) 
SELECT 
  trim(mstr.naistyp_c) AS code, 
  COALESCE(
    trim(naistyp_name_deu), 
    trim(naistyp_namk_deu), 
    trim(naistyp_wges)
  ) AS de, 
  COALESCE(
    trim(naistyp_name_frz), 
    trim(naistyp_namk_frz)
  ) AS fr, 
  naistyp_name_lat AS la, 
  typ.naistyp_hdom_min :: int AS tree_layer_height_min, 
  typ.naistyp_hdom_max :: int AS tree_layer_height_max, 
  typ.naistyp_hmax_nad :: int AS conifer_tree_height_max, 
  typ.naistyp_hmax_lau :: int AS deciduous_tree_height_max, 
  trim(
    BOTH 
    FROM 
      mstr.naistyp_sort
  ):: float AS sort, 
  typ.ntyp_kg_fein :: int carbonate_fine, 
  typ.ntyp_kg_gestein :: int carbonate_rock, 
  typ.ntyp_fels :: int AS geomorphology_rock_band, 
  typ.ntyp_bl_fels_st :: int AS geomorphology_blocky_rocky_strong, 
  typ.ntyp_bl_fels_we :: int AS geomorphology_blocky_rocky_little, 
  typ.ntyp_bl_karren :: int AS geomorphology_limestone_pavement, 
  typ.ntyp_bl_schutt_m :: int AS geomorphology_rocks_moderately_moved, 
  typ.ntyp_bl_schutt_s :: int AS geomorphology_rocks_strongly_moved, 
  typ.ntyp_bl_schutt_x :: int AS geomorphology_rocks_stabilised, 
  typ.ntyp_rt_mittelh :: int AS relief_type_central_slope, 
  typ.ntyp_rt_mulde :: int AS relief_type_hollow, 
  typ.ntyp_rt_kuppe :: int AS relief_type_dome, 
  typ.ntyp_rt_plateau :: int AS relief_type_plateau, 
  typ.ntyp_rt_steilh :: int AS relief_type_steep, 
  typ.ntyp_steinschlag :: int AS process_rockfall, 
  typ.ntyp_lawinen :: int AS process_avalanche, 
  typ.ntyp_rutschung :: int AS process_landslide, 
  typ.ntyp_erosion :: int AS process_erosion, 
  typ.ntyp_wass_bach :: int AS water_stream, 
  typ.ntyp_wass_klein :: int AS water_small, 
  typ.ntyp_wass_quell :: int AS water_spring, 
  typ.ntyp_wechself :: int AS water_change, 
  regexp_replace(
    typ.naistyp_stao, '\r|\n', '', 'g'
  ) AS location_de, 
  regexp_replace(
    typ.naistyp_stao_fr, '\r|\n', '', 
    'g'
  ) AS location_fr, 
  regexp_replace(
    typ.naistyp_nwld, '\r|\n', '', 'g'
  ) AS natural_forest_de, 
  regexp_replace(
    typ.naistyp_nwld_fr, '\r|\n', '', 
    'g'
  ) AS natural_forest_fr, 
  regexp_replace(
    typ.naistyp_vasp, '\r|\n', '', 'g'
  ) AS vegetation_de, 
  regexp_replace(
    typ.naistyp_vasp_fr, '\r|\n', '', 
    'g'
  ) AS vegetation_fr 
FROM 
  nat_naistyp_mstr mstr 
  LEFT JOIN nat_naistyp typ ON trim(mstr.naistyp_c) = trim(typ.naistyp_c) 
WHERE 
  naistyp_s20 = 'Y' 
UNION 
SELECT 
  trim(
    BOTH 
    FROM 
      naistyp
  ) AS code, 
  NULL AS de, 
  NULL AS fr, 
  NULL AS la, 
  NULL AS tree_layer_height_min, 
  NULL AS tree_layer_height_max, 
  NULL AS conifer_tree_height_max, 
  NULL AS deciduous_tree_height_max, 
  trim(
    BOTH 
    FROM 
      naistyp_sort
  ):: float AS sort, 
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
FROM 
  nat_baum_collin 
GROUP BY 
  naistyp, 
  naistyp_sort;
UPDATE 
  foresttype_meta 
SET 
  altitudinal_zone_forest_ecoregion = ARRAY[ ARRAY[HS_01b_01C_J :: int, 
  HS_01d_SM_J :: int, 
  HS_01e_UM_J :: int, 
  HS_01h_OM_J :: int, 
  HS_01i_HM_J :: int, 
  null, 
  null], 
  ARRAY[ HS_02b_C_M :: int, 
  HS_02d_SM_M :: int, 
  HS_02e_UM_M :: int, 
  HS_02h_OM_M :: int, 
  HS_02i_HM_M :: int, 
  null, 
  null], 
  ARRAY[HS_03b_C_1 :: int, 
  HS_03d_SM_1 :: int, 
  HS_03e_UM_1 :: int, 
  HS_03h_OM_1 :: int, 
  HS_03i_HM_1 :: int, 
  HS_03m_SA_1 :: int, 
  HS_03n_OSA_1 :: int], 
  ARRAY[HS_04b_C_2a :: int, 
  HS_04d_SM_2a :: int, 
  HS_04e_UM_2a :: int, 
  HS_04h_OM_2a :: int, 
  HS_04i_HM_2a :: int, 
  HS_04m_SA_2a :: int, 
  HS_04n_OSA_2a :: int], 
  ARRAY[HS_05b_C_2b :: int, 
  HS_05i_HM_2b :: int, 
  HS_05j_HM_2b_bis1000m :: int, 
  HS_05k_HM_2b_ab1000m :: int, 
  HS_05m_SA_2b :: int, 
  HS_05n_OSA_2b :: int, 
  null], 
  ARRAY[HS_06i_HM_3 :: int, 
  HS_06m_SA_3 :: int, 
  HS_06n_OSA_3 :: int, 
  null, 
  null, 
  null, 
  null], 
  ARRAY[HS_07b_C_4 :: int, 
  HS_07i_HM_4 :: int, 
  HS_07m_SA_4 :: int, 
  HS_07n_OSA_4 :: int, 
  null, 
  null, 
  null], 
  ARRAY[ HS_08a_HY_5a :: int, 
  HS_08b_C_5a :: int, 
  HS_08c_CB_5a :: int, 
  HS_08g_UMOM_5a :: int, 
  HS_08i_HM_5a :: int, 
  HS_08m_SA_5a :: int, 
  HS_08n_OSA_5a :: int], 
  ARRAY[HS_09a_HY_5b :: int, 
  HS_09c_CB_5b :: int, 
  HS_09g_UMOM_5b :: int, 
  HS_09m_SA_5b :: int, 
  null, 
  null, 
  null], 
  ARRAY[HS_10a_HY_Me :: int, 
  HS_10c_CB_Me :: int, 
  null, 
  null, 
  null, 
  null, 
  null]] 
FROM 
  nat_lage 
  LEFT JOIN nat_naistyp ON nat_lage.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  skeletal_fraction_soil_depth = ARRAY[ ARRAY[gs_01 :: int, 
  gs_02 :: int, 
  gs_03 :: int, 
  gs_04 :: int, 
  gs_05 :: int, 
  gs_06 :: int], 
  --Gündigkeit sehr flach
  ARRAY[gs_07 :: int, 
  gs_08 :: int, 
  gs_09 :: int, 
  gs_10 :: int, 
  gs_11 :: int, 
  gs_12 :: int], 
  --Gündigkeit flach
  ARRAY[gs_13 :: int, 
  gs_14 :: int, 
  gs_15 :: int, 
  gs_16 :: int, 
  gs_17 :: int, 
  gs_18 :: int], 
  --Gündigkeit mittel
  ARRAY[gs_19 :: int, 
  gs_20 :: int, 
  gs_21 :: int, 
  gs_22 :: int, 
  gs_23 :: int, 
  gs_24 :: int], 
  --Gündigkeit tief
  ARRAY[gs_25 :: int, 
  gs_26 :: int, 
  gs_27 :: int, 
  gs_28 :: int, 
  gs_29 :: int, 
  gs_30 :: int], 
  --Gündigkeit sehr tief
  ARRAY[gs_31 :: int, 
  gs_32 :: int, 
  gs_33 :: int, 
  gs_34 :: int, 
  gs_35 :: int, 
  gs_36 :: int] --Gündigkeit äusserst tief
  ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  soil_wetness_groundwater = ARRAY[ ARRAY[wvg_01 :: int, 
  wvg_02 :: int, 
  wvg_03 :: int, 
  wvg_04 :: int, 
  wvg_05 :: int, 
  wvg_06 :: int], 
  ARRAY[wvg_07 :: int, 
  wvg_08 :: int, 
  wvg_09 :: int, 
  wvg_10 :: int, 
  wvg_11 :: int, 
  wvg_12 :: int], 
  ARRAY[wvg_13 :: int, 
  wvg_14 :: int, 
  wvg_15 :: int, 
  wvg_16 :: int, 
  wvg_17 :: int, 
  wvg_18 :: int], 
  ARRAY[wvg_19 :: int, 
  wvg_20 :: int, 
  wvg_21 :: int, 
  wvg_22 :: int, 
  wvg_23 :: int, 
  wvg_24 :: int], 
  ARRAY[wvg_25 :: int, 
  wvg_26 :: int, 
  wvg_27 :: int, 
  wvg_28 :: int, 
  wvg_29 :: int, 
  wvg_30 :: int], 
  ARRAY[wvg_31 :: int, 
  wvg_32 :: int, 
  wvg_33 :: int, 
  wvg_34 :: int, 
  wvg_35 :: int, 
  wvg_36 :: int] ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  soil_wetness_tailwater = ARRAY[ ARRAY[wvs_01 :: int, 
  wvs_02 :: int, 
  wvs_03 :: int, 
  wvs_04 :: int, 
  wvs_05 :: int, 
  wvs_06 :: int], 
  ARRAY[wvs_07 :: int, 
  wvs_08 :: int, 
  wvs_09 :: int, 
  wvs_10 :: int, 
  wvs_11 :: int, 
  wvs_12 :: int], 
  ARRAY[wvs_13 :: int, 
  wvs_14 :: int, 
  wvs_15 :: int, 
  wvs_16 :: int, 
  wvs_17 :: int, 
  wvs_18 :: int], 
  ARRAY[wvs_19 :: int, 
  wvs_20 :: int, 
  wvs_21 :: int, 
  wvs_22 :: int, 
  wvs_23 :: int, 
  wvs_24 :: int], 
  ARRAY[wvs_25 :: int, 
  wvs_26 :: int, 
  wvs_27 :: int, 
  wvs_28 :: int, 
  wvs_29 :: int, 
  wvs_30 :: int], 
  ARRAY[wvs_31 :: int, 
  wvs_32 :: int, 
  wvs_33 :: int, 
  wvs_34 :: int, 
  wvs_35 :: int, 
  wvs_36 :: int], 
  ARRAY[wvs_37 :: int, 
  wvs_38 :: int, 
  wvs_39 :: int, 
  wvs_40 :: int, 
  wvs_41 :: int, 
  wvs_42 :: int] ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  aspect = ARRAY[ E_001_025_n_nne :: int, 
  E_026_050_nne_ne :: int, 
  E_051_075_ne_ene :: int, 
  E_076_100_ene_e :: int, 
  E_101_125_e_see :: int, 
  E_126_150_see_se :: int, 
  E_151_175_se_sse :: int, 
  E_176_200_ss_s :: int, 
  E_201_225_s_ssw :: int, 
  E_226_250_ssw_sw :: int, 
  E_251_275_sw_wsw :: int, 
  E_276_300_wsw_w :: int, 
  E_301_325_w_wnw :: int, 
  E_326_350_wnw_nw :: int, 
  E_351_375_nw_nnww :: int, 
  E_376_400_nnw_n :: int ] 
FROM 
  nat_lage 
  LEFT JOIN nat_naistyp ON nat_lage.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  slope = ARRAY[ HN_000_010 :: int, 
  HN_010_025 :: int, 
  HN_025_050 :: int, 
  HN_050_075 :: int, 
  HN_075_100 :: int, 
  HN_100 :: int ] 
FROM 
  nat_lage 
  LEFT JOIN nat_naistyp ON nat_lage.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  altitude = ARRAY[ ARRAY[HL_N_0250 :: int, 
  HL_N_0300 :: int, 
  HL_N_0350 :: int, 
  HL_N_0400 :: int, 
  HL_N_0450 :: int, 
  HL_N_0500 :: int, 
  HL_N_0550 :: int, 
  HL_N_0600 :: int, 
  HL_N_0650 :: int, 
  HL_N_0700 :: int, 
  HL_N_0750 :: int, 
  HL_N_0800 :: int, 
  HL_N_0850 :: int, 
  HL_N_0900 :: int, 
  HL_N_0950 :: int, 
  HL_N_1000 :: int, 
  HL_N_1050 :: int, 
  HL_N_1100 :: int, 
  HL_N_1150 :: int, 
  HL_N_1200 :: int, 
  HL_N_1250 :: int, 
  HL_N_1300 :: int, 
  HL_N_1350 :: int, 
  HL_N_1400 :: int, 
  HL_N_1450 :: int, 
  HL_N_1500 :: int, 
  HL_N_1550 :: int, 
  HL_N_1600 :: int, 
  HL_N_1650 :: int, 
  HL_N_1700 :: int, 
  HL_N_1750 :: int, 
  HL_N_1800 :: int, 
  HL_N_1850 :: int, 
  HL_N_1900 :: int, 
  HL_N_1950 :: int, 
  HL_N_2000 :: int, 
  HL_N_2050 :: int, 
  HL_N_2100 :: int, 
  HL_N_2150 :: int, 
  HL_N_2200 :: int, 
  HL_N_2250 :: int, 
  HL_N_2300 :: int], 
  ARRAY[HL_EW_0250 :: int, 
  HL_EW_0300 :: int, 
  HL_EW_0350 :: int, 
  HL_EW_0400 :: int, 
  HL_EW_0450 :: int, 
  HL_EW_0500 :: int, 
  HL_EW_0550 :: int, 
  HL_EW_0600 :: int, 
  HL_EW_0650 :: int, 
  HL_EW_0700 :: int, 
  HL_EW_0750 :: int, 
  HL_EW_0800 :: int, 
  HL_EW_0850 :: int, 
  HL_EW_0900 :: int, 
  HL_EW_0950 :: int, 
  HL_EW_1000 :: int, 
  HL_EW_1050 :: int, 
  HL_EW_1100 :: int, 
  HL_EW_1150 :: int, 
  HL_EW_1200 :: int, 
  HL_EW_1250 :: int, 
  HL_EW_1300 :: int, 
  HL_EW_1350 :: int, 
  HL_EW_1400 :: int, 
  HL_EW_1450 :: int, 
  HL_EW_1500 :: int, 
  HL_EW_1550 :: int, 
  HL_EW_1600 :: int, 
  HL_EW_1650 :: int, 
  HL_EW_1700 :: int, 
  HL_EW_1750 :: int, 
  HL_EW_1800 :: int, 
  HL_EW_1850 :: int, 
  HL_EW_1900 :: int, 
  HL_EW_1950 :: int, 
  HL_EW_2000 :: int, 
  HL_EW_2050 :: int, 
  HL_EW_2100 :: int, 
  HL_EW_2150 :: int, 
  HL_EW_2200 :: int, 
  HL_EW_2250 :: int, 
  HL_EW_2300 :: int], 
  ARRAY[HL_S_0250 :: int, 
  HL_S_0300 :: int, 
  HL_S_0350 :: int, 
  HL_S_0400 :: int, 
  HL_S_0450 :: int, 
  HL_S_0500 :: int, 
  HL_S_0550 :: int, 
  HL_S_0600 :: int, 
  HL_S_0650 :: int, 
  HL_S_0700 :: int, 
  HL_S_0750 :: int, 
  HL_S_0800 :: int, 
  HL_S_0850 :: int, 
  HL_S_0900 :: int, 
  HL_S_0950 :: int, 
  HL_S_1000 :: int, 
  HL_S_1050 :: int, 
  HL_S_1100 :: int, 
  HL_S_1150 :: int, 
  HL_S_1200 :: int, 
  HL_S_1250 :: int, 
  HL_S_1300 :: int, 
  HL_S_1350 :: int, 
  HL_S_1400 :: int, 
  HL_S_1450 :: int, 
  HL_S_1500 :: int, 
  HL_S_1550 :: int, 
  HL_S_1600 :: int, 
  HL_S_1650 :: int, 
  HL_S_1700 :: int, 
  HL_S_1750 :: int, 
  HL_S_1800 :: int, 
  HL_S_1850 :: int, 
  HL_S_1900 :: int, 
  HL_S_1950 :: int, 
  HL_S_2000 :: int, 
  HL_S_2050 :: int, 
  HL_S_2100 :: int, 
  HL_S_2150 :: int, 
  HL_S_2200 :: int, 
  HL_S_2250 :: int, 
  HL_S_2300 :: int] ] 
FROM 
  nat_lage 
  LEFT JOIN nat_naistyp ON nat_lage.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  graininess = ARRAY[KO_IS :: int, 
  KO_L :: int, 
  KO_S :: int, 
  KO_T :: int, 
  KO_U :: int, 
  KO_lT :: int, 
  KO_lU :: int, 
  KO_sL :: int, 
  KO_tL :: int, 
  KO_tU :: int ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  humus = ARRAY[ ARRAY[HUF_mo_mull_hydro :: int, 
  HUF_mo_mull_norm :: int, 
  HUF_mo_mull_xero :: int], 
  ARRAY[HUF_mo_rh_hydro :: int, 
  HUF_mo_rh_norm :: int, 
  HUF_mo_rh_xero :: int], 
  ARRAY[HUF_mo_typ_hydro :: int, 
  HUF_mo_typ_norm :: int, 
  HUF_mo_typ_xero :: int], 
  ARRAY[HUF_mu_f_hydro :: int, 
  HUF_mu_f_norm :: int, 
  HUF_mu_f_xero :: int], 
  ARRAY[HUF_mu_l_hydro :: int, 
  HUF_mu_l_norm :: int, 
  HUF_mu_l_xero :: int], 
  ARRAY[HUF_rh_hydro :: int, 
  HUF_rh_norm :: int, 
  HUF_rh_xero :: int] ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  humus_variants = ARRAY[HUF_V_Anmoor :: int, 
  HUF_V_Kalkmoder :: int, 
  HUF_V_Kalkmull :: int, 
  HUF_V_Tangel :: int, 
  HUF_V_Torf :: int, 
  HUF_V_erod :: int] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  raw_material = ARRAY[AM_B :: int, 
  AM_S :: int ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  soil = ARRAY[ ARRAY[BE_GestRohB :: int, 
  null, 
  null], 
  ARRAY[BE_Ranker_norm :: int, 
  BE_Ranker_verbraunt :: int, 
  BE_Ranker_vernaesst :: int], 
  ARRAY[BE_Regosol_norm :: int, 
  BE_Regosol_verbraunt :: int, 
  BE_Regosol_vernaesst :: int], 
  ARRAY[BE_Pararendz_norm :: int, 
  BE_Pararendz_verbraunt :: int, 
  BE_Pararendz_vernaesst :: int], 
  ARRAY[BE_Rendz_norm :: int, 
  BE_Rendz_verbraunt :: int, 
  BE_Rendz_vernaesst :: int], 
  ARRAY[BE_Braunerd_norm :: int, 
  BE_Braunerd_podso :: int, 
  BE_Braunerd_vernaesst :: int], 
  ARRAY[BE_Parabraunerd_norm :: int, 
  BE_Parabraunerd_podso :: int, 
  BE_Parabraunerd_vernaesst :: int], 
  ARRAY[BE_Podsol_norm :: int, 
  BE_Podsol_vernaesst :: int, 
  null], 
  ARRAY[BE_Stauw_norm :: int, 
  BE_Stauw_nassgebl :: int, 
  null], 
  ARRAY[BE_Grundw_norm :: int, 
  BE_Grundw_nassgebl :: int, 
  null] ] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
UPDATE 
  foresttype_meta 
SET 
  soil_variants = ARRAY[BE_V_Auenb :: int, 
  BE_V_Braunpod :: int, 
  BE_V_Humuspod :: int, 
  BE_V_OrgB :: int, 
  BE_V_neutrBraune :: int] 
FROM 
  nat_boden 
  LEFT JOIN nat_naistyp ON nat_boden.naistyp_sort = nat_naistyp.naistyp_sort 
WHERE 
  trim(nat_naistyp.naistyp_c) = foresttype_meta.code;
CREATE TYPE foresttype_group_type AS ENUM (
  'main', 'special', 'volatile', 'riverside', 
  'pioneer'
);
CREATE TABLE foresttype_group (
  "group" foresttype_group_type, code TEXT
);
INSERT INTO foresttype_group("group", code) 
SELECT 
  'main' :: foresttype_group_type, 
  trim(
    both 
    from 
      naistyp_c
  ) 
FROM 
  nat_naistyp 
WHERE 
  naistyp_oeg_hawa IN ('1', '2') 
UNION 
SELECT 
  'special' :: foresttype_group_type, 
  trim(
    both 
    from 
      naistyp_c
  ) 
FROM 
  nat_naistyp 
WHERE 
  naistyp_oeg_sowa IN ('1', '2') 
UNION 
SELECT 
  'volatile' :: foresttype_group_type, 
  trim(
    both 
    from 
      naistyp_c
  ) 
FROM 
  nat_naistyp 
WHERE 
  naistyp_oeg_wefe IN ('1', '2') 
UNION 
SELECT 
  'riverside' :: foresttype_group_type, 
  trim(
    both 
    from 
      naistyp_c
  ) 
FROM 
  nat_naistyp 
WHERE 
  naistyp_oeg_aue IN ('1', '2') 
UNION 
SELECT 
  'pioneer' :: foresttype_group_type, 
  trim(
    both 
    from 
      naistyp_c
  ) 
FROM 
  nat_naistyp 
WHERE 
  naistyp_oeg_pio IN ('1', '2');
----------------------------------------------
-- vegetation
CREATE TABLE bushtype_meta (
  code INTEGER PRIMARY KEY, de TEXT, fr TEXT, 
  la TEXT
);
CREATE TABLE herbtype_meta (
  code INTEGER PRIMARY KEY, de TEXT, fr TEXT, 
  la TEXT
);
CREATE TABLE mosstype_meta (
  code INTEGER PRIMARY KEY, de TEXT, fr TEXT, 
  la TEXT
);
INSERT INTO bushtype_meta (code, de, fr, la) 
SELECT 
  sisf_nr :: int AS code, 
  COALESCE(art_nam_deu, art_nam_lat) AS de, 
  COALESCE(art_nam_frz, art_nam_lat) AS fr, 
  art_nam_lat AS la 
FROM 
  nat_arten_mstr 
  JOIN nat_arten_strauch USING (sisf_nr);
INSERT INTO herbtype_meta (code, de, fr, la) 
SELECT 
  sisf_nr :: int AS code, 
  COALESCE(art_nam_deu, art_nam_lat) AS de, 
  COALESCE(art_nam_frz, art_nam_lat) AS fr, 
  art_nam_lat AS la 
FROM 
  nat_arten_mstr 
  JOIN nat_arten_kraut USING (sisf_nr);
INSERT INTO mosstype_meta (code, de, fr, la) 
SELECT 
  moss_mstr.sisf_nr :: int AS code, 
  COALESCE(art_nam_deu, art_nam_lat) AS de, 
  COALESCE(art_nam_frz, art_nam_lat) AS fr, 
  art_nam_lat AS la 
FROM 
  nat_arten_mstr moss_mstr 
  JOIN nat_arten_moos USING (sisf_nr);
-- frequency: 1 = oft, 2 = manchmal
CREATE TABLE bushtype_foresttype (
  bushtype_code INTEGER REFERENCES bushtype_meta, 
  foresttype_code TEXT REFERENCES foresttype_meta, 
  frequency INTEGER
);
INSERT INTO bushtype_foresttype (
  bushtype_code, foresttype_code, frequency
) 
SELECT 
  sisf_nr :: int AS bushtype_code, 
  trim(naistyp_c) AS foresttype_code, 
  vorh :: int AS frequency 
FROM 
  nat_naistyp_art 
WHERE 
  art = 'S' 
  AND vorh IN ('1', '2');
CREATE TABLE herbtype_foresttype (
  herbtype_code INTEGER REFERENCES herbtype_meta, 
  foresttype_code TEXT REFERENCES foresttype_meta, 
  frequency INTEGER
);
INSERT INTO herbtype_foresttype (
  herbtype_code, foresttype_code, frequency
) 
SELECT 
  sisf_nr :: int AS herbtype_code, 
  trim(naistyp_c) AS foresttype_code, 
  vorh :: int AS frequency 
FROM 
  nat_naistyp_art 
WHERE 
  art = 'K' 
  AND vorh IN ('1', '2');
CREATE TABLE mosstype_foresttype (
  mosstype_code INTEGER REFERENCES mosstype_meta, 
  foresttype_code TEXT REFERENCES foresttype_meta, 
  frequency INTEGER
);
INSERT INTO mosstype_foresttype (
  mosstype_code, foresttype_code, frequency
) 
SELECT 
  sisf_nr :: int AS mosstype_code, 
  trim(naistyp_c) AS foresttype_code, 
  vorh :: int AS frequency 
FROM 
  nat_naistyp_art 
WHERE 
  art = 'M' 
  AND vorh IN ('1', '2');
----------------------------------------------
-- indicator
CREATE TABLE indicator_meta (
  code INTEGER PRIMARY KEY, de TEXT, fr TEXT, 
  la TEXT
);
CREATE TABLE indicator_foresttype (
  indicator_code INTEGER REFERENCES indicator_meta, 
  foresttype_code TEXT REFERENCES foresttype_meta
);
CREATE TABLE indicator_altitudinal_zone (
  indicator_code INTEGER REFERENCES indicator_meta, 
  altitudinal_zone_code TEXT
);
CREATE TABLE indicator_forest_ecoregion (
  indicator_code INTEGER REFERENCES indicator_meta, 
  forest_ecoregion_code TEXT
);
INSERT INTO indicator_meta (code, de, fr, la) 
SELECT 
  sisf_nr :: int AS code, 
  COALESCE(art_nam_deu, art_nam_lat) AS de, 
  COALESCE(art_nam_frz, art_nam_lat) AS fr, 
  art_nam_lat AS la 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1';
INSERT INTO indicator_foresttype (indicator_code, foresttype_code) 
SELECT 
  mstr.sisf_nr :: int AS indicator_code, 
  trim(
    BOTH 
    FROM 
      art.naistyp_c
  ) AS foresttype_code 
FROM 
  nat_arten_mstr mstr 
  JOIN nat_naistyp_art art ON art.sisf_nr = mstr.sisf_nr 
WHERE 
  mstr.art_erk_zeik = '1' 
  AND art.vorh IN ('1', '2', '3') 
  AND trim(
    BOTH 
    FROM 
      naistyp_c
  ) IN (
    SELECT 
      code 
    FROM 
      foresttype_meta
  );
INSERT INTO indicator_forest_ecoregion (
  indicator_code, forest_ecoregion_code
) 
SELECT 
  sisf_nr :: int AS code, 
  '1' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_1 = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '2a' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_2a = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '2b' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_2b = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '3' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_3 = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '4' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_4 = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '5a' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_5a = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '5a' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_5aa = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '5b' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_5b = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  'J' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_j = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  'M' AS forest_ecoregion_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_region_m = '1';
INSERT INTO indicator_altitudinal_zone (
  indicator_code, altitudinal_zone_code
) 
SELECT 
  sisf_nr :: int AS code, 
  '20' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_collin = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '80' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_hochmont = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '60' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_obermont = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '100' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_obsubalp = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '90' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_subalpin = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '40' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_submontan = '1' 
UNION 
SELECT 
  sisf_nr :: int AS code, 
  '50' AS altitudinal_zone_code 
FROM 
  nat_arten_mstr 
WHERE 
  art_erk_zeik = '1' 
  AND art_hs_untermont = '1';
----------------------------------------------
-- recommendationtype
CREATE TYPE recommendationtype AS ENUM ('0', '1', '2', '3');
----------------------------------------------
-- relief
CREATE TYPE relief AS ENUM (
  'h_and_m', 'normal', 'w_and_s', 'kup', 
  'unknown'
);
CREATE TABLE relief_meta (
  source TEXT, de TEXT, fr TEXT, target relief
);
INSERT INTO relief_meta (source, de, fr, target) 
VALUES 
  (
    'Hang- oder Muldenlage', 'Hang- und Muldenlage', 
    'en pente ou dans une dépression', 
    'h_and_m'
  );
INSERT INTO relief_meta (source, de, fr, target) 
VALUES 
  (
    'Hang- und Muldenlage', 'Hang- und Muldenlage', 
    'en pente ou dans une dépression', 
    'h_and_m'
  );
INSERT INTO relief_meta (source, de, fr, target) 
VALUES 
  (
    'normal', 'normal', 'normal', 'normal'
  );
INSERT INTO relief_meta (source, de, fr, target) 
VALUES 
  (
    'Kuppenlage', 'Kuppenlage', 'sur une butte', 
    'kup'
  );
INSERT INTO relief_meta (source, de, fr, target) 
VALUES 
  (
    '', 'nicht relevant', 'pas important', 
    'unknown'
  );
----------------------------------------------
-- slope
CREATE TABLE slope_meta (target TEXT, de TEXT, fr TEXT);
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('<20', '<20%', '<20%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('>20', '>20%', '>20%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('<60', '<60%', '<60%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('<70', '<70%', '<70%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('>60', '>60%', '>60%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  ('>70', '>70%', '>70%');
INSERT INTO slope_meta (target, de, fr) 
VALUES 
  (
    'unknown', 'nicht relevant', 'pas important'
  );
----------------------------------------------
-- silver fir areaS
CREATE TABLE silver_fir_area_meta (
  source TEXT, de TEXT, fr TEXT, target TEXT
);
INSERT INTO silver_fir_area_meta (source, de, fr, target) 
VALUES 
  (
    'Hauptareal', 'Hauptareal', 'Aire principale', 
    '1'
  );
INSERT INTO silver_fir_area_meta (source, de, fr, target) 
VALUES 
  (
    'Nebenareal', 'Nebenareal', 'Aire secondaire', 
    '2'
  );
INSERT INTO silver_fir_area_meta (source, de, fr, target) 
VALUES 
  (
    'Reliktareal', 'Reliktareal', 'Aire relictuelle', 
    '3'
  );
INSERT INTO silver_fir_area_meta (source, de, fr, target) 
VALUES 
  (
    'nicht relevant', 'nicht relevant', 
    'pas important', 'unknown'
  );
----------------------------------------------
-- treetype
CREATE TYPE treetype AS ENUM (
  '100', '300', '600', '700', '800', '6900', 
  '9500', '25200', '25300', '25400', 
  '60400', '60500', '96900', '97200', 
  '97750', '97800', '113350', '137700', 
  '165000', '172200', '174200', '174300', 
  '213300', '217500', '217510', '220400', 
  '224200', '227200', '231500', '238050', 
  '252900', '287100', '293550', '302800', 
  '304900', '305500', '305800', '305900', 
  '306000', '306100', '308600', '317100', 
  '317300', '317500', '328400', '329700', 
  '330200', '330600', '335300', '335600', 
  '335800', '335900', '336000', '336100', 
  '336200', '345600', '346500', '362800', 
  '363700', '363900', '364000', '364200', 
  '364300', '365800', '402200', '402300', 
  '402500', '402600', '402700', '402750', 
  '413600', '421400', '421500', '422450', 
  '432800', '432900', '433000'
);
CREATE TABLE treetype_meta (
  target treetype PRIMARY KEY, de TEXT, 
  fr TEXT, la TEXT, endangered BOOLEAN, 
  nonresident BOOLEAN, pioneer BOOLEAN
);
INSERT INTO treetype_meta (
  target, de, fr, la, endangered, nonresident, 
  pioneer
) 
SELECT 
  foo.treetype, 
  nais.art_nam_deu, 
  nais.art_nam_frz, 
  nais.art_nam_lat, 
  baum.art_kaa :: boolean, 
  baum.art_gfa :: boolean, 
  baum.art_pionier :: boolean 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  LEFT JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
  LEFT JOIN nat_arten_baum baum ON nais.sisf_nr = baum.sisf_nr;
CREATE TABLE treetype_foresttype (
  treetype_code treetype REFERENCES treetype_meta, 
  foresttype_code TEXT REFERENCES foresttype_meta
);
INSERT INTO treetype_foresttype (treetype_code, foresttype_code) 
SELECT 
  foo.treetype AS treetype_code, 
  trim(
    BOTH 
    FROM 
      art.naistyp_c
  ) AS foresttype_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(NULL :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_naistyp_art art ON art.sisf_nr :: int :: text = foo.treetype :: text 
WHERE 
  art.vorh IN ('1', '2', '3') 
  AND trim(
    BOTH 
    FROM 
      naistyp_c
  ) IN (
    SELECT 
      code 
    FROM 
      foresttype_meta
  );
CREATE TABLE treetype_altitudinal_zone (
  treetype_code treetype REFERENCES treetype_meta, 
  altitudinal_zone_code TEXT
);
CREATE TABLE treetype_forest_ecoregion (
  treetype_code treetype REFERENCES treetype_meta, 
  forest_ecoregion_code TEXT
);
INSERT INTO treetype_forest_ecoregion (
  treetype_code, forest_ecoregion_code
) 
SELECT 
  foo.treetype AS treetype_code, 
  '1' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_1 = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '2a' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_2a = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '2b' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_2b = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '3' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_3 = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '4' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_4 = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '5a' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_5a = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '5a' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_5aa = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '5b' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_5b = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  'J' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_j = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  'M' AS forest_ecoregion_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_region_m = '1';
INSERT INTO treetype_altitudinal_zone (
  treetype_code, altitudinal_zone_code
) 
SELECT 
  foo.treetype AS treetype_code, 
  '20' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_collin = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '80' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_hochmont = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '60' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_obermont = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '100' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_obsubalp = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '90' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_subalpin = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '40' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_submontan = '1' 
UNION 
SELECT 
  foo.treetype AS treetype_code, 
  '50' AS altitudinal_zone_code 
FROM 
  (
    SELECT 
      unnest(
        enum_range(null :: treetype)
      ) AS treetype
  ) foo 
  JOIN nat_arten_mstr nais ON nais.sisf_nr = foo.treetype :: text 
WHERE 
  art_hs_untermont = '1';

CREATE TABLE locations (profile text, forestEcoregion text, altitudinalZone text, silverFirArea text, ecogramId int);
COPY locations 
FROM 
  '/data/locations.csv' DELIMITER ';' CSV HEADER;

CREATE TABLE ecograms (profile text, id int, x int, y int, w int, h int, r int, ox decimal, oy decimal, z int, f text);
COPY ecograms 
FROM 
  '/data/ecograms.csv' DELIMITER ';' CSV HEADER;

CREATE SCHEMA export;