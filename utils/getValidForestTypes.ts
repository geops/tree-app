import useStore from "@/store";

export const getValidForestTypes = <T>(
  codes: string[] = [],
  activeProfile = "ch",
): T[] => {
  const { treeClient } = useStore.getState();
  // @ts-expect-error fix using generic type later
  return codes.reduce((forestTypes, code) => {
    try {
      const nextFt = treeClient.getForestTypeByCode<T>(
        code,
        undefined,
        activeProfile,
      );
      return [...forestTypes, nextFt];
    } catch {
      // eslint-disable-next-line no-console
      console.error(
        new Error(
          `${code} is not a valid forest type in ${activeProfile} profile`,
        ),
      );
      return forestTypes;
    }
  }, []);
};
