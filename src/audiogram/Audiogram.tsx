import { FC } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { fps } from "./Root";
import { staticFile } from "remotion";
import { VStack } from "@chakra-ui/react";

export const Audiogram: FC = () => {
  const durationInSeconds = 100;

  return (
    <VStack justifyContent="center" mt={40}>
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
        inputProps={{
          durationInSeconds,
          audioOffsetInSeconds: 6.9,
          audioFile: staticFile("audiogram/audio.mp3"),
          coverImage: staticFile("audiogram/cover.jpg"),
          titleText: "Brian Chesky's new playbook",
          captionText: "Lenis Podcast",
          subtitles: staticFile("audiogram/subtitles.srt"),
          backgroundColor: "#4E37AB",
          visualizeType: "bar",
        }}
        durationInFrames={durationInSeconds * fps}
        controls
        loop
      />
    </VStack>
  );
};
