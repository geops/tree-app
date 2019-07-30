import React from 'react';

import ProjectionForm from './ProjectionForm';
import ProjectionMode from './ProjectionMode';
import ProjectionResult from './ProjectionResult';
import NoProjectionFound from './NoProjectionFound';

function Projection() {
  return (
    <>
      <ProjectionMode />
      <ProjectionForm />
      <NoProjectionFound />
      <ProjectionResult />
    </>
  );
}

export default Projection;
