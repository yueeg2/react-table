import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, {
  components,
  GroupHeadingProps,
  OptionProps,
} from 'react-select';
import { CategorySelectProps } from '../Dropdown/Dropdown.d';
import { DropdownIndicator, ClearIndicator, OptStyles } from '../Dropdown/Overwrite';
import { Typography } from '@mui/material';

const CategoryHeading = ({ children, ...props }: GroupHeadingProps<CategorySelectProps, false>) => {

  React.useEffect(() => {
    const element = document.querySelector(`#${props.id}`)?.nextSibling as HTMLElement;
    element.classList.add("hidden");
  }
  , []);

  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
    const element = document.querySelector(`#${props.id}`)?.nextSibling as HTMLElement;
    element.classList.toggle("hidden");
  };
  return (
    <components.GroupHeading {...props}>
      <div onClick={() => toggleExpanded()} className="text-black text-base">
        { expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> }
        {children}
      </div>
    </components.GroupHeading>
    
  )
} 

const CategoryOptions = ({ children, ...props }: OptionProps<CategorySelectProps, false>) => {
    return (
      <components.Option {...props}>
        <Box className="bg-[var(--blue-alice)] pl-5 border border-white">
          <FormControlLabel
            className='w-full'
            control={
              <Radio
                checked={props.isSelected}
                size="small"
              />
            }
            label={<Typography className={`text-base ${props.isSelected ? 'text-[color:var(--blue-steel)]' : ''}`}>{children}</Typography>}
          />
        </Box>
      </components.Option>
      )
  };

const CategorySelect = ({ options, value, onChange, ...props }: any) => { 

  return (
    <Select
      {...props}
      options={options}
      components={{
        GroupHeading: CategoryHeading,
        Option: CategoryOptions,
        DropdownIndicator,
        ClearIndicator,
        IndicatorSeparator: () => null
      }}
      onChange={onChange}
      styles={{ ...OptStyles }}
    />
  )
}

export default CategorySelect;