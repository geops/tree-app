// pages/api/[...path].ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const requestedPath = (req.query.path as string[]).join("/");
    const filePath = path.join(process.cwd(), "tiles", requestedPath);

    if (!fs.existsSync(filePath)) {
      res.status(404).end("Tile not found");
      return;
    }

    res.setHeader("Content-Type", "application/vnd.mapbox-vector-tile");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (requestedPath.startsWith("tree/")) {
      res.setHeader("Content-Type", "application/vnd.mapbox-vector-tile");
      res.setHeader("Content-Encoding", "gzip");
    }

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).end("Internal Server Error");
  }
}