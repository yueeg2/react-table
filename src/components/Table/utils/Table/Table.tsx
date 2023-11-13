
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable
} from '@mui/material';
import { TableProps } from '../../table.d';



export default function Table({ customTableName, sx, children }: TableProps) {
  return <MuiTableContainer className='radius'
    sx={sx ? sx : {}}>
    <MuiTable stickyHeader
      aria-labelledby={customTableName}
      aria-label="TableContainer"
      sx={sx ? sx : {}}>
      {children}
    </MuiTable>
  </MuiTableContainer>
};
