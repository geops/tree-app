import ReduxQuerySync from 'redux-query-sync';

import {
  setFormLocation,
  setMapLayer,
  setMapView,
  setProjectionMode,
  setMapLocation,
} from '../actions';
import { initialState } from '../reducers';

const querySync = ReduxQuerySync.enhancer({
  params: {
    flfe: {
      selector: s => s.formLocation && s.formLocation.forestEcoregion,
      action: forestEcoregion => setFormLocation({ forestEcoregion }),
    },
    flaz: {
      selector: s => s.formLocation && s.formLocation.altitudinalZone,
      action: altitudinalZone => setFormLocation({ altitudinalZone }),
    },
    flft: {
      selector: s => s.formLocation && s.formLocation.forestType,
      action: forestType => setFormLocation({ forestType }),
    },
    fls: {
      selector: s => s.formLocation && s.formLocation.slope,
      action: slope => setFormLocation({ slope }),
    },
    fla: {
      selector: s => s.formLocation && s.formLocation.additional,
      action: additional => setFormLocation({ additional }),
    },
    flsfa: {
      selector: s => s.formLocation && s.formLocation.silverFirArea,
      action: silverFirArea => setFormLocation({ silverFirArea }),
    },
    flr: {
      selector: s => s.formLocation && s.formLocation.relief,
      action: relief => setFormLocation({ relief }),
    },
    fltaz: {
      selector: s => s.formLocation && s.formLocation.targetAltitudinalZone,
      action: targetAltitudinalZone =>
        setFormLocation({ targetAltitudinalZone }),
    },
    ml: {
      selector: state => state.mapLayer,
      action: setMapLayer,
      defaultValue: initialState.mapLayer,
    },
    mp: {
      selector: state => state.mapLocation && state.mapLocation.coordinate,
      valueToString: value => value.map(c => Math.round(c)).join('|'),
      stringToValue: value => value.split('|').map(parseFloat),
      action: coordinate => setMapLocation({ coordinate }),
    },
    mv: {
      selector: state => state.mapView,
      action: setMapView,
      defaultValue: initialState.mapView,
    },
    pm: {
      selector: state => state.projectionMode,
      action: setProjectionMode,
      defaultValue: initialState.projectionMode,
    },
  },
  initialTruth: 'location',
});

export default querySync;
