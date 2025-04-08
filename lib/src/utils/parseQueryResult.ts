import { QueryExecResult } from "sql.js";

import safeJsonParse from "./safeJsonParse";

function parseQueryResult<T>(queryResponse: QueryExecResult[]): T[] {
  const [{ columns, values }] = queryResponse;
  if (!values) {
    throw new Error("No data found");
  }

  return values.map((entry) => {
    return columns.reduce((acc, column, idx) => {
      const value = safeJsonParse(entry[idx]);
      const isStringToNumber =
        typeof entry[idx] === "string" && typeof value === "number"; // JSON.parse converts strings to numbers
      return { ...acc, [column]: isStringToNumber ? `${value}` : value };
    }, {} as T);
  }, []);
}

export default parseQueryResult;
