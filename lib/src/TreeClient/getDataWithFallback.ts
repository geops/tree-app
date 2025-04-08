import TreeClient from "../TreeClient";

function getDataWithFallback<T>(
  this: TreeClient,
  query: string,
  fallbackQuery: string,
): T[] {
  let dataa: T[] = [];
  try {
    const { data } = this.executeQuery<T>(query);
    if (!data?.length) {
      throw new Error(`No data for query: ${query}`);
    }
    dataa = data;
  } catch (error) {
    const { data } = this.executeQuery<T>(fallbackQuery);
    if (!data?.length) {
      throw new Error(`No data for query: ${fallbackQuery}`);
    }
    dataa = data;
  }
  return dataa;
}

export default getDataWithFallback;
