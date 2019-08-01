import React from 'react';

import ProjectionForm from './ProjectionForm';
import ProjectionMode from './ProjectionMode';
import ProjectionResult from './ProjectionResult';
import ProjectionError from './ProjectionError';

function Projection() {
  return (
    <>
      <ProjectionMode />
      <ProjectionForm />
      <ProjectionError />
      <ProjectionResult />
    </>
  );
}

export default Projection;
