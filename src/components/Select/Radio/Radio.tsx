import * as React from 'react';
import { Radio as MuiRadio } from '@mui/material';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactSelectOptProps } from '../Dropdown/Dropdown.d';
import 'css/App.css'
import { ControllerRenderProps } from 'react-hook-form';
import { type SelectName } from '../select.d';

interface GroupRadioProps extends RadioGroupProps {
  options: ReactSelectOptProps[],
  field: ControllerRenderProps<any, SelectName>
}

export const useRadio = () => {
  const [value, setValue] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return { handleChange, value }
};

export default function Radio({ options, defaultValue, field, name, ...props }: GroupRadioProps) {

  return <RadioGroup row {...props} {...field} value={field.value ?? null}>
    {options.map((option, i) => {
      return <FormControlLabel
        key={`FormControlLabel-${i}`}
        value={option.value}
        control={<MuiRadio size="small" />}
        label={option.label}
        sx={{
          ' .MuiFormControlLabel-label': {
            color: 'var(--gray-dim)',
            fontSize: '18px'
          },
          ' .MuiRadio-root.Mui-checked ': {
            color: 'var(--blue-steel)'
          },
          ' .MuiRadio-root.Mui-checked ~ .MuiFormControlLabel-label': {
            color: 'var(--blue-davys)',
          },
        }}
      />
    })}
  </RadioGroup>;
}