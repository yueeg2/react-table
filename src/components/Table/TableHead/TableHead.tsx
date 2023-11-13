import {
  TableHead as MuiTableHead,
  ThemeProvider
} from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Cell } from './Cell';
import { HeadCellProps, TableHeadProps } from '../table.d';
import { CheckBoxSelectAll } from './CheckBoxSelectAll';
import TableSortLabel from './TableSortLabel'
import { TableHeadTheme } from './TableHeadTheme';


export default function TableHead(
  { TH, style, selectable, sortable, collapsible }: TableHeadProps
) {
  return (
    <ThemeProvider theme={TableHeadTheme(style)}>
      <MuiTableHead>
        <TableRow id={`THeadRow`}>
          {selectable ? <CheckBoxSelectAll {...selectable} /> : null}
          {collapsible ? <TableCell /> : null}
          {TH?.map((cell: HeadCellProps) => <Cell key={cell.id} 
          id={cell.id} align={cell.align}>
            {!cell.hidden
              ? (sortable
                ? <TableSortLabel sortable={sortable} headCell={cell} />
                : cell.label) : null}
          </Cell>
          )}
        </TableRow>
      </MuiTableHead>
    </ThemeProvider >
  );
};