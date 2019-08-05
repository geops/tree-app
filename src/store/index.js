import { applyMiddleware, compose, createStore } from 'redux';

import { setProjectionMode } from './actions';
import { querySync } from './enhancers';
import { projection } from './middlewares';
import reducers, { initialState } from './reducers';

const composedEnhancers = compose(
  querySync,
  applyMiddleware(projection),
);

const store = createStore(reducers, composedEnhancers);

// Dispatch action to trigger project middleware for projection options.
store.dispatch(setProjectionMode(initialState.projectionMode));

export default store;
