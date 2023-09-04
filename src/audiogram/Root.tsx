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
        width={1000}
        height={1000}
        schema={AudiogramSchema}
        defaultProps={{
          durationInSeconds: 0,
          audioOffsetInSeconds: 0,
          audioFile: "",
          coverImage: "",
          titleText: "",
          subtitles: "",
          backgroundImage: staticFile("audiogram/default-background.jpeg"),
          visualizeType: "bar",
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
