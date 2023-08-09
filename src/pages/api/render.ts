import { NextApiRequest, NextApiResponse } from "next";
import { renderMedia, selectComposition } from "@remotion/renderer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await req.body;

      console.info(data);

      const fileName = data.audioFile.split("/")[7].split(".")[0];
      const filePath = `rendered/${fileName}.mp4`;

      console.info(filePath);

      const composition = await selectComposition({
        serveUrl: "bundled",
        id: "Audiogram",
        inputProps: data,
      });

      console.info(composition);

      await renderMedia({
        composition,
        serveUrl: "bundled",
        codec: "h264",
        onStart: (data) =>
          console.info(`Rendering started, data: ${JSON.stringify(data)}`),
        outputLocation: `public/${filePath}`,
        logLevel: "verbose",
      });

      console.info("Rendering done!");

      res.status(200).json({ message: "success", path: `/${filePath}` });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
