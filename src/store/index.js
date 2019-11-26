import { createStore } from 'redux';

import enhancers from './enhancers';
import reducers from './reducers';

export default createStore(reducers, enhancers);
