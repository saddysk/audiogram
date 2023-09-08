import { z } from "zod";

export const AudiogramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),
  audioFile: z.string(),
  titleText: z.string(),
  subtitles: z.string(),
  backgroundImage: z.string(),
  visualizeType: z.string(),
});
