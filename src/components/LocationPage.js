import React from 'react';

import Ecogram from './Ecogram';
import ecogramData from './ecogram.json';

function LocationPage() {
  return (
    <div>
      <Ecogram data={ecogramData} />
    </div>
  );
}

export default LocationPage;
