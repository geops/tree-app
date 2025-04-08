import {
  Location,
  ProjectionQueryResult,
  ProjectOptionKey,
  ProjectProjection,
  ProjectResult,
} from "../types";
import {
  primaryProjectionFields as primaryFields,
  secondaryProjectionFields as secondaryFields,
} from "../utils";
import { validateFieldValue } from "../utils";

import TreeClient from ".";

function projectionReducer(
  this: TreeClient,
  location: Location,
  targetAltitudePointer: number,
  result: ProjectResult,
  altitudeList: string[],
): ProjectResult {
  const { options } = result;

  let projections: ProjectionQueryResult[] = [];
  const queryString = primaryFields.reduce(
    (acc, fieldName: ProjectOptionKey, index) => {
      let newString = acc;
      const { value, values } = this.getField(fieldName, location);
      validateFieldValue(fieldName, value, values);
      if (index === 0 || location[primaryFields[index - 1]]) {
        const newOptions = this.getProjectionOptions(
          newString.replace(
            "select *",
            `select distinct ${fieldName.toLowerCase()}`,
          ),
          fieldName,
        );
        // @ts-expect-error dev
        options[fieldName] = options[fieldName] ?? newOptions;
      }
      if (value) {
        newString += `${newString.includes("where") ? " and" : " where"} ${fieldName.toLowerCase()} = '${value as string}'`;
      }
      return newString;
    },
    "select * from projections",
  );

  if (primaryFields.every((field) => location[field])) {
    // Only run projection once all primary fields are defined
    const queryStringWithSecondaryFields = secondaryFields.reduce(
      (acc, fieldName: ProjectOptionKey) => {
        let newString = acc;
        const { value, values } = this.getField(fieldName, location);
        validateFieldValue(fieldName, value, values);
        const lowerCaseField = fieldName.toLowerCase();
        const newOptions = this.getProjectionOptions(
          newString.replace("select *", `select distinct ${lowerCaseField}`),
          fieldName,
        );
        // @ts-expect-error dev
        options[fieldName] = options[fieldName] ?? newOptions;
        const queryValue = value ?? options[fieldName]?.[0];
        if (queryValue) {
          const secondaryQueryString = `${newString}${newString.includes("where") ? " and" : " where"} ${lowerCaseField} = '${queryValue as string}'`;
          const { data } =
            this.executeQuery<ProjectionQueryResult>(secondaryQueryString);
          newString += `${newString.includes("where") ? " and" : " where"} ${lowerCaseField} = '${data.length ? (queryValue as string) : "unknown"}'`;
        }
        return newString;
      },
      queryString,
    );

    const { data } = this.executeQuery<ProjectionQueryResult>(
      queryStringWithSecondaryFields,
    );
    // console.log("location: ", location);
    console.log("QUERYSTRING: ", queryStringWithSecondaryFields);
    // console.log("projections: ", projections);
    projections = data;
  }

  if (projections?.length) {
    result.projections = [
      ...(result.projections ?? []),
      ...projections.reduce((acc, projection) => {
        const { targetaltitudinalzone: projTaz, targetforesttype: projTft } =
          projection;
        // console.log(altitudeList.indexOf(projTaz), targetAltitudePointer);

        const isValidProjection =
          altitudeList.indexOf(projTaz) <= targetAltitudePointer &&
          typeof projTft === "string";
        return isValidProjection
          ? [...acc, { altitudinalZone: projTaz, forestType: projTft }]
          : acc;
      }, [] as ProjectProjection[]),
    ];
  }

  // console.log("projectResult", { ...result, options });

  return { ...result, options };
}

export default projectionReducer;
