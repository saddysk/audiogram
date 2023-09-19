import { z } from "zod";

export const AudiogramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),
  audioFile: z.string(),
  coverImage: z.string(),
  titleText: z.string(),
  subtitlesFileName: z.string(),
  backgroundColor: z.string(),
  visualizeType: z.string(),
});
