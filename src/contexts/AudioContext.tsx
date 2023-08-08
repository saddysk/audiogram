import { FC, ReactNode, createContext, useContext, useState } from "react";
import { IAudioInput } from "../interfaces/AudioInputInterface";

export const defaultAudioData: IAudioInput = {
  title: "",
  audioFile: "",
  coverImage: "",
  srtFile: "",
  duration: {
    startTime: 0,
    endTime: 0,
  },
};

export type IAudioContext = {
  audioInput: IAudioInput;
  setAudioInput: (ai: IAudioInput) => void;
};

const AudioContext = createContext<IAudioContext>({
  audioInput: defaultAudioData,
  setAudioInput: () => {},
});

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [audioInput, setAudioInput] = useState<IAudioInput>(defaultAudioData);

  return (
    <AudioContext.Provider value={{ audioInput, setAudioInput }}>
      {children}
    </AudioContext.Provider>
  );
};

export default function useAudioContext() {
  const context = useContext(AudioContext);
  return context;
}
