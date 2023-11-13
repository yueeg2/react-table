import { useState } from 'react';
import { Order } from './table.d';

export function useSort(initOrder: string): Array<any> {
  const [orderBy, setOrderBy] = useState<string>(initOrder);
  const [order, setOrder] = useState<Order>('desc');


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return [orderBy, order, handleRequestSort];
}