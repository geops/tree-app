import React, { useState } from 'react';
import Slider from './components/Slider';
import Dropdown from './components/Dropdown';
import { project, validTypes } from '@geops/tree-lib';

function getProjection(location) {
  try {
    return project(location);
  } catch (e) {
    return e.message;
  }
}

function App() {
  const [location, setLocation] = useState({});
  const [slopeActive, setSlopeActive] = useState(false);

  const switchSlopeActive = checkbox => {
    setLocation({ ...location, slope: 'unknown' });
    setSlopeActive(checkbox.target.checked);
  };

  const SliderDisplay = !slopeActive ? (
    <Slider
      label="Slope"
      min={10}
      max={100}
      onChange={slope => setLocation({ ...location, slope })}
    />
  ) : (
    ''
  );

  return (
    <div className="container mx-auto">
      <Dropdown
        label="Regions"
        values={validTypes.forestEcoregion}
        onChange={forestEcoregion =>
          setLocation({ ...location, forestEcoregion })
        }
      />
      <Dropdown
        label="heightlevel"
        values={validTypes.heightLevel}
        onChange={heightLevel => setLocation({ ...location, heightLevel })}
      />
      <Dropdown
        label="forestType"
        values={validTypes.forestType.sort()}
        onChange={forestType => setLocation({ ...location, forestType })}
      />
      Use Slope as (unknown):
      <input
        type="checkbox"
        id="myCheck"
        onClick={checkbox => switchSlopeActive(checkbox)}
      />
      {SliderDisplay}
      <p>Result: {getProjection(location)}</p>
    </div>
  );
}

export default App;
