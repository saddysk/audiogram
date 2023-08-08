import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const AudiogramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),

  audioFileName: z.string().refine((s) => s.endsWith(".mp3"), {
    message: "Subtitles file must be a .mp3 file",
  }),
  coverImgFileName: z
    .string()
    .refine(
      (s) =>
        s.endsWith(".jpg") ||
        s.endsWith(".jpeg") ||
        s.endsWith(".png") ||
        s.endsWith(".bmp"),
      {
        message: "Subtitles file must be a .jpg / .jpeg / .png / .bmp file",
      }
    ),
  titleText: z.string(),
  titleColor: zColor(),

  subtitles: z.string().refine((s) => s.endsWith(".srt"), {
    message: "Subtitles file must be a .srt file",
  }),
  onlyDisplayCurrentSentence: z.boolean(),
  subtitlesTextColor: zColor(),
  subtitlesLinePerPage: z.number().int().min(0),
  subtitlesLineHeight: z.number().int().min(0),
  subtitlesZoomMeasurerSize: z.number().int().min(0),

  waveColor: zColor(),
  waveLinesToDisplay: z.number().int().min(0),
  waveFreqRangeStartIndex: z.number().int().min(0),
  waveNumberOfSamples: z.enum(["32", "64", "128", "256", "512"]),
  mirrorWave: z.boolean(),
});
