import { QueryExecResult } from "sql.js";

import safeJsonParse from "./safeJsonParse";

function parseQueryResult<T>(queryResponse: QueryExecResult[]): T[] {
  const result = queryResponse?.[0];

  if (!result || !result.columns || !result.values) {
    return [];
  }

  const { columns, values } = result;

  return values.map((entry) =>
    columns.reduce((acc, column, idx) => {
      const raw = entry[idx];
      const value = safeJsonParse(raw);

      const isStringToNumber =
        typeof raw === "string" && typeof value === "number";

      acc[column as keyof T] = (isStringToNumber ? `${value}` : value) as T[keyof T];
      return acc;
    }, {} as T)
  );
}

export default parseQueryResult;
