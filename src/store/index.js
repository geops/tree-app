import { applyMiddleware, compose, createStore } from 'redux';

import { querySync } from './enhancers';
import { projection } from './middlewares';
import reducers from './reducers';

const composedEnhancers = compose(
  querySync,
  applyMiddleware(projection),
);

export default createStore(reducers, composedEnhancers);
