import { renderMedia, selectComposition } from "@remotion/renderer";

const compositionId = "Audiogram";

const composition = await selectComposition({
  serveUrl: "bundled",
  id: compositionId,
});

await renderMedia({
  composition,
  serveUrl: "bundled",
  codec: "h264",
  onProgress: (progress) => console.log(progress),
  outputLocation: `out/${compositionId}.mp4`,
  // inputProps,
  logLevel: "verbose",
});

console.log("Render done!");
process.exit(0);
