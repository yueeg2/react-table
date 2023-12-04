import * as React from 'react';
import {
  TableSortLabel as MuiTableSortLabel,
  Box
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { SortableProps, THCellProps } from 'src/utils/table.d';

const OrderArrow: React.FunctionComponent<{
  order: 'asc' | 'desc',
  orderBy: string
}> = ({
  order,
  orderBy
}) => {
    if ((order === undefined || orderBy === undefined)) {
      return null;
    }
    return <Box component="span" sx={visuallyHidden}>
      {order === 'desc'
        ? 'descending'
        : 'ascending'}
    </Box>;
  };

const TableSortLabel: React.FunctionComponent<{
  sortable: SortableProps,
  headCell: THCellProps
}> = ({
  sortable,
  headCell
}) => <MuiTableSortLabel
  active={sortable.orderBy === headCell.id}
  direction={sortable.orderBy === headCell.id ? sortable.order : 'asc'}
  onClick={(event) => sortable?.onRequestSort(event, headCell.id)}
  hideSortIcon={sortable.orderBy !== headCell.id}>
      {headCell.label}
      <OrderArrow order={sortable.order} orderBy={sortable.orderBy} />
    </MuiTableSortLabel>

export default TableSortLabel