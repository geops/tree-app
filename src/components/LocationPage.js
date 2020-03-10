import React from 'react';

import LocationForm from './LocationForm';
import ProjectionMode from './ProjectionMode';
import Ecogram from './Ecogram';

function LocationPage() {
  return (
    <>
      <ProjectionMode />
      <LocationForm />
      <Ecogram />
    </>
  );
}

export default LocationPage;
