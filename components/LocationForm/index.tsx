import intersection from "lodash.intersection";
import { Trans, useTranslation } from "react-i18next";

import useStore from "@/store";

import { filterFields } from "../../utils/hooks/useTranslatedOptions";
import AltitudinalZoneField from "../AltitudinalZoneField";
import ForestEcoregionField from "../ForestEcoregionField";
import Accordion from "../ui/Accordion";
import Button from "../ui/Button";
import InfoModal from "../ui/Modal";

import AspectField from "./AspectField";
import CarbonateField from "./CarbonateField";
import GeomorphReliefField from "./GeomorphReliefField";
import GroupsField from "./GroupsField";
import IndicatorField from "./IndicatorField";
import SilverFirAreaField from "./SilverFirAreaField";
import SlopeField from "./SlopeField";
import TreeHeightField from "./TreeHeightField";
import TreeTypesField from "./TreeTypesField";

import type { Location } from "@geops/tree-lib/types";

function LocationForm() {
  const { t } = useTranslation();
  const formLocation = useStore((state) => state.formLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);

  return (
    <div className="flex flex-col gap-4 px-5">
      <ForestEcoregionField />
      <AltitudinalZoneField />
      <SilverFirAreaField />
      <div>
        <div className="my-4 flex items-center justify-between">
          <h2>{t("location.header")}</h2>
          <InfoModal className="!max-w-[800px]" title={t("location.header")}>
            <Trans i18nKey="location.help" />
          </InfoModal>
        </div>
        <Accordion
          items={[
            {
              content: <TreeTypesField />,
              key: "forestType.treeType",
              title: t("forestType.treeType.label"),
            },
            {
              content: <IndicatorField />,
              key: "forestType.indicator",
              title: t("forestType.indicator.label"),
            },
            {
              content: <TreeHeightField />,
              key: "forestType.treeHeight",
              title: t("forestType.treeHeight"),
            },
            {
              content: <CarbonateField />,
              key: "forestType.carbonate",
              title: t("forestType.carbonate.label"),
            },
            {
              content: <GeomorphReliefField />,
              key: "forestType.geomorphologyReliefType",
              title: (
                <>{`${t("forestType.geomorphology.label") as string} & ${
                  t("forestType.reliefType.label") as string
                }`}</>
              ),
            },
            {
              content: <AspectField />,
              key: "forestType.aspect",
              title: t("forestType.aspect.label"),
            },
            {
              content: <SlopeField />,
              key: "forestType.slope",
              title: t("forestType.slope.label"),
            },
            {
              content: <GroupsField />,
              key: "forestType.group",
              title: t("forestType.group.label"),
            },
          ]}
        />
        {intersection(
          Object.keys(formLocation).filter(
            (key): key is keyof Location =>
              formLocation[key as keyof Location] !== "",
          ),
          filterFields,
        )?.length > 0 && (
          <Button
            className="my-4"
            onClick={() => {
              const rfl = filterFields.reduce(
                (l, f) => ({ ...l, [f]: "" }),
                {},
              );
              setFormLocation(rfl);
            }}
          >
            {t("location.reset")}
          </Button>
        )}
      </div>
    </div>
  );
}

export default LocationForm;
