import { FC, useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { Button, VStack } from "@chakra-ui/react";
import useAudioContext from "../contexts/AudioContext";
import { fps } from "./Composition";

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
    <VStack justifyContent="center" gap={6}>
      <Player
        style={{
          width: "350px",
          height: "375px",
          borderRadius: "12px",
          backgroundColor: "#1b1a18",
        }}
        component={AudiogramPlayer}
        schema={AudiogramSchema}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={fps}
        durationInFrames={durationInSeconds * fps}
        controls
        loop
        inputProps={{
          // !Audio settings
          durationInSeconds,
          audioOffsetInSeconds,

          // !Title settings
          audioFileName: audioFile,
          coverImgFileName: coverImage,
          titleText: title,
          titleColor: "rgba(186, 186, 186, 0.93)",

          // !Subtitles settings
          subtitles: srtFile,
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
          subtitlesLinePerPage: 3,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,

          // !Wave settings
          waveColor: "#a3a5ae",
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 40,
          waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
          mirrorWave: true,
        }}
      />

      <Button colorScheme="blue">Render video</Button>
    </VStack>
  );
};
