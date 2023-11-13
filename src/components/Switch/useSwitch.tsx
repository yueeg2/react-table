import { useState } from 'react';

export interface SwitchState {
  switchValue: boolean;
  handleSwitchChange: () => void;
}

const useSwitch = (initialValue: boolean): SwitchState => {
  const [switchValue, setValue] = useState(initialValue);

  const handleSwitchChange = () => {
    setValue((prevValue) => !prevValue);
  };

  return {
    switchValue,
    handleSwitchChange,
  };
};

export default useSwitch;