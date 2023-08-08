import { Input } from "@chakra-ui/react";
import { FC, forwardRef } from "react";

interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  type?: string;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const InputText: FC<InputTextProps> = forwardRef<
  HTMLInputElement,
  InputTextProps
>(({ type, ...props }, forwardedRef) => {
  return (
    <>
      <Input ref={forwardedRef} type={type ?? "string"} size="sm" {...props} />
    </>
  );
});

InputText.displayName = "InputText";

export default InputText;
