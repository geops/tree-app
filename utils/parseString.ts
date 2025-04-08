import parse from "html-react-parser";

export const parseString = (str: string) =>
  str && parse(str.slice().replace(/\\n/g, "<br>"));

export default parseString;
