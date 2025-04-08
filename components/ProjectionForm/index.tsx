import { Fieldset } from "@headlessui/react";

import AltitudinalZoneField from "../AltitudinalZoneField";
import CantonalForestTypeHeader from "../CantonalForestType";
import ForestEcoregionField from "../ForestEcoregionField";

import AdditionalField from "./AdditionalField";
import CantonalTransitionField from "./CantonalTransitionForestType";
import ForestTypeField from "./ForestTypeField";
import SilverFirAreaField from "./SilverFirAreaField";
import SlopeField from "./SlopeField";
import TargetAltitudinalZoneField from "./TargetAltitudinalZoneField";
import TransitionForestTypeField from "./TransitionFields";
import TransitionToggleField from "./TransitionSwitcherField";

function ProjectionForm() {
  return (
    <Fieldset as="div" className="sticky top-0 z-10 flex flex-col gap-6 px-5">
      <ForestEcoregionField />
      <AltitudinalZoneField optionsSource="projection" />
      <CantonalForestTypeHeader />
      <ForestTypeField />
      <TransitionToggleField />
      <TransitionForestTypeField />
      <SlopeField />
      <AdditionalField />
      <SilverFirAreaField />
      <TargetAltitudinalZoneField />
      <CantonalTransitionField />
    </Fieldset>
  );
}

export default ProjectionForm;
