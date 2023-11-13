import * as React from 'react';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { Columns, Selectable, Sortable } from './TableHead';


/**
 * show the sorted order on page if sort was defined
 * @param sort 
 * @returns 
 */
export function showCurrentOrder(sort?: Sortable): JSX.Element | null {
  const { order, orderBy } = sort || {}
  if ((order === undefined || orderBy === undefined)) {
    return null
  }
  return <Box component="span" sx={visuallyHidden}>
    {order === 'desc'
      ? 'descending'
      : 'ascending'}
  </Box>
}

/**
 * show the label on page if label string does not contain "Row_"
 * @param label 
 * @returns 
 */
export const labelOfCol = (label: string): string => label.includes('Row_') ? '' : label


/**
 * create the sorting if sort is defined
 * @param th 
 * @param sort 
 * @returns 
 */
export function SortingDisplayHandler(th: Columns, sort?: Sortable) {
  const { order, orderBy, onRequestSort } = sort || {}
  const createSortHandler = (property: string) => (event: React.MouseEvent<HTMLElement>) => {
    if (onRequestSort)
      onRequestSort(event, property);
  };
  const sortProps = (th: Columns) => ({
    active: orderBy === th.id,
    direction: orderBy === th.id ? order : 'asc',
    onClick: createSortHandler(th.id),
    hideSortIcon: orderBy !== th.id,
  })

  return function (label: string) {
    return sort
      ? <TableSortLabel
        {...sortProps(th)}
      >
        {label}
        {showCurrentOrder(sort)}
      </TableSortLabel>
      : <>{label}</>
  }
}

