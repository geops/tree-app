import { createStore } from 'redux';
import tree from './reducers';

export default createStore(tree);
