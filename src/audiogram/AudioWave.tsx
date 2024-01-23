import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { FC } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { WaveVisualization } from "./visualizations/WaveVisualization";
import DefaultBarVisualization from "./visualizations/DefaultBarVisualization";

interface AudioWaveProps {
  waveColor: string;
  numberOfSamples: number;
  freqRangeStartIndex: number;
  waveLinesToDisplay: number;
  mirrorWave: boolean;
  audioSrc: string;
  visualizeType: string;
}

export const AudioWave: FC<AudioWaveProps> = ({
  waveColor,
  numberOfSamples,
  freqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
  audioSrc,
  visualizeType,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return null;
  }

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples, // Use more samples to get a nicer visualisation
  });

  return (
    <div className="audio-viz">
      {visualizeType === "line" ? (
        <WaveVisualization
          frequencyData={frequencyData}
          width={300 * 4.5}
          height={125 * 1.5}
          lineColor={waveColor}
          lines={1}
          sections={15}
          offsetPixelSpeed={-100}
        />
      ) : (
        <DefaultBarVisualization
          frequencyData={frequencyData}
          freqRangeStartIndex={freqRangeStartIndex}
          waveLinesToDisplay={waveLinesToDisplay}
          mirrorWave={mirrorWave}
          waveColor={waveColor}
        />
      )}
    </div>
  );
};
