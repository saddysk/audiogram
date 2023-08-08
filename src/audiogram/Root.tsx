import { FC } from "react";
import "/src/styles/style.css";
import { Composition, staticFile } from "remotion";
import { AudiogramComposition, fps } from "./Composition";
import { AudiogramSchema } from "./Schema";

const RemotionRoot: FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1920}
        height={1080}
        schema={AudiogramSchema}
        defaultProps={{
          durationInSeconds: 29.5,
          audioOffsetInSeconds: 6.9,
          audioFile: staticFile("audiogram/audio.mp3"),
          coverImage: staticFile("audiogram/cover.jpg"),
          titleText:
            "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
          subtitles: staticFile("audiogram/subtitles.srt"),
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * fps,
            props,
          };
        }}
      />
    </>
  );
};

export default RemotionRoot;
