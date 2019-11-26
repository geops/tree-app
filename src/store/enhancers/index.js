import { compose } from 'redux';

import querySync from './querySync';
import projection from './projection';

export default compose(querySync, projection);
