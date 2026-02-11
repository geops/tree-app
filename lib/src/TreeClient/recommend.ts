import difference from "lodash.difference";
import intersection from "lodash.intersection";
import union from "lodash.union";
import xor from "lodash.xor";

import { Location, ProjectProjection, TreeAppProfile } from "../types";
import removeDuplicates from "../utils/removeDuplicates";

import TreeClient from "./";

function recommend(
  this: TreeClient,
  location: Location,
  projections: Location[] | ProjectProjection[],
  future = false,
  profile?: TreeAppProfile,
) {
  if (!location.forestType) {
    throw new Error("location.forestType is required");
  }
  if (projections.reduce((c, p) => (p.forestType ? c + 1 : c), 0) < 1) {
    throw new Error("at least 1 projected forestType is required");
  }
  if (future && typeof future !== "boolean") {
    throw new Error(`expected boolean type for future flag`);
  }
  const [today1, today2, today3, today4] = this.getVegetationList(location, undefined, profile);
  const t123 = union(today1, today2, today3);
  const p = projections.map((x) => this.getVegetationList(x, undefined, profile));
  const p12 = p.map(([x1, x2]) => union(x1, x2));
  const p3 = p.map(([, , x3]) => x3);
  const p4 = p.map(([, , , x4]) => x4);
  const pAll = p.map((x) => union(...x));
  const isFuture = (x: number[]) => (future ? x : []);
  const isMulti = (x: number[]) => (projections.length > 1 ? x : []);
  return this.sortTreeTypes(
    removeDuplicates(
      intersection(t123, intersection(...p12)), //                                   Level 1
      isMulti(intersection(t123, intersection(xor(...p12), xor(...p3)))), //         Level 2/3
      isFuture(difference(intersection(...p12), t123)), //                           Level 4
      isFuture(
        isMulti(difference(intersection(xor(...p12), xor(...p3)), t123)),
      ), //                                                                          Level 5/6
      intersection(t123, intersection(...p3)), //                                    Level 7
      isMulti(intersection(t123, difference(xor(...p12), xor(...p3)))), //           Level 8/9
      isFuture(difference(intersection(...p3), t123)), //                            Level 10
      isFuture(
        isMulti(
          union(
            difference(difference(xor(...p12), union(...p3)), t123),
            difference(difference(xor(...p3), union(...p12)), t123),
          ),
        ),
      ), //                                                                          Level 11/12/13/14
      union(
        intersection(t123, difference(xor(...p3), union(...p12))),
        difference(t123, union(...pAll)),
      ), //                                                                          Level 15/16/17
      union(today4, ...p4), //                                                       Level 18 (attention)
      // @ts-expect-error dev
      isFuture(difference(xor(...p4), ...today4)), //                                Level 19 (attention)
    ),
  );
}

export default recommend;
