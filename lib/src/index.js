import { version } from '../package.json';
import types from '../data/types.json';

export { default as info } from './info';
export { default as list } from './list';
export { default as locate } from './locate';
export { default as project } from './project';
export { default as recommend } from './recommend';
export { default as vegetation } from './vegetation';

export default { version, types };
