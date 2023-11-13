import React, { ReactNode } from 'react';
import * as ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';

import { ClearIndicator, DropdownIndicator, MultiValueRemove, OptStyles, SingleValue, Option } from './Overwrite';
import { ReactSelectOptProps, ReactSelectProps } from './Dropdown.d';
import { useSelect } from '.';
import { type SelectName } from '../select.d';

interface SelectWithFormProps extends ReactSelectProps {
  field: ControllerRenderProps<FieldValues, SelectName>,
  register?: any,
  setValue?: any,
}

const removeDuplicateValues = (options?: ReactSelect.OptionsOrGroups<any, ReactSelect.GroupBase<ReactSelectOptProps>>) => {
  //console.log('options', options)
  const removedResult = options?.filter((option: ReactSelectOptProps) => !option.label.includes('Group: '))
  //console.log('removedResult', removedResult)
  return removedResult
};

const filterOptions = (
  candidate: { label: string; value: string; data: any },
  input: string
) => {
  if (input) {
    return candidate.label.includes(input)
  }
  return true;
};


const promiseOptions = (options: any) => (inputValue: string) =>
  new Promise<ReactSelectOptProps[]>((resolve) => {
    setTimeout(() => {
      resolve(options);
    }, 100);
  });


const Select = ({ minWidth, style, id, className, defaultValue, options, register, setValue, ...props }: SelectWithFormProps) => {

  const {
    checkedList,
    optionsValue,
    handleChange
  } = useSelect(options, defaultValue)

  const value = optionsValue.find((v, i) => checkedList[i])
  //console.log(value, checkedList, optionsValue, defaultValue)

  React.useEffect(() => {
    setValue && setValue(id, value)
  }, [value])

  return <div
    className={className}
    style={{ minWidth: minWidth, ...style }}>
    <Dropdown id={id}
      {...props}
      options={options}
      defaultValue={value ?? defaultValue}
      onChange={handleChange}
      checkedList={checkedList}
    />
  </div>
}

export const Dropdown = React.memo(({
  checkedList,
  isVisible,
  components,
  isMulti,
  isDisabled,
  field,
  options,
  ...props
}: SelectWithFormProps) => <AsyncSelect {...props} {...field} styles={{ ...OptStyles }}
  cacheOptions defaultOptions hideSelectedOptions={false} closeMenuOnSelect={isMulti ? false : true}
  loadOptions={promiseOptions(options)}
  isSearchable
  isMulti={isMulti}
  isDisabled={isDisabled}
 options={removeDuplicateValues(options)}
  filterOption={filterOptions}
  components={{
    ...components,
    Option: React.memo(Option(checkedList)),
    DropdownIndicator,
    SingleValue,
    ClearIndicator,
    MultiValueRemove,
    IndicatorSeparator: () => null
  }}
  />
);

export default Select