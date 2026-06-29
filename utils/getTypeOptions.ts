interface TypeRecordWithCode {
  code: string;
}

interface TreeClientLike {
  getTypes: <T>(
    type: string,
    columns?: string[],
    where?: { code: string },
  ) => T[];
}

interface GetTypeOptionsParams<T extends TypeRecordWithCode, O> {
  codes: string[];
  columns: string[];
  mapOption: (record: T) => O;
  quoteCodes?: boolean;
  treeClient: TreeClientLike;
  type: string;
}

export const getCodeInFilter = (codes?: string[], quoteCodes = true) => {
  if (!codes?.length) {
    return undefined;
  }

  const values = codes.map((code) => (quoteCodes ? `'${code}'` : `${code}`));
  return { code: `IN (${values.join(", ")})` };
};

export const getTypeOptions = <T extends TypeRecordWithCode, O>({
  codes,
  columns,
  mapOption,
  quoteCodes = true,
  treeClient,
  type,
}: GetTypeOptionsParams<T, O>): O[] => {
  if (!codes.length) {
    return [];
  }

  const codeSet = new Set(codes);
  const rows = treeClient.getTypes<T>(
    type,
    columns,
    getCodeInFilter(codes, quoteCodes),
  );

  return (
    rows?.filter((row) => codeSet.has(row.code)).map((row) => mapOption(row)) ??
    []
  );
};
