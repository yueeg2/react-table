import { useState } from 'react';
import { ReactSelectOptProps } from '../Dropdown/Dropdown.d';

export function useSelect() {
  const [selectedValues, setSelectedValues] = useState<string>('');

  const handleChange = (newValue: ReactSelectOptProps) => {
    setSelectedValues(newValue.value);
  }

  return {
    selectedValues,
    handleChange,
  };
}