import React, { useCallback, useState } from 'react';
import { checkVaildQueryField } from './utils/checkVaildQueryField';

type FnProps = { fn: (rows: any) => any }

export function useSearch({ headCells }: { headCells: Array<any>; }) {

  const [filterFn, setFilterFn] = useState<FnProps>({ fn: (rows: any) => rows });

  const handleSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const queryString = evt.target.value.toLowerCase();
    setFilterFn({
      fn: (rows: any[]) => queryString !== ""
        && !checkVaildQueryField(rows, headCells, queryString).length
        ? []
        : checkVaildQueryField(rows, headCells, queryString)[0]
    });
  }, [headCells]);

  return { filterFn, handleSearch };
}
