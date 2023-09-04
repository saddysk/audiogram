import { FC } from "react";

interface DefaultBarVisualizationProps {
  frequencyData: number[];
  freqRangeStartIndex: number;
  waveLinesToDisplay: number;
  mirrorWave: boolean;
  waveColor: string;
}

const DefaultBarVisualization: FC<DefaultBarVisualizationProps> = ({
  frequencyData,
  freqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
  waveColor,
}) => {
  // Pick the low values because they look nicer than high values
  const frequencyDataSubset = frequencyData.slice(
    freqRangeStartIndex,
    freqRangeStartIndex +
      (mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay)
  );

  const frequencesToDisplay = mirrorWave
    ? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
    : frequencyDataSubset;

  return (
    <>
      {frequencesToDisplay.map((v, i) => {
        return (
          <div
            key={i}
            className="bar"
            style={{
              minWidth: "1px",
              backgroundColor: waveColor,
              height: `${500 * Math.sqrt(v)}%`,
            }}
          />
        );
      })}
    </>
  );
};

export default DefaultBarVisualization;
