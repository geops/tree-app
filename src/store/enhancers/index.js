import { compose } from 'redux';

import querySync from './querySync';
import projection from './projection';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

export default composeEnhancers(querySync, projection);
