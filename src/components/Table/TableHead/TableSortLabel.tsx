import * as React from 'react';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { HeadCellProps, Order, TableSortProps } from '../table.d';
import { TableSortLabel as MuiTableSortLabel } from '@mui/material';

const OrderArrow: React.FunctionComponent<{ order: Order, orderBy: string }> = (
  {
    order,
    orderBy
  }
) => {
  if ((order === undefined || orderBy === undefined)) {
    return null;
  }
  return <Box component="span" sx={visuallyHidden}>
    {order === 'desc'
      ? 'descending'
      : 'ascending'}
  </Box>;
};

const TableSortLabel: React.FunctionComponent<{sortable: TableSortProps, headCell: HeadCellProps}> = ({
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