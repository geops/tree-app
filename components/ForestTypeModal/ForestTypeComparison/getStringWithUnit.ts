import parseString from "@/utils/parseString";

export const getStringWithUnit = (data: string | undefined, unit: string) => {
  return data ? parseString(`${data}${unit || ""}`) : "-";
};
