function merge(
  target: object = {},
  source: object = {},
  undefinedOverwrite = true,
): object {
  return Object.entries(source).reduce(
    (acc, [key, value]) => {
      if (!undefinedOverwrite && value === undefined) {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { ...acc, [key]: value };
    },
    { ...target },
  );
}

export default merge;
