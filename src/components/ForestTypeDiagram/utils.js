import get from 'lodash.get';

import styles from './Diagram.module.css';

const forestTypeStyles = [styles.rare, styles.medium, styles.often];

export const getStyle = (data, path) => forestTypeStyles[get(data, path, 0)];

export default null;
