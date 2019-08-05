import React from 'react';

import ProjectionForm from './ProjectionForm';
import ProjectionMode from './ProjectionMode';
import ProjectionResult from './ProjectionResult';

function Projection() {
  return (
    <>
      <ProjectionMode />
      <ProjectionForm />
      <ProjectionResult />
    </>
  );
}

export default Projection;
