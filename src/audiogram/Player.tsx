import { FC, useRef } from "react";
import { Audio, Img, Sequence, useVideoConfig } from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import { AudioWave } from "./AudioWave";
import { constants } from "./const";

interface AudiogramPlayerProps {
  audioOffsetInSeconds: number;
  audioFile: string;
  coverImage: string;
  titleText: string;
  subtitles: string;
  backgroundColor: string;
  visualizeType: string;
}

export const AudiogramPlayer: FC<AudiogramPlayerProps> = ({
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

  const ref = useRef<HTMLDivElement>(null);
  const { durationInFrames, fps } = useVideoConfig();

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
              visualizeType={visualizeType}
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
            />
          </div>
        </div>
      </Sequence>
    </div>
  );
};
