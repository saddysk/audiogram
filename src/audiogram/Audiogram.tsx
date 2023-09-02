import { FC, useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import useAudioContext from "../contexts/AudioContext";
import { fps } from "./Composition";
import { staticFile } from "remotion";

export const Audiogram: FC = () => {
  const { audioInput } = useAudioContext();
  const { title, audioFile, srtFile, coverImage, duration } = audioInput;

  const [durationInSeconds, setDurationInSeconds] = useState<number>();

  useEffect(() => {
    const audioDuration = (duration.endTime - duration.startTime) * 60;

    setDurationInSeconds(Math.round(audioDuration));
  }, [duration]);

  if (!durationInSeconds) {
    return <>Invalid audio length.</>;
  }

  const audioOffsetInSeconds = Math.round(duration.startTime * 60);

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
          audioOffsetInSeconds,
          audioFile: audioFile,
          coverImage: coverImage,
          titleText: title,
          subtitles: srtFile,
          backgroundImage: staticFile("audiogram/default-background.jpeg"),
        }}
      />
    </>
  );
};
