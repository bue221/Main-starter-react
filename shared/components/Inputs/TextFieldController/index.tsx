import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

const TextFieldController = <
  T extends FieldValues
  // eslint-disable-next-line no-empty-pattern
>({
  name,
  control,
  ...props
}: UseControllerProps<T> & TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <TextField
          fullWidth
          {...props}
          {...field}
          error={!!errors[field.name]}
          helperText={
            errors &&
            errors[field.name] &&
            (errors[field.name]?.message as string)
          }
        />
      )}
    />
  );
};

export default TextFieldController;
