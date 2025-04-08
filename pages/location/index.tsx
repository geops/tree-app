import { Fieldset } from "@headlessui/react";

import FormHeader from "@/components/FormHeader";
import LocationForm from "@/components/LocationForm";
import LocationResult from "@/components/LocationResult";

function Location() {
  return (
    <Fieldset className="flex flex-col gap-4">
      <FormHeader />
      <LocationForm />
      <LocationResult />
    </Fieldset>
  );
}

export default Location;
