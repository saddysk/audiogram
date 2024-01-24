import { FC } from "react";
import { Audio, Img, Sequence, useVideoConfig } from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import { AudioWave } from "./AudioWave";
import { AudiogramSchema } from "./Schema";
import { z } from "zod";
import { constants } from "./const";

type AudiogramCompositionSchemaType = z.infer<typeof AudiogramSchema>;

export const AudiogramComposition: FC<AudiogramCompositionSchemaType> = ({
  audioOffsetInSeconds,
  audioFile,
  coverImage,
  titleText,
  captionText,
  subtitles,
  backgroundColor,
  visualizeType,
}) => {
  const {
    subtitlesTextColor,
    subtitlesLinePerPage,
    subtitlesLineHeight,
    subtitlesZoomMeasurerSize,
    waveLinesToDisplay,
    waveFreqRangeStartIndex,
    waveNumberOfSamples,
    mirrorWave,
  } = constants;

  const { durationInFrames, fps } = useVideoConfig();

  if (!subtitles) {
    return null;
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div>
      <Audio
        src={audioFile}
        startFrom={audioOffsetInFrames}
        endAt={audioOffsetInFrames + durationInFrames}
      />
      <Sequence from={-audioOffsetInFrames}>
        <div className="container">
          {/* <div className="overlay" /> */}
          <div className="row">
            <Img className="cover" src={coverImage} />
            <div>
              <h1 className="title">{titleText}</h1>
              <h2 className="title-caption">{captionText}</h2>
            </div>
          </div>

          <div
            style={{ lineHeight: `${subtitlesLineHeight}px` }}
            className="captions"
          >
            <PaginatedSubtitles
              subtitles={subtitles}
              startFrame={audioOffsetInFrames}
              endFrame={audioOffsetInFrames + durationInFrames}
              linesPerPage={subtitlesLinePerPage}
              subtitlesTextColor={subtitlesTextColor}
              subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
              subtitlesLineHeight={subtitlesLineHeight}
            />
          </div>

          <AudioWave
            audioSrc={audioFile}
            mirrorWave={mirrorWave}
            waveColor={backgroundColor}
            numberOfSamples={Number(waveNumberOfSamples)}
            freqRangeStartIndex={waveFreqRangeStartIndex}
            waveLinesToDisplay={waveLinesToDisplay}
            visualizeType={visualizeType}
          />
        </div>
      </Sequence>
    </div>
  );
};
