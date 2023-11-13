
import {
  components,
  MenuListProps,
  OptionProps,
  SingleValueProps,
  MultiValueRemoveProps,
  ClearIndicatorProps
} from 'react-select';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
export const DropdownIndicator = (props: any) => {
  return (

    <components.DropdownIndicator {...props}>
      <img src={`/assets/dropdown_triangle.svg`} alt="dropdown_triangle" />
    </components.DropdownIndicator>
  );
};

export const MenuList = (
  props: MenuListProps<false>
) => {
  return (
    <components.MenuList {...props}>
      <div >Custom Menu List</div>
      {props.children}
    </components.MenuList>
  );
};


export const SingleValue = ({
  children,
  ...props
}: SingleValueProps) => (
  <components.SingleValue {...props} >
    <div style={{
      borderRadius: 50,
      paddingBlock: 2,
      paddingInlineStart: 10,
      backgroundColor: 'var(--blue-pacific)',
      color: 'var(--white)',
      fontSize: 16
    }}>
      {children}
    </div>
  </components.SingleValue>
);


export const ClearIndicator = ({
  children,
  ...props
}: ClearIndicatorProps) => (
  <components.ClearIndicator {...props}
    className={'react-select-clearIndicator'}>
    <div style={{
      display: 'flex',
      borderRadius: 50,
      height: 20,
      backgroundColor: 'var(--blue-pacific)',
    }}><img src={`/assets/multi_deleted.svg`} alt="delete" />
    </div>
  </components.ClearIndicator>
);

export const MultiValueRemove = ({
  children,
  ...props
}: MultiValueRemoveProps) => (
  <components.MultiValueRemove {...props}  >
    <div style={{
      borderRadius: 50,
      backgroundColor: 'transparent',
      paddingBlockStart: 1,
      paddingInlineEnd: 2
    }}>
      <img src={`/assets/multi_deleted.svg`} alt="delete" />
    </div>
  </components.MultiValueRemove>
);
const checkboxStyle = {
  color: 'var(--blue-pacific)',
  '&.Mui-checked': {
    color: 'var(--blue-pacific)',
  }
};
export const Option = (checkedList: boolean[]) => (option: OptionProps<unknown>): JSX.Element => {
  const { innerProps } = option;
  const checkedListId: number = innerProps.id ? parseInt(innerProps.id?.split('option-')[1]) : -1

  return (
    <components.Option {...option} >
      {option.label.includes('Group: ')
        ? <FormControlLabel
          label={option.label}
          control={<Checkbox sx={checkboxStyle}
            data-testid={`option-checkbox-${option.label.replace(" ", '_')}`}
            checked={checkedListId > -1 && checkedList ? checkedList[checkedListId] : undefined}
          />}
        />
        : <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
          <FormControlLabel
            label={option.label}
            control={<Checkbox sx={checkboxStyle}
              data-testid={`option-checkbox-${option.label.replace(" ", '_')}`}
              checked={checkedListId > -1 && checkedList ? checkedList[checkedListId] : undefined}
            />}
          /> </Box>
      }

    </components.Option>
  );
};
export const OptStyles = ({
  container: (css: any) => ({
    ...css,
    border: '1px solid var(--silver)',
    borderRadius: 4
  }),
  menu: (css: any) => ({
    ...css,
    border: '1px solid var(--silver)',
    zIndex: '5'

  }),
  multiValueLabel: (css: any) => ({
    ...css,
    color: 'var(--white)',
    paddingInlineStart: 10
  }),
  multiValue: (css: any) => ({
    ...css,
    borderRadius: 50,
    backgroundColor: 'var(--blue-pacific)',
    color: 'var(--white)'
  }),
  option: (css: any, { data, isDisabled, isFocused, isSelected }: any) => ({
    ...css,
    fontWeight: isSelected
      ? 'var(--fwL)'
      : 'var(--fwM)',
    cursor: isDisabled
      ? 'not-allowed'
      : 'pointer',
    padding: 0,
    height: '100%',
    backgroundColor: isDisabled
      ? 'var(--blue-antiFlash)'
      : isSelected ? 'var(--lightBlue)' : undefined,
    ':active': {
      backgroundColor: !isDisabled
        ? 'var(--lightBlue)'
        : undefined,
      color: isSelected
        ? 'var(--blue-pacific)'
        : undefined,
    },
    '> div span.MuiFormControlLabel-label': {
      fontSize: 18,
      width: 'max-content',
      zIndex: '8 !important',
      color: isDisabled
        ? 'var(--gray-dim)'
        : isSelected ? 'var(--blue-pacific)' : undefined,

    }
  })
})