import {
  TableHead as MuiTableHead,
  ThemeProvider,
  TableRow,
  TableCell
} from '@mui/material';

import { THCellProps, THProps } from 'src/utils/table.d';
import TableSortLabel from './SortLabel'
import Cell from '../TableCell';
import { THTheme } from 'src/styles/mui';

/**
 * 
 * @param param0 
 * @returns 
 */
export default function TableHead(
  { TH,
    style,
    selectable,
    sortable,
    collapsible }: THProps
) {
  return (
    <ThemeProvider theme={THTheme(style)}>
      <MuiTableHead>
        <TableRow id={`THeadRow`}>
          {selectable ? <>{selectable}</> : null}
          {collapsible ? <TableCell /> : null}
          {TH?.map((cell: THCellProps) => <Cell key={cell.id}
            id={cell.id}
            align={cell.align}>
            {!cell.hidden
              ? (sortable
                ? <TableSortLabel {...{ sortable, headCell: cell }} />
                : cell.label) : null}
          </Cell>
          )}
        </TableRow>
      </MuiTableHead>
    </ThemeProvider >
  );
};