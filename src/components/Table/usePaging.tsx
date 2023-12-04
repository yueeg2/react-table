import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

export function usePaging<T>(): [number, number, ({ rowCount }: { rowCount: number }) => JSX.Element] {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNum(0);
  };

  return [
    pageNum * rowsPerPage,
    pageNum * rowsPerPage + rowsPerPage,
    ({ rowCount }: { rowCount: number }) => 
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 30]}
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={pageNum}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />,
  ];
}