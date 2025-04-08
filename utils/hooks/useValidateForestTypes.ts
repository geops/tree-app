import useStore from "@/store";

export const useValidateForestTypes = <T>(codes = [], activeProfile = "ch") => {
  const treeClient = useStore((state) => state.treeClient);
  // @ts-expect-error fix using generic type later
  return codes.reduce((forestTypes, code) => {
    try {
      const nextFt = treeClient.getForestTypeByCode(
        "forestType",
        code,
        activeProfile,
      );
      return [...forestTypes, nextFt];
    } catch {
      // eslint-disable-next-line no-console
      console.error(
        new Error(
          `${code as string} is not a valid forest type in ${activeProfile} profile`,
        ),
      );
      return forestTypes;
    }
  }, [] as T[]);
};
