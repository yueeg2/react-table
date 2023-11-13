
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputProps } from '@mui/material';
import { BootstrapInput } from './style';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { type SelectName } from '../Select/select.d';


export const useInput = () => {
  const [value, setValue] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return { handleChange, value, setValue }
}


interface InputWithFromProps extends InputProps {
  field?: ControllerRenderProps<FieldValues, SelectName>,
}
export default function Input({ defaultValue, ...props }: InputWithFromProps) {
  return (
    <FormControl variant="standard">
      <BootstrapInput
        {...props}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}