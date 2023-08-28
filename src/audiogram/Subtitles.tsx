import parseSRT, { SubtitleItem } from "parse-srt";
import {
  FC,
  useEffect,
  useMemo,
  useRef,
  //  useRef,
  useState,
} from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Word } from "./Word";

interface PaginatedSubtitlesProps {
  subtitles: string;
  startFrame: number;
  endFrame: number;
  linesPerPage: number;
  subtitlesTextColor: string;
  subtitlesZoomMeasurerSize: number;
  subtitlesLineHeight: number;
  subtitlesCharCountAhead: number;
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
      }, []);
  }, [fps, parsed, windowEnd, windowStart]);
};

export const PaginatedSubtitles: FC<PaginatedSubtitlesProps> = ({
  startFrame,
  endFrame,
  subtitles,
  linesPerPage,
  subtitlesTextColor: transcriptionColor,
  subtitlesZoomMeasurerSize,
  subtitlesLineHeight,
  subtitlesCharCountAhead,
}) => {
  const frame = useCurrentFrame();
  const windowRef = useRef<HTMLDivElement>(null);
  const zoomMeasurer = useRef<HTMLDivElement>(null);
  const [handle] = useState(() => delayRender());
  const windowedFrameSubs = useWindowedFrameSubs(subtitles, {
    windowStart: startFrame,
    windowEnd: endFrame,
  });

  const [lineOffset, setLineOffset] = useState(0);

  const indexOfCurrentSentence =
    windowedFrameSubs.findLastIndex((w, i) => {
      const nextWord = windowedFrameSubs[i + 1];

      return nextWord && nextWord.start < frame;
    }) + 1;

  // !useEffects
  useEffect(() => {
    const zoom =
      (zoomMeasurer.current?.getBoundingClientRect().height as number) /
      subtitlesZoomMeasurerSize;
    const linesRendered =
      (windowRef.current?.getBoundingClientRect().height as number) /
      (subtitlesLineHeight * zoom);
    const linesToOffset = Math.max(0, linesRendered - linesPerPage);
    setLineOffset(linesToOffset);
    continueRender(handle);
  }, [
    frame,
    handle,
    linesPerPage,
    subtitlesLineHeight,
    subtitlesZoomMeasurerSize,
  ]);

  const currentFrameSentences = windowedFrameSubs.filter((word) => {
    return word.start < frame + subtitlesCharCountAhead;
  });

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "20px",
      }}
    >
      <div
        ref={windowRef}
        style={{
          transform: `translateY(-${lineOffset * subtitlesLineHeight}px)`,
        }}
      >
        {currentFrameSentences.map((item) => (
          <span
            key={item.id}
            id={String(item.id)}
            style={{ marginRight: "14px" }}
          >
            <Word
              frame={frame + subtitlesCharCountAhead}
              item={item}
              transcriptionColor={
                item.id > indexOfCurrentSentence + 2
                  ? "rgba(255,255,255,0.5"
                  : transcriptionColor
              }
            />
          </span>
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

declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: unknown
    ): number;
  }
}
