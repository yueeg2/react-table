import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { TableSelectProps } from '../table.d';
import { ThemeProvider } from '@mui/material';
import { CheckboxTheme } from '../../../styles';


export const CheckBoxSelectAll = ({
  onChange,
  selectedRowAmount,
  oriRowAmount
}: TableSelectProps) => {
  console.log(selectedRowAmount, oriRowAmount, (oriRowAmount > 0) && selectedRowAmount === oriRowAmount)
  return <TableCell padding="checkbox"
    key='utils-tablehead-selectAll'>
    <ThemeProvider theme={CheckboxTheme}>
    <Checkbox
      indeterminate={selectedRowAmount > 0 && selectedRowAmount < oriRowAmount}
      checked={(oriRowAmount > 0) && selectedRowAmount === oriRowAmount}
      onChange={onChange}
      inputProps={{
        'aria-label': 'selectAll',
      }}
      icon={<div style={{
        width: '1rem',
        height: '1rem',
        marginInlineStart: 3,
        borderRadius: 2,
        border: 'solid 1px #aaa'
      }} />}
    />
    </ThemeProvider>
  </TableCell>;
};
