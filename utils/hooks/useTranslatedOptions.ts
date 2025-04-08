import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import capitalize from "@/utils/capitalize";

import { DropdownOption } from "../../components/ui/Dropdown";
import translation from "../../i18n/resources/de/translation.json";

const noLabel = (key: string) => key !== "label" && key !== "other";
export const translationOptions: Record<string, string[]> = {
  aspect: Object.keys(translation.forestType.aspect).filter(noLabel).sort(),
  geomorphology: Object.keys(translation.forestType.geomorphology).filter(
    noLabel,
  ),
  group: Object.keys(translation.forestType.group).filter(noLabel),
  reliefType: Object.keys(translation.forestType.reliefType).filter(noLabel),
  slope: Object.keys(translation.forestType.slope).filter(noLabel).sort(),
  yesNoUnknown: Object.keys(translation.forestType.yesNoUnknown),
};

const getTranslatedOption =
  (category: string, t: (key: string) => void) =>
  (key: string): DropdownOption => ({
    filterValue: `${t(`forestType.${category}.${key}`) as unknown as string}`,
    label: `${t(`forestType.${category}.${key}`) as unknown as string}`,
    value: key,
  });

const getField = (key: string, suffix: string) => `${suffix}${capitalize(key)}`;

const geoMorphFields = translationOptions.geomorphology.map((key) =>
  getField(key, "geomorphology"),
);
const reliefTypeFields: string[] = translationOptions.reliefType.map((key) =>
  getField(key, "reliefType"),
);
export const filterFields = [
  "treeTypes",
  "indicators",
  "treeLayerHeightMin",
  "treeLayerHeightMax",
  "coniferTreeHeightMax",
  "deciduousTreeHeightMax",
  "carbonateFine",
  "carbonateRock",
  ...geoMorphFields,
  ...reliefTypeFields,
  "aspects",
  "slopes",
  "forestEcoregion",
  "altitudinalZone",
  "silverFirArea",
  "groups",
];

function useTranslatedOptions(category: string) {
  const { t } = useTranslation();
  const options: DropdownOption[] = useMemo(() => {
    return translationOptions[category]?.map(getTranslatedOption(category, t));
  }, [category, t]);
  return options;
}

export default useTranslatedOptions;
