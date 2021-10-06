import get from 'lodash.get';

import styles from './Diagram.module.css';

const forestTypeStyles = [styles.rare, styles.often, styles.medium];

export const getStyle = (data, path) => forestTypeStyles[get(data, path, 0)];

export const forestTypeMapping = [
  'Fi',
  'Ta',
  'WFö',
  'BFö',
  'Ei',
  'Lä',
  'Dg',
  'Bu',
  'Es',
  'BAh',
  'SAh',
  'SEi',
  'TEi',
  'WLi',
  'SLi',
  'Ki',
  'BUl',
  'FUl',
  'SEr',
  'GEr',
  'AEr',
  'HBi',
  'TKi',
  'VBe',
  'MBe',
  'Wei',
];

const utils = null;

export default utils;
