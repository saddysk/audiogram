import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC, forwardRef } from "react";

interface InputFileProps {
  id?: string;
  accept?: string;
  ref?: React.Ref<HTMLInputElement>;
  handleOnChange: (value: string, file?: File) => void;
}

const InputFile: FC<InputFileProps> = forwardRef<
  HTMLInputElement,
  InputFileProps
>(({ handleOnChange, ...props }, forwardedRef) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const fileExtension = file.name.split(".").pop();
    const isMp3 = fileExtension === "mp3";

    const reader = new FileReader();
    reader.onloadend = () => {
      handleOnChange(reader.result as string, isMp3 ? file : undefined);
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <>
      <Input
        ref={forwardedRef}
        type="file"
        size="sm"
        {...props}
        onChange={handleChange}
      />
    </>
  );
});

InputFile.displayName = "InputFile";

export default InputFile;
