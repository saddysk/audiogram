import { FC, useState } from "react";
import InputWrapper from "../ui/InputWrapper";
import InputFile from "../ui/InputFile";
import { getTranscription } from "./transcription";

export interface IInputAudioData {
  audioUrl: string;
  fileName: string;
  srtData: string;
  duration: number;
}

interface InputAudioProps {
  handleAudioUpload: (data: IInputAudioData) => void;
}

const InputAudio: FC<InputAudioProps> = ({ handleAudioUpload }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChange = async (_: string, file?: File) => {
    setIsLoading(true);

    if (!file) {
      return;
    }

    const transcription = await getTranscription(file);
    if (!transcription) {
      return;
    }

    const { audioUrl, srtData, duration } = transcription;

    handleAudioUpload({ audioUrl, fileName: file.name, srtData, duration });
    setIsLoading(false);
  };

  return (
    <>
      <InputWrapper
        id="audioFile"
        label="Audio file"
        description={isLoading ? "Loading..." : ""}
      >
        <InputFile id="audioFile" accept="audio/*" handleOnChange={onChange} />
      </InputWrapper>
    </>
  );
};

export default InputAudio;
