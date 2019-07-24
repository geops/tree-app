import { SET_MAP_LOCATION } from './actions';

const initialState = { mapLocation: {} };

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return { ...state, mapLocation: action.mapLocation };
    default:
      return state;
  }
}

export default tree;
