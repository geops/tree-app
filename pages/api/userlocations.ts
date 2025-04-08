import { profiles } from "@geops/tree-lib";
import { Redis } from "@upstash/redis";

import type { TreeAppProfile } from "@geops/tree-lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  token: process.env.KV_REST_API_TOKEN!,
  url: process.env.KV_REST_API_URL!,
});

export type UserLocationData = {
  [key in TreeAppProfile]?: BackendPointDetails[];
};
export interface UserLocationResponse {
  data?: UserLocationData;
  error?: string;
  keys?: string[];
  message?: string;
}

export interface PointDetails {
  comment: string;
  coordinate: [number, number];
  querystring: string;
}

export interface BackendPointDetails extends PointDetails {
  id: string;
  timestamp: number;
}

interface PutPostData {
  data: PointDetails[];
  profile: TreeAppProfile;
}

async function getFullDataset() {
  const keys = (await redis.keys("*")) as TreeAppProfile[];
  const data: UserLocationData = {};
  for (const k of keys) {
    const value = await redis.get(k);
    data[k] = (value as BackendPointDetails[]) ?? [];
  }
  return data;
}

// async function getFullDatasetFlat(): Promise<PointDetails[]> {
//   const data = await getFullDataset();
//   return Object.values(data).flat();
// }

// async function createBufferPolygon(): Promise<MultiPolygon> {
//   const data = await getAllPoints();
//   const allPoints = Object.values(data).flat();
// }

// function validateSpatial(
//   data: PointDetails,
//   bufferPolygon: MultiPolygon,
// ): boolean {
//   const lonLat = toLonLat(data.coordinate, "EPSG:2056");
//   return !bufferPolygon.intersectsCoordinate(lonLat);
// }

function validateData(data: PutPostData): { errors: string[]; pass: boolean } {
  const errors: string[] = [];
  const { data: items, profile } = data;
  console.log(profiles, profile, !profiles.includes(profile));

  if (!profiles.includes(profile)) {
    errors.push(`profile ${profile as string} invalid`);
  }
  items.forEach((item) => {
    const { coordinate, querystring } = item;
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      !coordinate.every((c) => typeof c === "number")
    ) {
      errors.push(`coordinate ${JSON.stringify(coordinate)} invalid`);
    }

    if (
      !/^(\?(ml|fla|flaz|flfe|flft|flr|flsfa|flt|fltaz|fltft|fltraz)=[^&]*(?:&(fla|flaz|flfe|flft|flr|flsfa|flt|fltaz|fltft|fltraz|mv)=[^&]*)*)?$/.test(
        querystring,
      )
    ) {
      errors.push(`querystring ${querystring} invalid`);
    }
  });
  return { errors, pass: errors.length === 0 };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserLocationResponse>,
): Promise<void> {
  if (req.method === "POST") {
    const { data, profile } = req.body as PutPostData;

    const validation = validateData(req.body as PutPostData);
    if (!validation.pass) {
      res
        .status(400)
        .json({ error: `Invalid data: ${validation.errors.join(", ")}` });
      return;
    }

    try {
      const newValues = data.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      }));
      await redis.set(profile, newValues);
      res.status(200).json({ message: "Data stored successfully." });
    } catch (error) {
      console.error("Error storing data:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  } else if (req.method === "GET") {
    const { profile } = req.query;

    try {
      if (typeof profile === "string") {
        const value = await redis.get(profile);

        if (value === null) {
          res.status(404).json({ error: `profile ${profile} not found.` });
          return;
        }

        res.status(200).json({ [profile]: value });
      } else {
        const data = await getFullDataset();
        res.status(200).json({ data });
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  } else if (req.method === "PUT") {
    const { data, profile } = req.body as PutPostData;

    const validation = validateData({ data, profile });
    if (!Array.isArray(data) || !validation.pass) {
      res
        .status(400)
        .json({ error: `Invalid data: ${validation.errors.join(", ")}` });
      return;
    }

    try {
      const existingValue = (await redis.get(
        profile,
      )) as UserLocationData[TreeAppProfile];

      if (existingValue && !Array.isArray(existingValue)) {
        res.status(400).json({
          error: `Value ${existingValue as string} is not an array.`,
        });
        return;
      }

      const fullDataset = await getFullDataset();
      const newValues = data.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      }));
      if (!existingValue) {
        await redis.set(profile, data);
        res.status(200).json({
          data: {
            ...fullDataset,
            [profile]: newValues,
          },
          message: `New key ${profile} created successfully.`,
        });
        return;
      }

      const newData = [...existingValue, ...newValues];
      await redis.set(profile, newData);
      res.status(200).json({
        data: {
          ...fullDataset,
          [profile]: [...(fullDataset[profile] ?? []), ...newValues],
        },
        message: "Value updated successfully.",
      });
    } catch (error) {
      console.error("Error updating value:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      if (id && typeof id === "string") {
        const data = await getFullDataset();
        const profileToUpdate = Object.keys(data).find((key) => {
          return data[key as TreeAppProfile]?.some((item) => item.id === id);
        });
        if (!profileToUpdate) {
          res.status(404).json({ error: `id ${id} not found.` });
          return;
        }
        data[profileToUpdate as TreeAppProfile] = data[
          profileToUpdate as TreeAppProfile
        ]?.filter((item) => item.id !== id);
        await redis.set(
          profileToUpdate,
          data[profileToUpdate as TreeAppProfile],
        );
        res.status(200).json({
          data,
          message: `Feature with id ${id} removed successfully.`,
        });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).json({ error: "Method not allowed." });
  }
}
