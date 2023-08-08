export interface IAudioDuration {
  startTime: number;
  endTime: number;
}

export interface IAudioInput {
  title: string;
  audioFile: string;
  srtFile: string;
  coverImage: string;
  duration: IAudioDuration;
}
