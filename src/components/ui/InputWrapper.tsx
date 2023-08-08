import { FC, ReactNode } from "react";
import {
  Badge,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

interface InputWrapperProps {
  id?: string;
  label?: string;
  description?: string;
  children?: ReactNode;
  optional?: boolean;
}

const InputWrapper: FC<InputWrapperProps> = ({
  id,
  label,
  description,
  children,
  optional = false,
  ...props
}) => {
  return (
    <>
      <FormControl>
        <HStack justifyContent="space-between" mb={2}>
          <FormLabel htmlFor={id} mb={0} {...props}>
            {label}
          </FormLabel>
          {optional && <Badge variant="outline">Optional</Badge>}
        </HStack>
        {children}
        {description && (
          <FormHelperText fontSize="sm">{description}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default InputWrapper;
