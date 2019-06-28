import React, { useState } from 'react';
import { project, validTypes } from '@geops/tree-lib';
import Slider from './components/Slider';
import Dropdown from './components/Dropdown';

function getProjection(location) {
  try {
    return project(location);
  } catch (e) {
    return e.message;
  }
}

const forestRegWithEmptyInit = ['', ...validTypes.forestEcoregion];
const heightWithEmptyInit = ['', ...validTypes.heightLevel];
const forestTypeWithEmptyInit = ['', ...validTypes.forestType];

function App() {
  const [location, setLocation] = useState({});
  const [slopeActive, setSlopeActive] = useState(false);

  const switchSlopeActive = checkbox => {
    setLocation({ ...location, slope: 'unknown' });
    setSlopeActive(checkbox.target.checked);
  };

  const SliderDisplay = !slopeActive ? (
    <Slider
      label="Hangneigung"
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
        label="Waldstandortsregionen"
        values={forestRegWithEmptyInit.sort()}
        onChange={forestEcoregion =>
          setLocation({ ...location, forestEcoregion })
        }
      />
      <Dropdown
        label="Höhenstufe"
        values={heightWithEmptyInit}
        onChange={heightLevel => setLocation({ ...location, heightLevel })}
      />
      <Dropdown
        label="Standorttyp"
        values={forestTypeWithEmptyInit.sort()}
        onChange={forestType => setLocation({ ...location, forestType })}
      />
      <br />
      Hangneigung unbekannt:
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
