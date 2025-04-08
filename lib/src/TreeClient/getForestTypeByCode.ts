import { TreeAppProfile } from "../types";
import { getProfilePrefix } from "../utils";

import TreeClient from "./";

export default function getForestTypeByCode<T>(
  this: TreeClient,
  code: string,
  fields: string[] = ["*"],
  profile: TreeAppProfile = "ch",
): null | T {
  const { data: forestType } = this.executeQuery<T>(
    `select ${fields.join(", ")} from ${getProfilePrefix(profile)}foresttype where code = '${code}'`,
  );
  return forestType?.[0] ?? null;
}
