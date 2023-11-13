import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import { TableSortProps } from '../table.d';

/**
 * create the columns, don't show the label if the label string is found in hideThIds
 * @param columns
 * @param sort
 * @returns
 */

export const Cell: React.FunctionComponent<{
  id: string,
  align?: "left" | "center" | "inherit" | "right" | "justify",
  sortable?: TableSortProps,
  children?: any
}> = (
  {
    id,
    sortable,
    children,
    align = 'center'
  }
) => {
    //
    const { orderBy, order, onRequestSort } = sortable || {};
    //
    let sortDirection = orderBy === id && sortable ? order : false;

    return <TableCell align={align} key={`TH-cell-${id}`}
      sortDirection={sortDirection}>
      {children}
    </TableCell>

  };
