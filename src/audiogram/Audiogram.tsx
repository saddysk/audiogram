import { FC } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { fps } from "./Composition";
import { staticFile } from "remotion";

export const Audiogram: FC = () => {
  const durationInSeconds = 100;

  return (
    <>
      <Player
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "10px",
        }}
        component={AudiogramPlayer}
        schema={AudiogramSchema}
        compositionWidth={1000}
        compositionHeight={1000}
        fps={fps}
        durationInFrames={durationInSeconds * fps}
        controls
        loop
        inputProps={{
          durationInSeconds,
          audioOffsetInSeconds: 6.9,
          audioFile: staticFile("audiogram/audio.mp3"),
          coverImage: staticFile("audiogram/cover-rem.jpg"),
          titleText: "#234 Choosing Your Market with Justin Jackson",
          subtitlesFileName: staticFile("audiogram/subtitles.srt"),
        }}
      />
    </>
  );
};
