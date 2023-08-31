import { FC, useRef } from "react";
import { Audio, Img, Sequence, useVideoConfig } from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import { AudioWave } from "./AudioWave";
import { AudiogramSchema } from "./Schema";
import { z } from "zod";
import { constants } from "./const";

export const fps = 30;

type AudiogramCompositionSchemaType = z.infer<typeof AudiogramSchema>;

export const AudiogramComposition: FC<AudiogramCompositionSchemaType> = ({
  audioOffsetInSeconds,
  audioFile,
  coverImage,
  titleText,
  subtitles,
  backgroundColor,
}) => {
  const {
    titleColor,
    onlyDisplayCurrentSentence,
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

  const ref = useRef<HTMLDivElement>(null);
  const { durationInFrames } = useVideoConfig();

  if (!subtitles) {
    return null;
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div ref={ref}>
      <Audio
        src={audioFile}
        startFrom={audioOffsetInFrames}
        endAt={audioOffsetInFrames + durationInFrames}
      />
      <Sequence from={-audioOffsetInFrames}>
        <div
          className="container"
          style={{ backgroundColor: backgroundColor, fontFamily: "DM Sans" }}
        >
          <div className="title" style={{ color: titleColor }}>
            {titleText}
          </div>

          <div className="row">
            <div className="coverContainer">
              <Img className="cover" src={coverImage} />
            </div>
            <AudioWave
              audioSrc={audioFile}
              mirrorWave={mirrorWave}
              waveColor={waveColor}
              numberOfSamples={Number(waveNumberOfSamples)}
              freqRangeStartIndex={waveFreqRangeStartIndex}
              waveLinesToDisplay={waveLinesToDisplay}
            />
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
              onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
            />
          </div>
        </div>
      </Sequence>
    </div>
  );
};
