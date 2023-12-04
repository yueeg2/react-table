import { useState } from 'react';

export function useSort(initOrder?: string) {
  const [orderBy, setOrderBy] = useState<string>(initOrder || '');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { orderBy, order, handleRequestSort };
}