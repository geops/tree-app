import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { project, getOptions } from '@geops/tree-lib';
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

const getDropdownOptions = i => ({
  key: i.key,
  text: i.label,
  value: i.key,
});

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

  return (
    <div className="container mx-auto">
      <span className="text-gray-700">{t(`forestEcoregion.label`)}</span>
      <Dropdown
        placeholder="Bitte aus der Liste auswählen"
        search
        selection
        clearable
        fluid
        options={getOptions('forestEcoregion', 'de').map(getDropdownOptions)}
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
        options={getOptions('heightLevel', 'de').map(getDropdownOptions)}
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
        options={getOptions('forestType', 'de').map(getDropdownOptions)}
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
