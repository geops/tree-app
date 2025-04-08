import parseQueryResult from "../utils/parseQueryResult";

import TreeClient from "./index";

function executeQuery<T>(
  this: TreeClient,
  query = "",
  raw = false,
): {
  data: T[];
  error: null | string;
} {
  const { db } = this;
  const queryResponse: { data: T[]; error: null | string } = {
    data: [],
    error: null,
  };
  try {
    if (!db) throw new Error("Can't connect to database");
    const queryResult = db.exec(query);
    queryResponse.data = raw
      ? (queryResult as T[])
      : parseQueryResult<T>(queryResult);
  } catch (error) {
    console.error(error);
    queryResponse.error = error as string;
  }
  return queryResponse;
}

export default executeQuery;
