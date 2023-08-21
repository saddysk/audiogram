import { Stack } from "@chakra-ui/react";
import { Audiogram } from "../audiogram/Audiogram";

export default function Home() {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Audiogram />
      </Stack>
    </>
  );
}
