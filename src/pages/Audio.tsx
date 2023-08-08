import { FC, useState } from "react";
import InputFile from "../components/ui/InputFile";
import { Button, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IAudioDuration, IAudioInput } from "../interfaces/AudioInputInterface";
import InputText from "../components/ui/InputText";
import InputWrapper from "../components/ui/InputWrapper";
import AudioDuration from "../components/audio/Duration";
import { defaultAudioData } from "../contexts/AudioContext";
import InputAudio, { IInputAudioData } from "../components/audio/InputAudio";

interface AudioInputsProps {
  handleUpload: (data: IAudioInput) => void;
}

const AudioInputs: FC<AudioInputsProps> = ({ handleUpload }) => {
  const [durationInSeconds, setDurationInSeconds] = useState<number>();
  const [audioDuration, setAudioDuration] = useState<IAudioDuration>(
    defaultAudioData.duration
  );

  const { handleSubmit, register, setValue, getValues, watch } =
    useForm<IAudioInput>({
      defaultValues: defaultAudioData,
    });

  const onSubmit = (data: IAudioInput) => {
    if (
      !getValues("audioFile") ||
      !getValues("srtFile") ||
      !getValues("coverImage")
    ) {
      return;
    }

    handleUpload({ ...data, duration: audioDuration });
  };

  const onChangeFileData = (data: IInputAudioData) => {
    const { value: fileSrc, fileName, srtData, duration } = data;

    setValue("audioFile", fileSrc);
    setDurationInSeconds(duration);
    setValue("srtFile", srtData);
    if (!watch("title")) {
      setValue("title", fileName);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="start" w={"75%"} gap={6} mx="auto">
        <InputWrapper id="videoTitle" label="Video title" optional={true}>
          <InputText
            id="videoTitle"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
        </InputWrapper>

        <InputAudio handleAudioUpload={onChangeFileData} />

        {durationInSeconds && (
          <InputWrapper
            id="duration"
            label="Select duration (in mins)"
            optional={true}
          >
            <AudioDuration
              duration={durationInSeconds}
              audioDuration={audioDuration}
              setAudioDuration={setAudioDuration}
            />
          </InputWrapper>
        )}

        <InputWrapper id="coverImage" label="Cover image for the video">
          <InputFile
            id="coverImage"
            accept="image/*"
            handleOnChange={(file) => setValue("coverImage", file)}
          />
        </InputWrapper>

        <Button colorScheme="cyan" type="submit">
          Upload
        </Button>
      </VStack>
    </form>
  );
};

export default AudioInputs;
