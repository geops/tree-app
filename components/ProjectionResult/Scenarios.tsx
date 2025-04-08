import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { getScenarioButtonContent } from "@/utils/projectionResultUtils";

import Button from "../ui/Button";

import { ScenarioHeaderContent } from "./ScenarioHeader";
import ScenariosModal from "./ScenariosModal";

import type { LocationSubset } from "@/utils/projectionResultUtils";

export interface Scenario {
  name: string;
  projection: LocationSubset;
}

function ScenarioButton({
  name,
  onClick,
  projection,
}: {
  name: Scenario["name"];
  onClick: () => void;
  projection: Scenario["projection"];
}) {
  const { t } = useTranslation();
  const content = getScenarioButtonContent(name, t);

  if (!projection.altitudinalZone || !projection.forestType) return null;

  return (
    <Button
      className="flex grow items-center gap-2 border-2 bg-primary-300 text-white shadow-3d border-image-3d"
      onClick={onClick}
    >
      <ScenarioHeaderContent
        altitudinalZone={projection.altitudinalZone}
        forestType={projection.forestType}
        icons={content.icons}
        names={content.names}
        transitionForestType={projection.transitionForestType}
      />
    </Button>
  );
}

function Scenarios({ scenarios }: { scenarios?: Scenario[] }) {
  const [showModal, setShowModal] = useState(false);

  if (!scenarios?.length) return null;

  return (
    <div className="flex items-stretch bg-primary-600 p-5">
      {scenarios?.map((scenario, index) => (
        <Fragment key={scenario.name}>
          {index ? (
            <ChevronRightIcon className="h-10 w-10 self-center text-primary-300" />
          ) : null}
          <ScenarioButton
            name={scenario.name}
            onClick={() => setShowModal(true)}
            projection={scenario.projection}
          />
        </Fragment>
      ))}
      <ScenariosModal
        onClose={() => setShowModal(false)}
        open={showModal}
        scenarios={scenarios}
      />
    </div>
  );
}

export default Scenarios;
