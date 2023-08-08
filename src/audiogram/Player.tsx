import { FC, useRef } from "react";
import { Audio, Img, Sequence, useVideoConfig } from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import { AudioWave } from "./AudioWave";
import { HStack, Text } from "@chakra-ui/react";

interface AudiogramPlayerProps {
  audioOffsetInSeconds: number;

  audioFileName: string;
  coverImgFileName: string;
  titleText: string;
  titleColor: string;

  subtitles: string;
  onlyDisplayCurrentSentence: boolean;
  subtitlesTextColor: string;
  subtitlesLinePerPage: number;
  subtitlesZoomMeasurerSize: number;
  subtitlesLineHeight: number;

  waveColor: string;
  waveFreqRangeStartIndex: number;
  waveLinesToDisplay: number;
  waveNumberOfSamples: string;
  mirrorWave: boolean;
}

export const AudiogramPlayer: FC<AudiogramPlayerProps> = ({
  audioOffsetInSeconds,
  audioFileName,
  coverImgFileName,
  titleText,
  titleColor,
  subtitles,
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
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { durationInFrames, fps } = useVideoConfig();

  if (!subtitles) {
    return null;
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div ref={ref}>
      <Audio
        src={audioFileName}
        startFrom={audioOffsetInFrames}
        endAt={audioOffsetInFrames + durationInFrames}
      />
      <Sequence from={-audioOffsetInFrames}>
        <div className="container">
          <HStack alignItems="start" gap={12}>
            {coverImgFileName && (
              <Img
                className="cover"
                src={coverImgFileName}
                style={{ width: "375px", height: "375px" }}
              />
            )}

            <div style={{ color: titleColor }}>
              <Text fontSize="7xl">{titleText}</Text>
            </div>
          </HStack>

          <div>
            <AudioWave
              audioSrc={audioFileName}
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
