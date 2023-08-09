import { NextApiRequest, NextApiResponse } from "next";
import { renderMedia, selectComposition } from "@remotion/renderer";

const compositionId = "Audiogram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await req.body;

      const composition = await selectComposition({
        serveUrl: "bundled",
        id: compositionId,
      });

      await renderMedia({
        composition,
        serveUrl: "bundled",
        codec: "h264",
        onStart: (data) =>
          console.log(`Rendering started, data: ${JSON.stringify(data)}`),
        outputLocation: `out/${compositionId}-1.mp4`,
        inputProps: data,
        logLevel: "verbose",
      });

      console.log("Rendering done!");

      res.status(200).send("Video renedered successfully!");
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
