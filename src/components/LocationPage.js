import React from 'react';

import LocationForm from './LocationForm';
import ProjectionMode from './ProjectionMode';
import Ecogram from './Ecogram';
import ForestTypeModal from './ForestTypeModal';

function LocationPage() {
  return (
    <>
      <ProjectionMode />
      <LocationForm />
      <Ecogram />
      <ForestTypeModal />
    </>
  );
}

export default LocationPage;
