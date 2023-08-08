import { Input, Stack } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import InputWrapper from "../ui/InputWrapper";
import { IAudioDuration } from "../../interfaces/AudioInputInterface";

interface AudioDurationProps {
  duration: number;
  audioDuration: IAudioDuration;
  setAudioDuration: Dispatch<SetStateAction<IAudioDuration>>;
}

const AudioDuration: FC<AudioDurationProps> = ({
  duration,
  audioDuration,
  setAudioDuration,
}) => {
  const maxDurationInMins = Number((duration / 60).toFixed(1));

  const handleStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value > audioDuration.endTime) {
      setAudioDuration({ ...audioDuration, startTime: audioDuration.endTime });
    } else {
      setAudioDuration({ ...audioDuration, startTime: Number(value) });
    }
  };

  const handleEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endValue = Number(e.target.value);

    if (endValue > maxDurationInMins) {
      setAudioDuration({ ...audioDuration, endTime: maxDurationInMins });
    } else {
      setAudioDuration({ ...audioDuration, endTime: endValue });
    }

    if (endValue < audioDuration.startTime) {
      setAudioDuration({ ...audioDuration, startTime: endValue });
    }
  };

  useEffect(() => {
    setAudioDuration({
      startTime: 0,
      endTime: maxDurationInMins,
    });
  }, [maxDurationInMins, setAudioDuration]);

  return (
    <Stack direction={["column", "row"]}>
      <InputWrapper
        label="Start time"
        description={`min: ${0}; max: ${audioDuration.endTime}`}
      >
        <Input
          type="number"
          size="sm"
          value={audioDuration.startTime.toString()}
          min={0}
          max={audioDuration.endTime}
          step={0.1}
          onChange={handleStartTime}
        />
      </InputWrapper>
      <InputWrapper
        label="End time"
        description={`min: ${0.1}; max: ${maxDurationInMins}`}
      >
        <Input
          type="number"
          size="sm"
          value={audioDuration.endTime.toString()}
          min={0.1}
          max={maxDurationInMins}
          step={0.1}
          onChange={handleEndTime}
        />
      </InputWrapper>
    </Stack>
  );
};

export default AudioDuration;
