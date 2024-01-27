import { SubtitleItem } from "parse-srt";
import { FC } from "react";
import { interpolate } from "remotion";

interface WordProps {
  item: SubtitleItem;
  frame: number;
  transcriptionColor: string;
}

export const Word: FC<WordProps> = ({ item, frame, transcriptionColor }) => {
  const opacity = interpolate(frame, [item.start, item.start + 10], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        color: transcriptionColor,
      }}
    >
      {item.text}
    </span>
  );
};
