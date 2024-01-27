import parseSRT, { SubtitleItem } from "parse-srt";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Word } from "./Word";

interface PaginatedSubtitlesProps {
  subtitles: string;
  startFrame: number;
  endFrame: number;
  linesPerPage: number;
  subtitlesTextColor: string;
  subtitlesZoomMeasurerSize: number;
  subtitlesLineHeight: number;
}

const useWindowedFrameSubs = (
  src: string,
  options: { windowStart: number; windowEnd: number }
) => {
  const { windowStart, windowEnd } = options;
  const { fps } = useVideoConfig();

  const parsed = useMemo(() => parseSRT(src), [src]);

  return useMemo(() => {
    return parsed
      .map((item) => {
        const start = Math.floor(item.start * fps);
        const end = Math.floor(item.end * fps);
        return { item, start, end };
      })
      .filter(({ start }) => {
        return start >= windowStart && start <= windowEnd;
      })
      .map<SubtitleItem>(({ item, start, end }) => {
        return {
          ...item,
          start,
          end,
        };
      });
  }, [fps, parsed, windowEnd, windowStart]);
};

export const PaginatedSubtitles: FC<PaginatedSubtitlesProps> = ({
  startFrame,
  endFrame,
  subtitles,
  linesPerPage,
  subtitlesTextColor,
  subtitlesZoomMeasurerSize,
  subtitlesLineHeight,
}) => {
  const frame = useCurrentFrame();
  const zoomMeasurer = useRef<HTMLDivElement>(null);
  const windowedFrameSubs = useWindowedFrameSubs(subtitles, {
    windowStart: startFrame,
    windowEnd: endFrame,
  });

  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = "56px Arial";

  const sentences = useMemo(() => {
    let tempSentence: SubtitleItem[] = [];
    const sentencesList: SubtitleItem[][] = [];
    let lineWidth = 0;
    const maxLineWidth = 640; // The width of the container
    let lineCount = 0;

    windowedFrameSubs.forEach((word, idx) => {
      const wordWidth = context.measureText(word.text).width;
      if (lineWidth + wordWidth > maxLineWidth) {
        lineWidth = 0;
        lineCount++;
        if (lineCount >= linesPerPage) {
          sentencesList.push([...tempSentence]);
          tempSentence = [];
          lineCount = 0;
        }
      }
      tempSentence.push(word);
      lineWidth += wordWidth;

      if (idx === windowedFrameSubs.length - 1) {
        sentencesList.push([...tempSentence]);
      }
    });

    return sentencesList;
  }, [windowedFrameSubs, context, linesPerPage]);

  useEffect(() => {
    let currentSentenceIndex = -1;
    for (let i = 0; i < sentences.length; i++) {
      if (sentences[i]?.some((word) => word.end <= frame)) {
        currentSentenceIndex = i;
      }
    }
    if (currentSentenceIndex >= 0) {
      setCurrentStartIndex(currentSentenceIndex);
    }
  }, [frame, sentences]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: linesPerPage * subtitlesLineHeight,
      }}
    >
      <div>
        {sentences.map((sentence, index) => (
          <div
            key={index}
            style={{
              display:
                index >= currentStartIndex && index <= currentStartIndex + 2
                  ? "block"
                  : "none",
              transform: `translateY(${
                -Math.max(0, currentStartIndex - index) * 20
              }px)`,
            }}
          >
            {sentence.map((word) => (
              <span key={word.id} style={{ marginRight: "14px" }}>
                <Word
                  frame={frame}
                  item={word}
                  transcriptionColor={subtitlesTextColor}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div
        ref={zoomMeasurer}
        style={{
          height: subtitlesZoomMeasurerSize,
          width: subtitlesZoomMeasurerSize,
        }}
      />
    </div>
  );
};
