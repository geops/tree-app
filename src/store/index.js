import { createStore } from 'redux';

import { setProjectionMode } from './actions';
import enhancers from './enhancers';
import reducers, { initialState } from './reducers';

const store = createStore(reducers, enhancers);

// Dispatch action to trigger project middleware for projection options.
store.dispatch(setProjectionMode(initialState.projectionMode));

export default store;
