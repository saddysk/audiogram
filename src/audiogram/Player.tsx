import { FC, useEffect, useState } from "react";
import {
  Audio,
  Img,
  Sequence,
  continueRender,
  delayRender,
  useVideoConfig,
} from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import { AudioWave } from "./AudioWave";
import { constants } from "./const";

interface AudiogramPlayerProps {
  audioOffsetInSeconds: number;
  audioFile: string;
  coverImage: string;
  titleText: string;
  captionText: string;
  subtitles: string;
  backgroundColor: string;
  visualizeType: string;
}

export const AudiogramPlayer: FC<AudiogramPlayerProps> = ({
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

  const [handle] = useState(() => delayRender());
  const [subtitlesText, setSubtitlesText] = useState<string | null>(null);

  useEffect(() => {
    fetch(subtitles)
      .then((res) => res.text())
      .then((text) => {
        setSubtitlesText(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, subtitles]);

  if (!subtitlesText) {
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
            <div className="title-container">
              <h1 className="title">{titleText}</h1>
              <h2 className="title-caption">{captionText}</h2>
            </div>
          </div>

          <div
            style={{ lineHeight: `${subtitlesLineHeight}px` }}
            className="captions"
          >
            <PaginatedSubtitles
              subtitles={subtitlesText}
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
