import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { project, validTypes } from '@geops/tree-lib';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown } from 'semantic-ui-react';
import Slider from './components/Slider';

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
  const { t } = useTranslation();

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

  const listForestTypes = validTypes.forestType.map((forest, index) => ({
    key: index + 2321,
    text: forest,
    value: forest,
  }));

  const listHeightLevel = validTypes.heightLevel.map((height, index) => ({
    key: index + 5556,
    text: height,
    value: height,
  }));

  const listForestRegion = validTypes.forestEcoregion.map((region, index) => ({
    key: index + 9635,
    text: region,
    value: region,
  }));

  return (
    <div className="container mx-auto">
      <span className="text-gray-700">{t(`forestEcoregion.label`)}</span>
      <Dropdown
        placeholder="Bitte aus der Liste auswählen"
        search
        selection
        clearable
        fluid
        options={listForestRegion}
        onChange={(e, { value }) => {
          setLocation({ ...location, forestEcoregion: value });
        }}
      />
      <br />
      <span className="text-gray-700">{t(`heightLevel.label`)}</span>
      <Dropdown
        placeholder="Bitte aus der Liste auswählen"
        search
        selection
        clearable
        fluid
        options={listHeightLevel}
        onChange={(none, { value }) => {
          setLocation({ ...location, heightLevel: value });
        }}
      />
      <br />
      <span className="text-gray-700">{t(`forestType.label`)}</span>
      <Dropdown
        placeholder="Bitte aus der Liste auswählen"
        search
        selection
        fluid
        clearable
        options={listForestTypes}
        onChange={(e, { value }) => {
          setLocation({ ...location, forestType: value });
        }}
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
