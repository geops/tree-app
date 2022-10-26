import ReduxQuerySync from 'redux-query-sync';

import history from '../../history';
import {
  setForestTypeComparison,
  setForestTypeDescription,
  setForestTypeModal,
  setFormLocation,
  setMapLayers,
  setMapView,
  setProjectionMode,
  setMapLocation,
  setActiveProfile,
} from '../actions';
import { initialState } from '../reducers';

const querySync = ReduxQuerySync.enhancer({
  params: {
    flfe: {
      selector: (s) => s.formLocation && s.formLocation.forestEcoregion,
      action: (forestEcoregion) => setFormLocation({ forestEcoregion }),
    },
    flaz: {
      selector: (s) => s.formLocation && s.formLocation.altitudinalZone,
      action: (altitudinalZone) => setFormLocation({ altitudinalZone }),
    },
    fltraz: {
      selector: (s) =>
        s.formLocation && s.formLocation.transitionAltitudinalZone,
      action: (transitionAltitudinalZone) =>
        setFormLocation({ transitionAltitudinalZone }),
    },
    flft: {
      selector: (s) => s.formLocation && s.formLocation.forestType,
      action: (forestType) => setFormLocation({ forestType }),
    },
    flt: {
      selector: (s) => s.formLocation && s.formLocation.transition,
      valueToString: (value) => (value ? 't' : 'f'),
      stringToValue: (value) => value === 't',
      action: (transition) => setFormLocation({ transition }),
    },
    fltft: {
      selector: (s) => s.formLocation && s.formLocation.transitionForestType,
      action: (transitionForestType) =>
        setFormLocation({ transitionForestType }),
    },
    fls: {
      selector: (s) => s.formLocation && s.formLocation.slope,
      action: (slope) => setFormLocation({ slope }),
    },
    fla: {
      selector: (s) => s.formLocation && s.formLocation.additional,
      action: (additional) => setFormLocation({ additional }),
    },
    flsfa: {
      selector: (s) => s.formLocation && s.formLocation.silverFirArea,
      action: (silverFirArea) => setFormLocation({ silverFirArea }),
    },
    flr: {
      selector: (s) => s.formLocation && s.formLocation.relief,
      action: (relief) => setFormLocation({ relief }),
    },
    fltaz: {
      selector: (s) => s.formLocation && s.formLocation.targetAltitudinalZone,
      action: (targetAltitudinalZone) =>
        setFormLocation({ targetAltitudinalZone }),
    },
    ftc: {
      selector: (state) => state.forestTypeComparison,
      valueToString: (value) => value && value.join(),
      stringToValue: (value) => value.split(',').filter((v) => v),
      action: (ftc) => setForestTypeComparison(ftc, false),
    },
    ftd: {
      selector: (s) =>
        s.forestTypeDescription !== null && s.forestTypeDescription,
      action: (ftd) => setForestTypeDescription(ftd, false),
    },
    ftm: {
      selector: (state) => state.forestTypeModal,
      action: setForestTypeModal,
    },
    ml: {
      selector: (state) => state.mapLayers,
      valueToString: (value) => value.toString(),
      stringToValue: (value) => value?.split(',') || [],
      action: setMapLayers,
      defaultValue: initialState.mapLayers,
    },
    mp: {
      selector: (state) => state.mapLocation && state.mapLocation.coordinate,
      valueToString: (value) => value.map((c) => Math.round(c)).join('|'),
      stringToValue: (value) => value.split('|').map(parseFloat),
      action: (coordinate) => setMapLocation({ coordinate }),
    },
    mv: {
      selector: (state) => state.mapView,
      action: setMapView,
      defaultValue: initialState.mapView,
    },
    pm: {
      selector: (state) => state.projectionMode,
      action: setProjectionMode,
      defaultValue: initialState.projectionMode,
    },
    p: {
      selector: (state) => state.activeProfile,
      action: setActiveProfile,
      defaultValue: localStorage.getItem('tree.profile') || 'ch',
    },
  },
  initialTruth: 'location',
  history,
});

export default querySync;
