import { applyMiddleware, createStore } from 'redux';

import { projection } from './middleware';
import reducers from './reducers';

export default createStore(reducers, applyMiddleware(projection));
