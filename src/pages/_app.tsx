import { type AppType } from "next/dist/shared/lib/utils";
// import "@/styles/globals.css";
import "@/styles/style.css";
import { AudioContextProvider } from "@/contexts/AudioContext";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AudioContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AudioContextProvider>
  );
};

export default MyApp;
