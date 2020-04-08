import React from 'react';

import LocationForm from './LocationForm';
import LocationResult from './LocationResult';
import ProjectionMode from './ProjectionMode';

function LocationPage() {
  return (
    <>
      <ProjectionMode />
      <LocationForm />
      <LocationResult />
    </>
  );
}

export default LocationPage;
