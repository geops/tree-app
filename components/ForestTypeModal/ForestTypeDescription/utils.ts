import get from "lodash.get";

import { medium, often, rare } from "./styles";

const forestTypeStyles = [rare, often, medium];

export const getStyle = (data = {}, path = "") =>
  forestTypeStyles[get(data, path, 0)];

const utils = null;

export default utils;
