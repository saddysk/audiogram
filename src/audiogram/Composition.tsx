import { FC, useEffect, useRef, useState } from "react";
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
import { HStack, Text } from "@chakra-ui/react";
import { AudiogramSchema } from "./Schema";
import { z } from "zod";

export const fps = 30;

type AudiogramCompositionSchemaType = z.infer<typeof AudiogramSchema>;

export const AudiogramComposition: FC<AudiogramCompositionSchemaType> = ({
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
  const { durationInFrames } = useVideoConfig();
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
              subtitles={subtitlesText}
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
