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
  subtitles,
  backgroundColor,
  visualizeType,
}) => {
  const {
    titleColor,
    subtitlesTextColor,
    subtitlesLinePerPage,
    subtitlesLineHeight,
    subtitlesZoomMeasurerSize,
    waveColor,
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
        <div className="container" style={{ backgroundColor: backgroundColor }}>
          <div className="row">
            <div className="title" style={{ color: titleColor }}>
              {titleText}
            </div>
            <Img className="cover" src={coverImage} />
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

          <div className="wave">
            <AudioWave
              audioSrc={audioFile}
              mirrorWave={mirrorWave}
              waveColor={waveColor}
              numberOfSamples={Number(waveNumberOfSamples)}
              freqRangeStartIndex={waveFreqRangeStartIndex}
              waveLinesToDisplay={waveLinesToDisplay}
              visualizeType={visualizeType}
            />
          </div>
        </div>
      </Sequence>
    </div>
  );
};
