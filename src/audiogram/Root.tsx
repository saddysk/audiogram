import { FC } from "react";
import "/src/styles/style.css";
import { Composition } from "remotion";
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
          durationInSeconds: 0,
          audioOffsetInSeconds: 0,
          audioFile: "",
          coverImage: "",
          titleText: "",
          subtitlesFileName: "",
          backgroundImage: "",
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
