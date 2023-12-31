import { FC, useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { Button, VStack } from "@chakra-ui/react";
import useAudioContext from "../contexts/AudioContext";
import axios from "axios";
import { fps } from "./Root";

export const Audiogram: FC = () => {
  const { audioInput } = useAudioContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedVideo, setRenderedVideo] = useState<string>();
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

  const handleVideoRendering = async () => {
    setIsLoading(true);

    const inputProps = {
      durationInSeconds,
      audioOffsetInSeconds,
      audioFile: audioFile,
      coverImage: coverImage,
      titleText: title,
      subtitles: srtFile,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post("/api/render", inputProps, { headers });

    if (response.status === 200) {
      setRenderedVideo(response.data.path);
      setIsLoading(false);
    }
  };

  return (
    <VStack justifyContent="center" gap={6}>
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
          backgroundColor: "#df5a4b",
          visualizeType: "bar",
        }}
      />

      {renderedVideo ? (
        <a href={renderedVideo} download>
          <Button colorScheme="telegram">Download video</Button>
        </a>
      ) : (
        <Button
          colorScheme="blue"
          onClick={handleVideoRendering}
          isLoading={isLoading}
          spinnerPlacement="end"
          loadingText="Rendering"
        >
          Render video
        </Button>
      )}
    </VStack>
  );
};
