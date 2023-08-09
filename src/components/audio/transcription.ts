import axios from "axios";
import { uploadFileToCloudinary } from "../../utils/storage";
import { env } from "src/env.mjs";

interface ITranscription {
  audioUrl: string;
  srtData: string;
  duration: number;
}

interface IWordJson {
  word: string;
  start: number;
  end: number;
  confidence: number;
  punctuated_word: string;
}

export const getTranscription = async (file: File): Promise<ITranscription> => {
  const audioUrl = await uploadFileToCloudinary(file);

  const URL =
    "https://api.deepgram.com/v1/listen?smart_format=true&language=en&model=enhanced";

  const headers = {
    Authorization: `Token ${env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    url: audioUrl,
  };

  const response = await axios.post(URL, data, { headers });

  if (response.status !== 200) {
    console.error(response);
  }

  const srtData = createSRT(
    response.data.results.channels[0].alternatives[0].words
  );

  const duration = Number(response.data.metadata.duration.toFixed(1));

  return { audioUrl, srtData, duration };
};

function createSRT(wordsJson: IWordJson[]): string {
  let srtContent = "";
  let index = 1;

  for (const item of wordsJson) {
    const startTime = formatTime(item.start);
    const endTime = formatTime(item.end);

    srtContent += `${index}\n`;
    srtContent += `${startTime} --> ${endTime}\n`;
    srtContent += `${item.punctuated_word}\n\n`;

    index++;
  }

  return srtContent;
}

function formatTime(seconds: number) {
  const time = new Date(seconds * 1000).toISOString().substr(11, 12);
  return time.replace(".", ",");
}

// async function getTranscriptionUsingWhisperAI(file: File) {
//   const URL = `https://api.openai.com/v1/audio/transcriptions`;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("model", env.NEXT_PUBLIC_OPENAI_MODEL as string);
//   formData.append("response_format", "srt");

//   const headers = {
//     Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_KEY}`,
//   };

//   const response = await axios.post(URL, formData, { headers });

//   if (response.status !== 200) {
//     return;
//   }

//   return response.data;
// }
