import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

const SelectController = <
  T extends FieldValues
  // eslint-disable-next-line no-empty-pattern
>({
  name,
  control,
  items,
  disabled,
  label,
  ...props
}: UseControllerProps<T> &
  SelectProps & { items: { label: string; value: string }[] }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          disabled={disabled}
          error={!!errors[field.name]}
        >
          <InputLabel id="demo-simple-select-disabled-label">
            {label}
          </InputLabel>
          <Select {...field}>
            {items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
          {errors && errors[field.name] && (
            <FormHelperText>
              {errors[field.name]?.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectController;
